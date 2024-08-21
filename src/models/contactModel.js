const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    phoneNumber: {
      type: String,
      required: [true, "Please enter a phone number"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required to create a contact"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required to create a contact"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
