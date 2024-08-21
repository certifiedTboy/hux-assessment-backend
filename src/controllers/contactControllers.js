const {
  createContact,
  updateContact,
  getContactByUser,
  getContactById,
  deleteContact,
} = require("../services/contactServices");

// create new contact request function
const createNewContact = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    const { userId } = req.user;

    const createdContact = await createContact(
      phoneNumber,
      firstName,
      lastName,
      userId
    );

    if (createdContact) {
      return res
        .status(201)
        .json({ message: "contact created successfully", createdContact });
    }
  } catch (error) {
    next(error);
  }
};

// create new contact request function
const updateUserContact = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber } = req.body;
    const { userId } = req.user;
    const { contactId } = req.params;

    const updatedContact = await updateContact(
      phoneNumber,
      firstName,
      lastName,
      userId,
      contactId
    );

    if (updateContact) {
      return res
        .status(200)
        .json({ message: "contact updated successfully", updatedContact });
    }
  } catch (error) {
    next(error);
  }
};

// get all contacts by a user
const getAllContactsByUser = async (req, res, next) => {
  try {
    const { userId } = req.user;

    const contacts = await getContactByUser(userId, req.query);

    if (contacts) {
      return res.status(200).json({ ...contacts, message: "success" });
    }
  } catch (error) {
    next(error);
  }
};

// get single contact by the id
const getSingleContactById = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { contactId } = req.params;

    const contact = await getContactById(contactId, userId);

    if (contact) {
      return res.status(200).json({ message: "success", contact });
    }
  } catch (error) {
    next(error);
  }
};

// delete contact request function
const deleteUserContact = async (req, res, next) => {
  try {
    const { userId } = req.user;
    const { contactId } = req.params;

    const deletedContact = await deleteContact(contactId, userId);

    if (deletedContact) {
      return res.status(200).json({ message: "contact deleted successfully" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNewContact,
  updateUserContact,
  getAllContactsByUser,
  getSingleContactById,
  getSingleContactById,
  deleteUserContact,
};
