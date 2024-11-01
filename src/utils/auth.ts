export const validateEmail = (email: string) => {
  if (email.includes('@') && email.includes('.')) {
    return true;
  }

  return false;
};

export const validatePassword = (password: string) => {
  if (password.length >= 8) {
    return true;
  }

  return false;
};
