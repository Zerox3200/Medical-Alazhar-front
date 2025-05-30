import * as yup from "yup";
export const directLearningActivityValidationSchema = yup.object({
  round: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Round is required"),
  learnedActivity: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Learned activity is required"),
  topic: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Topic is required"),
  evidence: yup.mixed().required("Evidence is required"),
  date: yup
    .date()
    .nullable()
    .required("Date is required")
    .typeError("Date must be a valid date"),
});
