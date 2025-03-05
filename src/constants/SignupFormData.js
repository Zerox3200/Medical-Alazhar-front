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

export const facultyList = () => {
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
export const graduationYear = () => {
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
