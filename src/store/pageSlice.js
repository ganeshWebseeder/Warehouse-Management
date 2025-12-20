import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "page",
  initialState: {
    title: "Dashboard",
    subTitle: "Overview",
  },
  reducers: {
    setPage: (state, action) => {
      state.title = action.payload.title;
      state.subTitle = action.payload.subTitle || "";
    },
  },
});

export const { setPage } = pageSlice.actions;
export default pageSlice.reducer;
