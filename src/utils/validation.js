/** Return true if the value is a finite number >= 0 */
export function isNonNegativeNumber(value) {
  if (value === '' || value === null || value === undefined) return false;
  const n = Number(value);
  return Number.isFinite(n) && n >= 0;
}

export function isRequired(value) {
  return String(value ?? '').trim().length > 0;
}

export function toSafeNumber(value) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return n;
}

export function validateCalculator(form) {
  const errors = {};
  if (!isRequired(form.cropName)) errors.cropName = 'Please enter a crop name.';
  if (!isRequired(form.landArea) || !isNonNegativeNumber(form.landArea)) {
    errors.landArea = 'Enter land area as 0 or a positive number.';
  }
  const moneyFields = ['seed', 'fertilizer', 'labour', 'irrigation', 'pesticide', 'other'];
  moneyFields.forEach((field) => {
    if (!isRequired(form[field]) || !isNonNegativeNumber(form[field])) {
      errors[field] = 'Enter 0 or a positive amount in ₹.';
    }
  });
  if (!isRequired(form.expectedYield) || !isNonNegativeNumber(form.expectedYield)) {
    errors.expectedYield = 'Enter expected yield as 0 or a positive number.';
  }
  if (!isRequired(form.sellingPrice) || !isNonNegativeNumber(form.sellingPrice)) {
    errors.sellingPrice = 'Enter selling price as 0 or a positive number.';
  }
  return errors;
}

export function validatePh(value) {
  if (!isRequired(value) || !isNonNegativeNumber(value)) {
    return 'Enter soil pH between 0 and 14.';
  }
  const n = Number(value);
  if (n > 14) return 'pH cannot be higher than 14.';
  return '';
}

export function validateTask(form) {
  const errors = {};
  if (!isRequired(form.name)) errors.name = 'Please give this task a name.';
  if (!isRequired(form.dueDate)) errors.dueDate = 'Please choose a due date.';
  return errors;
}

export function validateProfile(form) {
  const errors = {};
  if (!isRequired(form.name)) errors.name = 'Please enter your name.';
  if (!isRequired(form.state)) errors.state = 'Please choose a state.';
  if (!isRequired(form.farmArea) || !isNonNegativeNumber(form.farmArea)) {
    errors.farmArea = 'Enter farm area as 0 or a positive number.';
  }
  return errors;
}

export function validateSoil(form) {
  const errors = {};
  const phError = validatePh(form.ph);
  if (phError) errors.ph = phError;
  if (!isRequired(form.testDate)) errors.testDate = 'Please add the test date.';
  if (!isRequired(form.soilType)) errors.soilType = 'Please choose a soil type.';
  return errors;
}

export function validateIrrigation(form) {
  const errors = {};
  if (!isRequired(form.crop)) errors.crop = 'Please enter the crop.';
  if (!isRequired(form.fieldName)) errors.fieldName = 'Please name the field.';
  if (!isRequired(form.date)) errors.date = 'Please choose a date.';
  if (!isRequired(form.method)) errors.method = 'Please choose an irrigation method.';
  return errors;
}
