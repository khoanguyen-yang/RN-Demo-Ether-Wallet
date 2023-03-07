// @ts-ignore
import bip39 from 'react-native-bip39';
import { mnemonicToSeedHex } from '@dreson4/react-native-quick-bip39';
import { hdkey } from 'ethereumjs-wallet';
import { ethers } from 'ethers';
import * as Keychain from 'react-native-keychain';

/**
 * Create ethers.Wallet from seed phrase. Derive using the default ETH derivation path
 */
export const createEtherWalletFromSeed = async (
  seedPhrase: string,
): Promise<ethers.Wallet | null> => {
  try {
    if (bip39.validateMnemonic(seedPhrase)) {
      const seed = mnemonicToSeedHex(seedPhrase);
      const root = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'));
      const privateKey = root
        .derivePath(ethers.utils.defaultPath)
        .getWallet()
        .getPrivateKeyString();
      return new ethers.Wallet(privateKey);
    }
  } catch {}
  return null;
};

/**
 * Store private key to keychain
 */
export const storePrivateKeyToKeychain = async (
  address: string,
  privateKey: string,
): Promise<boolean> => {
  const result = await Keychain.setInternetCredentials(
    address,
    address,
    privateKey,
    {
      storage: Keychain.STORAGE_TYPE.AES,
    },
  );
  return !!result;
};

/**
 * Retrieve private key by address from keychain
 */
export const getPrivateKeyFromKeychain = async (address: string) => {
  const data = await Keychain.getInternetCredentials(address);
  return data;
};
