const Contact = require('../models/Contact');
const contactService = require('../services/contactService');

const getAllContacts = async (req, res) => {
  try {
    console.log("req.userid", req.userId)
    const contacts = await contactService.getAllContacts(req.userId);
    res.json(contacts);
  } catch (error) {
    console.error('Get contacts error:', error.message);
    res.status(500).json({ message: error.message });
  }
};
// const contactService = require('../services/contactService');






const createContact = async (req, res) => {
  try {
   
    const contact  = await contactService.createContact({
      ...req.body,
      userId: req.userId // Associate contact with authenticated user
    });
    res.status(201).json(contact);
  } catch (error) {
    console.error('Create contact error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// In your contactController.js
const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, user: req.userId });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, userId: req.userId });

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact by ID:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

const updateContact = async (req, res) => {
  console.log(req.userId, "😊😊")
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id  },
      req.body,
      { new: true }
    );
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    await contactService.deleteContact(req.params.id, req.userId);
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error.message);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAllContacts, getContactById,createContact, updateContact, deleteContact };