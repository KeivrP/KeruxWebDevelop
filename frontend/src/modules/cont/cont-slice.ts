import { createSlice } from '@reduxjs/toolkit'
import { getContAction } from './cont-actions'

export type ContState = {
  items: any[];
  count: number;
  seat: any;
  loadingSeat: boolean;
}

const initialState: ContState = {
  items: [],
  count: 0,
  seat: null,
  loadingSeat: false
}

export const contSlice = createSlice({
  name: 'cont_slice',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getContAction.fulfilled, (state, action) => {
      state.loadingSeat = false;
      state.seat = action.payload;
    });
    builder.addCase(getContAction.pending, (state) => {
      state.loadingSeat = true;
    })
  },
})
