import { createAsyncThunk, AsyncThunkPayloadCreator  } from "@reduxjs/toolkit";
import { Api } from "../../shared/api/Api";
import { ISeatDetails, ISeatParamsUpdate, IMonedaSelect, IDocumenttype, IBeneficiary, ISeatCuePub, ISeatCueAux, ISeatDocRef, ISeatParamsUpdateMov } from "./seats.-types";

interface ArgumentType {
  fecdoc: string;
  codsitio: string;
}
interface ArgumentDelete {
  nummov: string;
  idasiento: string;
}


export const fetchSeatDetailsAction = createAsyncThunk(
  'seat/fetchSeatDetails',
  async (idasiento: string) => {
    const queryParams = new URLSearchParams({
      idasiento,
    });
    const url = '/cont/asientos_contables/show';
    const res = await Api.get<ISeatDetails>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);

export const updateSeatAction = createAsyncThunk(
  'seat/updateSeatAction',
  async (body: ISeatParamsUpdate) => {
    const url = '/cont/asientos_contables/update';
    const res = await Api.post<{message: string}>(url, body);
    return res.data;
  }
);
export const updateMoviAction = createAsyncThunk(
  'seat/updateMoviAction',
  async (body: ISeatParamsUpdateMov) => {
    const url = '/cont/asientos_contables/update_movimiento';
    const res = await Api.post<{message: string}>(url, body);
    return res.data;
  }
);

export const fetchSeatCodificar = createAsyncThunk(
  'seat/fetchSeatCodificar',
  async (idasiento: string) => {
    const queryParams = new URLSearchParams({
      idasiento,
    });
    const url = '/cont/asientos_contables/boton_verificar';
    const res = await Api.get<{ message: string }>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);
export const fetchSeatValidationAction = createAsyncThunk(
  'seat/fetchSeatValidation',
  async (idasiento: string) => {
    const queryParams = new URLSearchParams({
      idasiento,
    });
    const url = '/cont/asientos_contables/boton_validar';
    const res = await Api.get<{ message: string }>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);

export const deleteMoviAction = createAsyncThunk(
  'seat/deleteMoviAction',
  async (args: ArgumentDelete, thunkAPI) => {
    const { idasiento, nummov } = args;
    const queryParams = new URLSearchParams({
      idasiento, nummov
    });
    const url = '/cont/asientos_contables/delete_movimiento';
    //const res = await Api.get<{moneda: any}>(`${url}?${queryParams.toString()}`);
    const res = await Api.get<{ message: string }>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);
export const fetchSeatMonedaAction = createAsyncThunk(
  'seat/fetchSeatMoneda',
  async (args: ArgumentType, thunkAPI) => {
    const { fecdoc, codsitio } = args;
    const queryParams = new URLSearchParams({
      fecdoc, codsitio
    });
    const url = '/cont/asientos_contables/moneda';
    //const res = await Api.get<{moneda: any}>(`${url}?${queryParams.toString()}`);
    const res = await Api.get<IMonedaSelect[]>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);

export const fetchdocumenttypeAction = createAsyncThunk(
  'seat/fetchdocumenttype',
  async (numpublicacion: string) => {
    const queryParams = new URLSearchParams({
      numpublicacion,
    });
    const url = '/cont/asientos_contables/tipodoccont';
    const res = await Api.get<IDocumenttype[]>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);

export const fetchBeneficiaryAction = createAsyncThunk(
  'seat/fetchbeneficiary',
  async () => {
    const url = '/cont/asientos_contables/beneficiario';
    const res = await Api.get<IBeneficiary[]>(`${url}`);
    return res.data;
  }
);

export const fetchCuentasPubAction = createAsyncThunk(
  'seat/fetchcuentaspub',
  async (numpublicacion: string) => {
    const queryParams = new URLSearchParams({
      numpublicacion,
    });
    const url = '/cont/asientos_contables/cuentaspub';
    const res = await Api.get<ISeatCuePub[]>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);
export const fetchCodAuxAction = createAsyncThunk(
  'seat/fetchcodaux',
  async (tipoauxiliar: string) => {
    const queryParams = new URLSearchParams({
      tipoauxiliar,
    });
    const url = '/cont/asientos_contables/codauxiliar';
    const res = await Api.get<ISeatCueAux[]>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);
export const fetchDocRefAction = createAsyncThunk(
  'seat/fetchdocref',
  async (numpublicacion: string) => {
    const queryParams = new URLSearchParams({
      numpublicacion,
    });
    const url = '/cont/asientos_contables/docreferencia';
    const res = await Api.get<ISeatDocRef[]>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);

