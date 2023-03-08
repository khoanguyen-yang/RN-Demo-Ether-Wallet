import { useCallback, useEffect, useState } from 'react';

import { chainProviderController } from '../controllers/ChainProviderController';

// Use latest block number of a specific chain
export const useBlockNumber = (chainId: number): number | undefined => {
  const [blockNumber, setBlockNumber] = useState<number>();
  const provider = chainProviderController.providers[chainId];

  const fetchBlockNumber = useCallback(async () => {
    if (provider) {
      setBlockNumber(await provider.getBlockNumber());
    }
  }, [provider]);

  useEffect(() => {
    if (provider) {
      fetchBlockNumber();

      provider.on('block', fetchBlockNumber);
    }

    return () => {
      provider?.off('block', fetchBlockNumber);
    };
  }, [provider, fetchBlockNumber]);

  return blockNumber;
};
