import React, { useState } from "react";
import initialContacts from "./initialContacts.json";
import { generate } from "shortid";

const App = () => {
  /******************/
  /***** HOOKS ******/
  /******************/
  const [contacts, setContacts] = useState(initialContacts);

  /******************/
  /**** HELPERS *****/
  /******************/
  const addNewContact = () => {
    setContacts([
      {
        id: generate(),
        name: "",
        lastName: ""
      },
      ...contacts
    ]);
  };
  const deleteContact = currentId => {
    setContacts(contacts =>
      contacts.filter(contact => contact.id !== currentId)
    );
  };
  // eslint-disable-next-line
  const handleChangeWithIndex = (e, index) => {
    const newContacts = [...contacts];
    newContacts[index] = {
      ...newContacts[index],
      [e.target.name]: e.target.value
    };
    setContacts(newContacts);
  };
  const handleChangeWithId = (e, id) => {
    const newContacts = contacts.map(contact =>
      contact.id === id
        ? {
            ...contact,
            [e.target.name]: e.target.value
          }
        : contact
    );
    setContacts(newContacts);
  };

  /******************/
  /****** VIEW ******/
  /******************/
  return (
    <main className="container my-5">
      <div className="row">
        <div className="col-12 col-md-6 col-lg-5 mx-auto">
          <h1 className="h4 text-center mb-4">Contact List</h1>
          <section>
            <button
              className="btn btn-secondary btn-block mb-5"
              onClick={() => addNewContact()}
            >
              + Add New
            </button>
            {/* List */}
            {contacts.map((contact, index) => (
              <div key={contact.id} className="form-group row">
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    placeholder="Name"
                    value={contact.name}
                    // onChange={e => handleChangeWithIndex(e, index)}
                    onChange={e => handleChangeWithId(e, contact.id)}
                  />
                </div>
                <div className="col-5">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    value={contact.lastName}
                    // onChange={e => handleChangeWithIndex(e, index)}
                    onChange={e => handleChangeWithId(e, contact.id)}
                  />
                </div>
                <div className="col-2">
                  <button
                    onClick={() => deleteContact(contact.id)}
                    className="btn btn-block btn-outline-danger"
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </section>
          <section className="text-cenetr my-5">
            <p>{JSON.stringify(contacts)}</p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default App;
