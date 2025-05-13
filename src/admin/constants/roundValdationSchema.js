import * as yup from "yup";

export const roundValidationSchema = yup.object({
  name: yup.string().required("Name is required").trim(),
  state: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("State is required"),
  duration: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Duration is required"),
  hospital: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Hospital is required"),
  numericYear: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Year level is required"),
  order: yup
    .string()
    .required("Order is required")
    .matches(/^\d+$/, "Order must be a number"),
  startDate: yup
    .date()
    .nullable()
    .required("Start date is required")
    .typeError("Start date must be a valid date"),
  endDate: yup
    .date()
    .nullable()
    .required("End date is required")
    .typeError("End date must be a valid date")
    .min(yup.ref("startDate"), "End date cannot be before start date"),
});
