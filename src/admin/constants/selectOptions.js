const stateOptions = [
  { label: "Ongoing", value: "Ongoing" },
  { label: "Completed", value: "Completed" },
];

const durationOptions = [
  { label: "1 Month", value: 1 },
  { label: "2 Months", value: 2 },
  { label: "3 Months", value: 3 },
];

const hospitalOptions = [
  { label: "Al Hussein", value: "al_hussein" },
  { label: "Sayed Galal", value: "sayed_galal" },
];

const levelOptions = [
  { label: "MI-1", value: 1 },
  { label: "MI-2", value: 2 },
];

const selectOptions = {
  stateOptions,
  durationOptions,
  hospitalOptions,
  levelOptions,
};

export default selectOptions;
