import { Component } from 'react'
import { nanoid } from "nanoid";
import { Filter } from './Filter/Filter';
import { Message } from './Message/Message'
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList'
import { Container, SectionsContainer, Section, Title, SectionTitle } from './App.styles'



export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: '',
  }

  addContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    const normalizedName = name.toLowerCase();

    if (
      this.state.contacts.find(
        contact => contact.name.toLowerCase() === normalizedName
      )
    ) {
      return alert(`${name} is already in contacts!`);
    }

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };


filterContacts = evt => {
  this.setState({filter: evt.currentTarget.value});
};

getFilteredContacts = () => {
  const { filter, contacts } = this.state;
  const normalizedFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};


deleteContact = contactId => {
  this.setState(prevState => ({
    contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  }));
};

  render() {
    const filteredContacts = this.getFilteredContacts();
    const { addContact, filterContacts, deleteContact, state } = this;
    return (
      <Container>
        <Title>Phonebook</Title>
        <SectionsContainer>
          <Section>
            <SectionTitle>Add Contact</SectionTitle>
            <ContactForm 
        onSubmit={addContact}/>
        </Section>
          <Section >
            <SectionTitle>Contacts</SectionTitle>
         {state.contacts.length !== 0 ? (
         <>
         <Filter value={state.filter} onChange={filterContacts} />
         <ContactList
          contacts={filteredContacts}
          onDeleteButton={deleteContact}
        />
         </> 
         ) : ( 
         <Message message="There are no contacts in your phonebook. Please add your first contact!" />)}  
          </Section>
        
        </SectionsContainer>
      </Container>
    )
  }

}

