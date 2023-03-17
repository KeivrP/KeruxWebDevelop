import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../shared/api/Api";

//La función createAsyncThunk crea automáticamente tres acciones pending,fullfilled,rejected

export const getContAction = createAsyncThunk(
  'cont_slice/getCont',
  async () => {
    const res = await Api.get('/cont/asientos_contables')
    return res.data;
  }
)

export const getContShowAction = createAsyncThunk(
  'cont_slice/getContShow',
  async (iddoc: string) => {
    const res = await Api.get(`/cont/asientos_contables/show?iddoc=${iddoc}`);
    return res.data;
  }
);
