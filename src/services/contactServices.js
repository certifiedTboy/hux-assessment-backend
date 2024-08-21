const { ObjectId } = require("mongodb");
const Contact = require("../models/contactModel");
const getPagination = require("../helpers/pagination");
const CustomErrorHandler = require("../lib/CustomErrorHander");

// create a new contact
const createContact = async (phoneNumber, firstName, lastName, userId) => {
  const contacts = await getContactByUser(userId);

  // check if contact exist
  const contactExist = contacts.find(
    (contact) => contact.phoneNumber === phoneNumber
  );

  // throw error if contact already exist
  if (contactExist) {
    throw new CustomErrorHandler("contact already exists", 409);
  }

  // create new contact object
  const newContact = new Contact({
    phoneNumber,
    firstName,
    lastName,
    user: userId,
  });

  await newContact.save();

  if (!newContact) {
    throw new CustomErrorHandler("contact creation failed", 400);
  }

  return newContact;
};

// update a contact
const updateContact = async (
  phoneNumber,
  firstName,
  lastName,
  userId,
  contactId
) => {
  // check if contact exist
  const contact = await getContactById(contactId, userId);

  // update contact on database
  const contactUpdated = await Contact.findByIdAndUpdate(
    contact?._id.toString(),
    { phoneNumber, firstName, lastName },
    { new: true }
  );

  // throw error if contact fail to update
  if (!contactUpdated) {
    throw new CustomErrorHandler("unable to update contact", 401);
  }
  return contactUpdated;
};

// get all contacts created by a user
const getContactByUser = async (userId, query) => {
  let contacts;

  if (!query) {
    contacts = await Contact.find({ user: userId });
    if (!contacts) {
      throw new CustomErrorHandler("no contacts found", 404);
    }

    return contacts;
  }

  // getch pagination data
  const { skip, limit } = getPagination(query);
  contacts = await Contact.find({ user: userId }).skip(skip).limit(limit);

  // conver userId to a proper mongodb ObjectId using the ObjectId class from the mongodb SDK
  const userObjectId = new ObjectId(userId);

  // get total number of contacts created by user
  const cursor = await Contact.aggregate([
    {
      $match: {
        user: {
          $eq: userObjectId,
        },
      },
    },
    {
      $count: "firstName",
    },
  ]);

  // total number of contacts created by user
  const total = cursor[0].firstName;

  // get total number of pages
  const pages = Math.ceil(total / limit);
  return { contacts, pages, total, page: parseInt(query.page) };
};

// get contact by contact  id
const getContactById = async (contactId, userId) => {
  const contact = await Contact.findById(contactId);

  // throw error if contact is not found
  if (!contact) {
    throw new CustomErrorHandler("contact not found", 404);
  }

  // check if contact to be deleted belong to the current user
  if (contact.user.toString() !== userId) {
    throw new CustomErrorHandler("unauthorized access", 401);
  }

  return contact;
};

// get contact by contact  id
const deleteContact = async (contactId, userId) => {
  // validate if contact with id exist and belongs to the current user
  await getContactById(contactId, userId);

  // delete contact from databas
  const contactDeleted = await Contact.findByIdAndDelete(contactId);

  // throw error if contact delete fail
  if (!contactDeleted) {
    throw new CustomErrorHandler("contact delete failed", 400);
  }

  return contactDeleted;
};

module.exports = {
  createContact,
  getContactByUser,
  getContactById,
  updateContact,
  deleteContact,
};
