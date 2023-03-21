import { createAsyncThunk, AsyncThunkPayloadCreator  } from "@reduxjs/toolkit";
import { Api } from "../../shared/api/Api";
import { ISeatDetails, ISeatParamsUpdate, IMonedaSelect } from "./seats.-types";

interface ArgumentType {
  fecdoc: string;
  codsitio: string;
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

export const fetchSeatMonedaAction = createAsyncThunk(
  'seat/fetchSeatMoneda',
  async (args: ArgumentType, thunkAPI) => {
    const { fecdoc, codsitio } = args;
    const queryParams = new URLSearchParams({
      fecdoc, codsitio
    });
    const url = '/cont/asientos_contables/moneda';
    //const res = await Api.get<{moneda: any}>(`${url}?${queryParams.toString()}`);
    const res = await Api.get<IMonedaSelect>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);