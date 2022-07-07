import { Component } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import TitleContainer from './components/TitleContainer';
import { nanoid } from 'nanoid';
import Filter from './components/Filter';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  changeFilter = e => {
    this.setState({
      filter: e.currentTarget.value
    });
  };

  handleSubmit = (name, number) => {
    const randomID = nanoid();
    const newContact = { id: randomID, name, number };
    const normalizedName = name.toLowerCase();
    const findSameContact = this.state.contacts.find(contact => contact.name.toLowerCase().includes(normalizedName));
    findSameContact ?
      alert(`"${name}" is already exist in contacts`)
      : this.setState((prevState) => ({
        contacts: [ ...prevState.contacts, newContact ],
      }));
  };


  deleteContacts = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id)
    }));
  };

  // ВСЕГДА ОТ PrevState!!!! НЕЛЬЗЯ ИЗМЕНЯТЬ/МУТИРОВАТЬ СУЩЕСТВУЮЩИЙ СТЕЙТ!!!!!!!! внизу как делать НЕ НАДО!

  // deleteContacts = (id) => {
  //   this.setState({
  //     contacts: this.state.contacts.filter(contact => contact.id !== id)
  //   });
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState.contacts === this.state.contacts);
  // };


  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };


  // Считываем с localStorage данные при первой загрузке, т.е. при componentDidUpdate
  componentDidMount() {
    console.log('componentDidMount');
    const contacts = localStorage.getItem('contacts');
    // console.log('contacts', contacts);
    const parsedContacts = JSON.parse(contacts);
    console.log('parsedContacts', parsedContacts);
    if (parsedContacts) {
      this.setState({
        contacts: parsedContacts,
      });
    };
  }

  // Записываем в localStorage данные при каждом обновлении, т.е. при componentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    if (this.state.contacts !== prevState.contacts) {
      console.log('contacts updated');

      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

    // console.log(prevState);
    // console.log(this.state);
  }
  render() {
    console.log('render');
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return <>
      <TitleContainer title='Phonebook'>
        <ContactForm contacts={contacts} onSubmit={this.handleSubmit} />
      </TitleContainer>
      <TitleContainer title='Contacts'>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList contacts={filteredContacts} onDeleteContacts={this.deleteContacts} />
      </TitleContainer>
    </ >;
  }
}
