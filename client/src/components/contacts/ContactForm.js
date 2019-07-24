import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';
import { UPDATE_CONTACT } from '../../context/types';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, updateContact, current, clearCurrent } = contactContext;

  const defaultContact = {
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  };

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(defaultContact);
    }
  }, [contactContext, current, defaultContact]);

  const [contact, setContact] = useState(defaultContact);

  const { name, email, phone, type } = contact;

  const onChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addContact(contact);
    } else {
      updateContact(contact);
    }

    setContact(defaultContact);
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Edit Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h4>Contact Type</h4>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        id="ct1"
        onChange={onChange}
      />
      <label htmlFor="ct1">Personal</label>{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        id="ct2"
        onChange={onChange}
      />
      <label htmlFor="ct2">Professional</label>
      <div>
        <input
          type="submit"
          value={current ? 'Save Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
