import { useState} from 'react'
import useLocalStorage from 'Hooks/useLocalStorage';
import { nanoid } from "nanoid";
import { Filter } from './Filter/Filter';
import { Message } from './Message/Message'
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList'
import { Container, SectionsContainer, Section, Title, SectionTitle } from './App.styles'



export const App = () => {

const [contacts, setContacts] = useLocalStorage('contacts', []);
const [filter, setFilter] = useState("");


const addContact = ({ name, number }) => {
  const contact = { id: nanoid(), name, number };
  const normalizedName = name.toLowerCase();

  if (
   contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    )
  ) {
    return alert(`${name} is already in contacts!`);
  }

  setContacts(prevContacts =>[contact, ...prevContacts]);
};


const filterContacts = evt => {
   setFilter(evt.currentTarget.value);
};

const getFilteredContacts = () => {
  const normalizedFilter = filter.toLowerCase().trim();
    return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

const deleteContact = contactId => {
 setContacts(prevContacts=> prevContacts.filter(contact => contact.id !== contactId));
};





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
       {contacts.length !== 0 ? (
       <>
       <Filter value={filter} onChange={filterContacts} />
       <ContactList
        contacts={getFilteredContacts()}
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

