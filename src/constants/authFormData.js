import * as yup from "yup";

// Universities
const egyptianMedicalUniversities = [
  "Cairo University",
  "Ain Shams University",
  "Alexandria University",
  "Assiut University",
  "Mansoura University",
  "Zagazig University",
  "Tanta University",
  "Suez Canal University",
  "Benha University",
  "Menoufia University",
  "South Valley University",
  "Fayoum University",
  "Minia University",
  "Kafr El-Sheikh University",
  "Sohag University",
  "Beni-Suef University",
  "Aswan University",
  "Damietta University",
  "Helwan University",
  "Port Said University",
  "Damanhour University",
  "Luxor University",
  "New Valley University",
  "Matrouh University",
  "Sinai University",
  "Misr University for Science and Technology (MUST)",
  "October 6 University",
  "Ahram Canadian University",
  "Nile University",
  "British University in Egypt (BUE)",
  "German University in Cairo (GUC)",
  "Future University in Egypt (FUE)",
  "Badr University in Cairo (BUC)",
  "Galala University",
  "King Salman International University",
  "Delta University for Science and Technology",
  "New Giza University",
  "Egyptian Russian University",
  "Sphinx University",
  "Deraya University",
  "Al-Azhar University for Boys",
  "Al-Azhar University for Girls",
  "Military Medical Academy",
];

// Medical Specialities
export const specialities = [
  { label: "Family Medicine", value: "family_medicine" },
  { label: "Internal Medicine", value: "internal_medicine" },
  { label: "Pediatrics", value: "pediatrics" },
  { label: "Geriatrics", value: "geriatrics" },
  { label: "Cardiology", value: "cardiology" },
  { label: "Endocrinology", value: "endocrinology" },
  { label: "Neurology", value: "neurology" },
  { label: "Oncology", value: "oncology" },
  { label: "Pulmonology", value: "pulmonology" },
  { label: "Rheumatology", value: "rheumatology" },
  { label: "General Surgery", value: "general_surgery" },
  { label: "Cardiothoracic Surgery", value: "cardiothoracic_surgery" },
  { label: "Neurosurgery", value: "neurosurgery" },
  { label: "Orthopedic Surgery", value: "orthopedic_surgery" },
  { label: "Plastic Surgery", value: "plastic_surgery" },
  { label: "Urology", value: "urology" },
  { label: "Vascular Surgery", value: "vascular_surgery" },
  { label: "Otolaryngology (ENT)", value: "ent" },
  { label: "Anesthesiology and ICU", value: "anesthesiology_icu" },
  { label: "Emergency Medicine", value: "emergency_medicine" },
  { label: "Radiology", value: "radiology" },
  { label: "Clinical Pathology", value: "clinical_pathology" },
  { label: "Dermatology", value: "dermatology" },
  { label: "Psychiatry", value: "psychiatry" },
  { label: "Obstetrics & Gynecology", value: "obgyn" },
  { label: "Ophthalmology", value: "ophthalmology" },
];

export const facultiesList = () => {
  let list = [];
  for (let university of egyptianMedicalUniversities) {
    list.push({
      value: `${university} - Faculty of Medicine`,
      label: `${university} - Faculty of Medicine`,
    });
  }

  return list;
};

// Year Of Graduation
export const graduationYears = () => {
  let years = [];
  for (let year = 2025; year >= 2000; year--) {
    years.push({ value: year, label: year });
  }
  return years;
};

// Grades
let gradesList = ["A+", "A", "B+", "B", "C+", "C", "D+", "D"];
export const grades = () => {
  let theGrades = [];
  for (let grade of gradesList) {
    theGrades.push({ value: grade, label: grade });
  }
  return theGrades;
};

export const internSignupValidationSchema = (selectedIDType) => {
  return yup
    .object({
      fullname: yup
        .string()
        .trim()
        .required("Fullname is required")
        .matches(
          /^[A-Za-z-]{2,}(\s[A-Za-z-]{2,}){3,}$/,
          "Please enter your name as in your national ID"
        ),
      orderOfGraduate: yup
        .number()
        .required()
        .positive("Order must be positive")
        .typeError("Order is required"),
      facultyIDNumber: yup
        .number()
        .required()
        .positive("Faculty ID must be positive")
        .typeError("Faculty is required"),
      idOrPassportNumber:
        selectedIDType === "nationalID"
          ? yup
              .string()
              .required("National ID is required")
              .length(17, "National ID must be 14 digits")
          : yup
              .string()
              .required("Passport Number is required")
              .min(
                6,
                "Please enter a valid passport number (6-12 alphanumeric characters)"
              )
              .max(
                12,
                "Please enter a valid passport number (6-12 alphanumeric characters)"
              ),
      nationality: yup.object().required("Nationality is required"),
      facultyOfGraduation: yup
        .object()
        .required("Faculty of graduation is required"),
      hospital: yup.object().required("Hospital is required"),
      yearOfGraduation: yup.object().required("Graduation year is required"),
      grade: yup.object().required("Grade is required"),
      email: yup.string().email().required("Email is required"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(
          /^01[0-2,5-5]\d{8}$/,
          "Invalid Egyptian mobile number (e.g., 0101234567)"
        ),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /[A-Z]/,
          "Password must contain uppercase and lowercase letters."
        )
        .matches(
          /[a-z]/,
          "Password must contain uppercase and lowercase letters."
        )
        .matches(/[1-9]/, "Password must contain at least one number.")
        .matches(
          /[!@#$%^&*(),.?"_:{}|<>]/,
          "Password must contain at least one special character."
        ),
    })
    .required();
};

export const supervisorSignupValidationSchema = () => {
  return yup
    .object({
      firstname: yup
        .string()
        .trim()
        .required("Firstname is required")
        .matches(
          /^[A-Za-z-]{2,}$/,
          "Please enter your name as in your national ID"
        ),
      lastname: yup
        .string()
        .trim()
        .required("Lastname is required")
        .matches(
          /^[A-Za-z-]{2,}/,
          "Please enter your name as in your national ID"
        ),
      hospital: yup.object().required("Hospital is required"),
      speciality: yup.object().required("Speciality is required"),
      email: yup.string().email().required("Email is required"),
      phone: yup
        .string()
        .required("Phone is required")
        .matches(
          /^01[0-2,5-5]\d{8}$/,
          "Invalid Egyptian mobile number (e.g., 0101234567)"
        ),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /[A-Z]/,
          "Password must contain uppercase and lowercase letters."
        )
        .matches(
          /[a-z]/,
          "Password must contain uppercase and lowercase letters."
        )
        .matches(/[1-9]/, "Password must contain at least one number.")
        .matches(
          /[!@#$%^&*(),.?"_:{}|<>]/,
          "Password must contain at least one special character."
        ),
    })
    .required();
};

export const loginValidationSchema = () => {
  return yup
    .object({
      email: yup
        .string()
        .email()
        .transform((value) => value.toLowerCase())
        .required("Email is required"),
      password: yup.string().required("Password is required"),
    })
    .required();
};
