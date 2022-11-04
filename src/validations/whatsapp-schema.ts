import { checkSchema } from "express-validator";

export const authValidation = checkSchema({

})
export const sendMessageSchema = checkSchema({
  phone: {
    notEmpty: {
      bail: true,
      errorMessage: "Phone is required",
    },
  },
  message: {
    notEmpty: {
      bail: true,
      errorMessage: "Message is required",
    },
  },
});

export const sendMediaSchema = checkSchema({
  phone: {
    notEmpty: {
      bail: true,
      errorMessage: "Number is required",
    },
  },
  message: {
    notEmpty: {
      bail: true,
      errorMessage: "Message is required",
    },
  },
  filetype: {
    notEmpty: {
      bail: true,
      errorMessage: "filetype is required and use only image, video, audio",
    },
  },
  url: {
    notEmpty: {
      bail: true,
      errorMessage: "Upload your link image / video / audio",
    },
  },
});