import { ethers } from 'ethers';

import { ChainId } from '../constants/ChainId';

let chainProviderController: ChainProviderController;

const SUPPORTED_CHAINS = [
  {
    chainId: ChainId.ETH,
    rpcUrl: 'https://rpc.ankr.com/eth',
  },
];

class ChainProviderController {
  providers: { [chainId: number]: ethers.providers.JsonRpcProvider } = {};

  initProviders() {
    SUPPORTED_CHAINS.forEach(chain => {
      this.providers[chain.chainId] = new ethers.providers.JsonRpcProvider(
        chain.rpcUrl,
      );
    });
  }

  static init() {
    chainProviderController = new ChainProviderController();
    chainProviderController.initProviders();
  }
}

export { chainProviderController };

export default ChainProviderController;
