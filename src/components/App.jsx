import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm.jsx';
import { Filter } from './ContactForm/Filter.jsx';
import { ContactList } from './ContactForm/ContactList.jsx';

// class Did extends PureComponent {

// componentDidMount() {
//   console.log('App componentDidMount');
// }

// componentDidUpdate() {
// console.log('componentDidUpdate');
// }

// componentWillUnmount(){
//   console.log('componentWillUnmount');
// }
// }
export class App extends Component {
  state = {
    contacts: [
      // {"id": "id-1", "name": "Rosie Simpson", "number": "459-12-56"},
      // {"id": "id-2", "name": "Hermione Kline", "number": "443-89-12"},
      // {"id": "id-3", "name": "Eden Clements", "number": "645-17-79"},
      // {"id": "id-4", "name": "Annie Copeland", "number": "227-91-26"}
    ],
    filter: '',
  };

  createContact = (contact, prevState) => {
    //  if (this.state.contacts !== prevState.contacts){
    // console.log('Обновилось книга сонтактов');
    // }else {

    if (
      this.state.contacts.some(
        el => el.name === contact.name && el.number === contact.number
      )
    ) {
      alert(`${contact.name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  removeContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => id !== contactId),
    }));
  };

  changeFilter = filter => {
    this.setState({ filter });
  };

  filteredContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  componentDidMount() {
    console.log('Did Mouns');

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    // console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Обновляюсь и зацикливаюсь');

    if (this.state.contacts !== prevState.contacts) {
      console.log('Update contacts');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.filteredContacts();

    return (
      <div>
        <h2>Phonebook</h2>
        <ContactForm onSubmit={this.createContact} />

        <h2>Contacts</h2>
        {contacts.length > 1 && (
          <Filter filter={filter} onChange={this.changeFilter} />
        )}
        {contacts.length > 0 ? (
          <ContactList
            contacts={filteredContacts}
            onDelete={this.removeContact}
          />
        ) : (
          <p className="title">No contacts</p>
        )}
      </div>
    );
  }
}
