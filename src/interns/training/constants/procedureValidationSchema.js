import * as yup from "yup";

export const procedureValidationSchema = yup.object({
  round: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Round is required"),
  skill: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Skill is required"),
  hospitalRecord: yup
    .number()
    .required("Hospital record is required")
    .typeError("Hospital record must be a number")
    .integer("Hospital record must be an integer"),
  venue: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Venue is required"),
  date: yup
    .date()
    .nullable()
    .required("Date is required")
    .typeError("Date must be a valid date"),
  performanceLevel: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Performance level type is required"),
});
