import { baseApiSlice } from "../../common/baseApiSlice";
import internEndpoints from "./internEndpoints";
import supervisorEndpoints from "./supervisorEndpoints";

const supervisorApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ...internEndpoints(builder),
    ...supervisorEndpoints(builder),
  }),
});

export default supervisorApiSlice;
