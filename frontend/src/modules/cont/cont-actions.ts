import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../shared/api/Api";

export const getContAction = createAsyncThunk(
  'cont_slice/getCont',
  async () => {
    const res = await Api.get('/cont/asientos_contables')
    return res.data;
  }
)
