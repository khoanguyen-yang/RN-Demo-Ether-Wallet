import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../stores';

const currentActiveAddress = (state: RootState) =>
  state.address.currentActiveAddress;
const isHavingExistingAddress = (state: RootState) =>
  !!state.address.currentActiveAddress;
const addresses = (state: RootState) => state.address.addresses;

export const selectCurrentActiveAddress = createSelector(
  currentActiveAddress,
  data => data,
);

export const selectIsHavingExistingAddress = createSelector(
  isHavingExistingAddress,
  data => data,
);

export const selectAddresses = createSelector(addresses, data => data);
