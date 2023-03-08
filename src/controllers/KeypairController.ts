/**
 * KeypairController controls every keypairs in the application
 *  It can be used to interact with the keypair such as sending transactions
 */

import { store } from '../stores';
import { getPrivateKeyFromKeychain } from '../utils/crypto';

let keypairController: KeypairController;

class KeypairController {
  currentActiveAddress: string = '';

  private keypair: { [key: string]: string } = {};

  async loadKeypair(address: string) {
    /**
     * No need to load keypair if it existed
     */
    if (this.keypair[address]) {
      return;
    }

    const keychainData = await getPrivateKeyFromKeychain(address);
    if (keychainData && keychainData.password) {
      this.keypair[address] = keychainData.password;
    }
  }

  // Set active address when select address from the managed list
  setCurrentActiveAddress(address: string) {
    this.currentActiveAddress = address;
    this.loadKeypair(address);
  }

  // Add new keypair when it is imported
  addKeypair(address: string, privateKey: string) {
    this.setCurrentActiveAddress(address);
    this.keypair[address] = privateKey;
  }

  // Init the controller with persisted current active address
  static init() {
    keypairController = new KeypairController();

    const currentActiveAddress = store.getState().address.currentActiveAddress;
    if (currentActiveAddress) {
      keypairController.setCurrentActiveAddress(currentActiveAddress);
      keypairController.loadKeypair(currentActiveAddress);
    }
  }
}

export { keypairController };

export default KeypairController;
