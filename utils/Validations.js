export function validateName(name) {
  const regex = /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/; // Use the basic or enhanced regex here
  return regex.test(name);
}

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
