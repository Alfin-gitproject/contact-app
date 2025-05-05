const Contact = require("../models/Contact");

const getAllContacts = async (userId) => {
  try {
    return await Contact.find({ userId }).sort({ name: 1 });
  } catch (error) {
    throw new Error('Failed to fetch contacts: ' + error.message);
  }
};

const createContact = async (contactData) => {
  try {
    const contact = new Contact({ ...contactData });
    await contact.save();
    return contact;
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      throw new Error(messages.join(', '));
    }
    throw new Error('Failed to create contact: ' + error.message);
  }
};

const updateContact = async (id, contactData, userId) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: id, userId },
      contactData,
      { new: true, runValidators: true }
    );
    if (!contact) {
      throw new Error('Contact not found or unauthorized');
    }
    return contact;
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      throw new Error(messages.join(', '));
    }
    throw new Error('Failed to update contact: ' + error.message);
  }
};

const deleteContact = async (id, userId) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: id, userId });
    if (!contact) {
      throw new Error('Contact not found or unauthorized');
    }
    return contact;
  } catch (error) {
    throw new Error('Failed to delete contact: ' + error.message);
  }
};

module.exports = { getAllContacts, createContact, updateContact, deleteContact };