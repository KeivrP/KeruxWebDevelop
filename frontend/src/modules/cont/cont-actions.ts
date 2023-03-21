import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../shared/api/Api";
import { ISeat } from "../dashboard/seats.-types";

interface ArgumenIndex {
  page: string;
  per: string;
}

//La función createAsyncThunk crea automáticamente tres acciones pending,fullfilled,rejected

export const getContAction = createAsyncThunk(
  'cont_slice/getCont',
  async (args: ArgumenIndex, thunkAPI) => {
    const { page, per } = args;
    const queryParams = new URLSearchParams({
      page, per
    });
    const url = '/cont/asientos_contables';
    //const res = await Api.get<{moneda: any}>(`${url}?${queryParams.toString()}`);
    const res = await Api.get<ISeat[]>(`${url}?${queryParams.toString()}`);
    return res.data;
  }
);

export const getContShowAction = createAsyncThunk(
  'cont_slice/getContShow',
  async (idasiento: string) => {
    const res = await Api.get(`/cont/asientos_contables/show?idasiento=${idasiento}`);
    return res.data;
  }
)

export const updateContAction = createAsyncThunk(
  'cont_slice/updateCont',
  async (data: any) => {
    const res = await Api.post('/cont/asientos_contables/update', data)
    return res.data;
  }
);
