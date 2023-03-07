import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AddressState {
  currentActiveAddress: string;
  addresses: string[];
}

const initialState: AddressState = {
  currentActiveAddress: '',
  addresses: [],
};

export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addNewAddress: (state, action: PayloadAction<string>) => {
      state.currentActiveAddress = action.payload;

      // Avoid adding duplicate entry by adding to a set
      state.addresses = [...new Set(state.addresses).add(action.payload)];
    },
    setCurrentActiveAddress: (state, action: PayloadAction<string>) => {
      state.currentActiveAddress = action.payload;
    },
  },
});

export const { addNewAddress, setCurrentActiveAddress } = addressSlice.actions;

export default addressSlice.reducer;
