import { createSlice } from '@reduxjs/toolkit'
import { getContAction } from './cont-actions'

//representa el estado del slice de Redux.
export type ContState = {
  //items: any[];
  //count: number;
  seat: any;
  loadingSeat: boolean;
}

//crea una constante llamada initialState que representa el estado inicial del slice.
const initialState: ContState = {
  //items: [],
  //count: 0,
  seat: null,
  loadingSeat: false
}
//Se define la constante contSlice y se llama a la función createSlice para crear un nuevo slice de Redux.
export const contSlice = createSlice({
  name: 'cont_slice',
  initialState,
  reducers: {},
  //extraReducers que se utilizan para manejar los casos en que 
  //se resuelven o están pendientes las acciones que se definen en otros lugares del código.
  extraReducers(builder) {
   // se utiliza para definir cómo se debe actualizar el estado del slice 
    builder.addCase(getContAction.fulfilled, (state, action) => {
      state.loadingSeat = false;
      state.seat = action.payload;
    });
    builder.addCase(getContAction.pending, (state) => {
      state.loadingSeat = true;
    })
  },
})
