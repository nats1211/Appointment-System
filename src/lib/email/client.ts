import nodemailer from "nodemailer";

export const emailTransport = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "orlando.spencer@ethereal.email",
    pass: "BC9zASrPT5PSXzd31s",
  },
});
