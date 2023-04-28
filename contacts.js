const fs = require('fs').promises;
const path = require('path');
const shortid = require('shortid');
const id = shortid()
const contactsPath = path.join(__dirname,"db", "contacts.json");


async function listContacts() {
    const result = await fs.readFile(contactsPath)
    return JSON.parse(result);
};

async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === contactId);
    return contact;
};

async function removeContact(contactId) {
    const contacts = await listContacts();
    const index = contacts.findIndex(value => value.id === contactId);
     if(index === -1) {
    return null;
  }
    contacts.splice(index, 1)
    const result = await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return index;
  };

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const contact = { id: shortid.generate(), name, email, phone };
    contacts.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contact;
};

module.exports = { listContacts, getContactById, removeContact, addContact };