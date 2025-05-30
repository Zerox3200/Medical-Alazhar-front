import * as yup from "yup";

export const selfLearningActivityValidationSchema = yup.object({
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
  activityTitle: yup.string().required("Title is required"),
  evidence: yup.mixed().required("Evidence is required"),
  // .test("fileSize", "File too large", (value) => {
  //   if (!value) return true;
  //   return value.size <= 5 * 1024 * 1024;
  // })
  // .test("fileType", "Unsupported file format", (value) => {
  //   if (!value) return true;
  //   return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
  // }),
  date: yup
    .date()
    .nullable()
    .required("Date is required")
    .typeError("Date must be a valid date"),
});
