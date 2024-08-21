const express = require("express");
const {
  createNewContact,
  updateUserContact,
  getAllContactsByUser,
  getSingleContactById,
  deleteUserContact,
} = require("../controllers/contactControllers");
const {
  validateContactCreate,
  checkValidationErrors,
} = require("../middlewares/dataValidator");
const { sanitizeBodyData } = require("../middlewares/dataSanitizer");
const Authenticate = require("../middlewares/Authenticate");

const contactRouter = express.Router();

// get all contacts by a user
contactRouter.get("/", Authenticate, getAllContactsByUser);

// get single contact by a user
contactRouter.get("/:contactId", Authenticate, getSingleContactById);

// create new contact
contactRouter.post(
  "/create",
  Authenticate,
  validateContactCreate(),
  checkValidationErrors,
  sanitizeBodyData,
  createNewContact
);

// update contact
contactRouter.put(
  "/update/:contactId",
  Authenticate,
  validateContactCreate(),
  checkValidationErrors,
  sanitizeBodyData,
  updateUserContact
);

// delete contact by id
contactRouter.delete("/delete/:contactId", Authenticate, deleteUserContact);

module.exports = contactRouter;
