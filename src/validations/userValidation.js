export const userSchema = {
  name: {
    notEmpty: {
      errorMessage: "Name is required",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Email is not valid",
    },
    notEmpty: {
      errorMessage: "Email is required",
    },
  },
};
