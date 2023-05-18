export const isMinLength = (value, min) => {
  return value.trim().length >= min;
};

export const validateEmail = (value) => {
  return /^\S+@\S+\.\S+$/.test(value);
};

export const isValidPassword = (value) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.+])[A-Za-z\d@$!%*?&.+]{6,}$/.test(
    value
  );
};

export const isValidDate = (value) => {
  return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(value);
};

export const isValidPhoneNumber = (value) => {
  return isMinLength(value, 6) && /^\d+$/.test(value);
};
