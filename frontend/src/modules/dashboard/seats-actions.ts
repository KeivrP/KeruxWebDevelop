import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api } from "../../shared/api/Api";
import { ISeatDetails } from "./seats.-types";

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