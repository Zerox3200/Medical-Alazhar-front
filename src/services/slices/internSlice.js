import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cases: [],
  procedures: [],
};

const internSlice = createSlice({
  name: "intern",
  initialState,
  reducers: {
    setCases: (state, action) => {
      state.cases = action.payload.cases;
    },
  },
});

export const { setOpenNewRoundModal } = internSlice.actions;
export default internSlice.reducer;
