import { ethers } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { chainProviderController } from '../controllers/ChainProviderController';
import { useBlockNumber } from './useBlockNumber';

import { ChainId } from '../constants/ChainId';

// Use latest native balance of an address on a specific chain
const useNativeBalance = (address: string, chainId: ChainId) => {
  const [balance, setBalance] = useState(ethers.BigNumber.from(0));
  const blockNumber = useBlockNumber(chainId);

  const provider = useMemo(
    () => chainProviderController.providers[chainId],
    [chainId],
  );

  const formattedBalance = useMemo(() => {
    return ethers.utils.formatEther(balance);
  }, [balance]);

  const fetchBalance = useCallback(async () => {
    if (provider) {
      const chainBalance = await provider.getBalance(address);
      setBalance(chainBalance);
    }
  }, [address, provider]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance, blockNumber]);

  return { balance, formattedBalance };
};

export default useNativeBalance;
