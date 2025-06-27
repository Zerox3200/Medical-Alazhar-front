import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const internFormSlice = createSlice({
  name: "internForm",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetForm: () => ({}),
  },
});

export const { updateFormData, resetForm } = internFormSlice.actions;
export default internFormSlice.reducer;
