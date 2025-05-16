import * as yup from "yup";

export const caseValidationSchema = yup.object({
  round: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Round is required"),
  patientGender: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Gender is required"),
  patientSerial: yup
    .number()
    .required("Patient serial is required")
    .typeError("Patient serial must be a number")
    .integer("Patient serial must be an integer"),
  patientAge: yup
    .number()
    .required("Patient age is required")
    .typeError("Age must be a number")
    .integer("Age must be an integer"),
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
  caseType: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Case type is required"),
  epas: yup
    .array()
    .of(
      yup.object().shape({
        value: yup.string().required(),
        label: yup.string().required(),
      })
    )
    .nullable()
    .required("Relevant Descriptors (EPAs) is required"),
  expectedLevel: yup
    .object()
    .shape({ value: yup.string().required(), label: yup.string().required() })
    .nullable()
    .required("Expected level is required"),
  caseSummary: yup.string().required("Case summary is required"),
  selfReflection: yup.string().required("Self reflection is required"),
});
