import { createSlice } from "@reduxjs/toolkit";
import { deleteMoviAction, fetchBeneficiaryAction, fetchCodAuxAction, fetchCuentasPubAction, fetchDocRefAction, fetchdocumenttypeAction, fetchSeatCodificar, fetchSeatDetailsAction, fetchSeatMonedaAction, fetchSeatValidationAction, updateMoviAction, updateSeatAction } from "./seats-actions";
import { IBeneficiary, IDocumenttype, IMonedaSelect, ISeat, ISeatCueAux, ISeatCuePub, ISeatDetails, ISeatDocRef, ISeatParamsUpdate } from "./seats.-types";

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

  seatTypeDocument: IDocumenttype[]
  loadingTypeDocument: boolean

  seatBeneficiary: IBeneficiary[]
  loadingBeneficiary: boolean

  seatCuenPub: ISeatCuePub[]
  loadingCuentaPub: boolean

  seatCodAux: ISeatCueAux[]
  loadingCodAux: boolean

  seatDocRef: ISeatDocRef[]
  loadingDocRef: boolean

  seatCodificar: null | string;
  loadingCodificar: boolean;

  seatUpdateMovi: null | string;
  loadingMov: boolean;

  DeleteMovi: null | string;
  loadingDelectMovi: boolean;

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
  loadingSeatLstMond: false,

  seatTypeDocument: [],
  loadingTypeDocument: false,

  seatBeneficiary: [],
  loadingBeneficiary: false,

  seatCodAux:[],
  loadingCodAux: false,

  seatCuenPub:[],
  loadingCuentaPub: false,

  seatDocRef:[],
  loadingDocRef: false,

  seatCodificar: null,
  loadingCodificar: false,
  seatUpdateMovi: null,
  loadingMov: false,
  DeleteMovi: null,
  loadingDelectMovi: false
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
  ///////////////////////////////////////////////Tipo Documento
    builder.addCase(fetchdocumenttypeAction.pending, (state) => {
      state.loadingTypeDocument = true;
      state.seatTypeDocument = [];
    });
    builder.addCase(fetchdocumenttypeAction.fulfilled, (state, action) => {
      state.loadingTypeDocument = false;
      state.seatTypeDocument = action.payload;
    });
    ///////////////////////beneficiario
    builder.addCase(fetchBeneficiaryAction.pending, (state) => {
      state.loadingBeneficiary = true;
      state.seatBeneficiary = [];
    });
    builder.addCase(fetchBeneficiaryAction.fulfilled, (state, action) => {
      state.loadingBeneficiary = false;
      state.seatBeneficiary = action.payload;
    });
    ////////////////////////CuentasPub
    builder.addCase(fetchCuentasPubAction.pending, (state) => {
      state.loadingCuentaPub = true;
      state.seatCuenPub = [];
    });
    builder.addCase(fetchCuentasPubAction.fulfilled, (state, action) => {
      state.loadingCuentaPub = false;
      state.seatCuenPub = action.payload;
    });
    //////////////////////codigoauxiliar
    builder.addCase(fetchCodAuxAction.pending, (state) => {
      state.loadingCodAux = true;
      state.seatCodAux = [];
    });
    builder.addCase(fetchCodAuxAction.fulfilled, (state, action) => {
      state.loadingCodAux = false;
      state.seatCodAux = action.payload;
    });
    /////////////////////////docreferencia
    builder.addCase(fetchDocRefAction.pending, (state) => {
      state.loadingDocRef = true;
      state.seatDocRef = [];
    });
    builder.addCase(fetchDocRefAction.fulfilled, (state, action) => {
      state.loadingDocRef = false;
      state.seatDocRef = action.payload;
    });

    //////////////////////////botonCodificar
    builder.addCase(fetchSeatCodificar.pending, (state) => {
      state.loadingCodificar = true;
    });
    builder.addCase(fetchSeatCodificar.fulfilled, (state, action) => {
      state.loadingCodificar = false;
      state.seatCodificar = action.payload.message;
    });
    ///////////////////////////////////////ActulizarCrearMovimiento
    builder.addCase(updateMoviAction.pending, (state) => {
      state.loadingMov = true;
      state.seatUpdateMovi = null;
    });
    builder.addCase(updateMoviAction.fulfilled, (state, action) => {
      state.loadingMov = false;
      state.seatUpdateMovi = action.payload.message;
    });
    ///////////////////////////////////////Borrar Movimiento
    builder.addCase(deleteMoviAction.pending, (state) => {
      state.loadingDelectMovi = true;
      state.DeleteMovi = null;
    });
    builder.addCase(deleteMoviAction.fulfilled, (state, action) => {
      state.loadingDelectMovi = false;
      state.DeleteMovi = action.payload.message;
    });

  }
})