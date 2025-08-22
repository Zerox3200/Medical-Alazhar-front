import { baseApiSlice } from "../../common/baseApiSlice";
import { courseEndpoints } from "./courseEndpoints";

const courseApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ...courseEndpoints(builder),
  }),
});

export default courseApiSlice;
