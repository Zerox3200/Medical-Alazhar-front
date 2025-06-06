import { baseApiSlice } from "../../common/baseApiSlice";
import casesEndpoints from "../api/training/casesEndpoints";
import proceduresEndpoints from "../api/training/proceduresEndpoints";
import authEndpoints from "./authEndpoints";
import directLearningEndpoints from "./training/directLearningEndpoints";
import selfLearningEndpoints from "./training/selfLearningEndpoints";

const internApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    ...authEndpoints(builder),
    ...casesEndpoints(builder),
    ...proceduresEndpoints(builder),
    ...selfLearningEndpoints(builder),
    ...directLearningEndpoints(builder),
  }),
});

export default internApiSlice;
