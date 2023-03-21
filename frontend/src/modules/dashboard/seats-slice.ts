import { createSlice } from "@reduxjs/toolkit";
import { fetchSeatDetailsAction, fetchSeatMonedaAction, fetchSeatValidationAction, updateSeatAction } from "./seats-actions";
import { IMonedaSelect, ISeat, ISeatDetails, ISeatParamsUpdate } from "./seats.-types";

export const SEAT_SLICE_NAME = 'seat';

export interface SeatsState {
  seatDetails: null | ISeatDetails;
  loadingSeatDetails: boolean;
  seatDetailsError: null | Error;

  seatValidate: null | string;
  loadingSeatValidate: boolean;
  seatValidateError: null | Error;

  seatUpdate: null | string;
  loadingSeatUpdate: boolean;
  seatUpdateError: null | Error

  seatLstMoneda: IMonedaSelect[]
  loadingSeatLstMond: boolean

}

const initialState: SeatsState = {
  seatDetails: null,
  loadingSeatDetails: false,
  seatDetailsError: null,

  seatValidate: null,
  loadingSeatValidate: false,
  seatValidateError: null,

  seatUpdate: null,
  loadingSeatUpdate: false,
  seatUpdateError: null,

  seatLstMoneda: [],
  loadingSeatLstMond: false
}

export const seatSlice = createSlice({
  name: SEAT_SLICE_NAME,
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    //////////////////////////////////show
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
////////////////////////////////BtnValidar
    builder.addCase(fetchSeatValidationAction.pending, (state) => {
      state.loadingSeatValidate = true;
      state.seatValidateError = null;
    });
    builder.addCase(fetchSeatValidationAction.fulfilled, (state, action) => {
      state.loadingSeatValidate = false;
      state.seatValidate = action.payload.message;
    });
    builder.addCase(fetchSeatValidationAction.rejected, (state, action) => {
      state.loadingSeatValidate = false;
      state.seatValidate = null;
      state.seatValidateError = new Error(action.error.message);
    });
///////////////////////////////////////BotonActualizar
    builder.addCase(updateSeatAction.pending, (state) => {
      state.loadingSeatUpdate = true;
      state.seatUpdate = null;
    });
    builder.addCase(updateSeatAction.fulfilled, (state, action) => {
      state.loadingSeatUpdate = false;
      state.seatUpdate = action.payload.message;
    });
    builder.addCase(updateSeatAction.rejected, (state, action) => {
      state.loadingSeatUpdate = false;
      state.seatUpdate = null;
      state.seatUpdateError = new Error(action.error.message);
    });
////////////////////////////////////////////lista moneada
    builder.addCase(fetchSeatMonedaAction.pending, (state) => {
      state.loadingSeatLstMond = true;
      state.seatLstMoneda = [];
    });
    builder.addCase(fetchSeatMonedaAction.fulfilled, (state, action) => {
      state.loadingSeatLstMond = false;
      state.seatLstMoneda = action.payload;
    });

  }
})