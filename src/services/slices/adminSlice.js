import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openNewRoundModal: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setOpenNewRoundModal: (state, action) => {
      state.openNewRoundModal = action.payload.openNewRoundModal;
    },
  },
});

export const { setOpenNewRoundModal } = adminSlice.actions;
export default adminSlice.reducer;
