import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../shared/api/Api";
import { ISeatDetails, ISeatParamsUpdate } from "./seats.-types";

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
    console.log(res.data, "data")
    return res.data;
  }
);