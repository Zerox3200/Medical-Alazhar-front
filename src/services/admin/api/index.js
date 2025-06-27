import { baseApiSlice } from "../../common/baseApiSlice";
import adminEndpoints from "./adminEndpoints";
import roundEndpoints from "./roundEndpoints";
import supervisorEndpoints from "./supervisorEndpoints";
import internEndpoints from "./internEndpoints";

const adminApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ...adminEndpoints(builder),
    ...roundEndpoints(builder),
    ...supervisorEndpoints(builder),
    ...internEndpoints(builder),
  }),
});

export default adminApiSlice;
