import { createSlice } from "@reduxjs/toolkit";
import { fetchSeatDetailsAction } from "./seats-actions";
import { ISeatDetails } from "./seats.-types";

export const SEAT_SLICE_NAME = 'seat';

export interface SeatsState {
  seatDetails: null | ISeatDetails;
  loadingSeatDetails: boolean;
  seatDetailsError: null | Error;
}

const initialState: SeatsState = {
  seatDetails: null,
  loadingSeatDetails: false,
  seatDetailsError: null
}

export const seatSlice = createSlice({
  name: SEAT_SLICE_NAME,
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchSeatDetailsAction.pending, (state) => {
      state.loadingSeatDetails = true;
      state.seatDetailsError = null;
    });
    builder.addCase(fetchSeatDetailsAction.fulfilled, (state, action) => {
      state.loadingSeatDetails = false;
      state.seatDetails = action.payload;
    });
    builder.addCase(fetchSeatDetailsAction.rejected, (state, action) => {
      state.loadingSeatDetails = false;
      state.seatDetails = null;
      state.seatDetailsError = new Error(action.error.message);
    });
  }
})