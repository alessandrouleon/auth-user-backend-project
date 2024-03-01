const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const stringWithoutSpecialCharacters = /^[\p{L}\s]+$/u;

export const RegExHelper = {
  password,
  dateFormat,
  emailFormat,
  stringWithoutSpecialCharacters,
};
