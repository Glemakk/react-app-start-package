import { Component } from 'react';
import { Form, StyledInput } from './ContactForm.styled';

class ContactForm extends Component {
    state = {
        name: '',
        number: '',
    };

    handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        this.setState({
            [ name ]: value
        });
    };

    clearForm = () => {
        this.setState({
            name: '',
            number: ''
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { onSubmit } = this.props;
        const { name, number } = this.state;
        onSubmit(name, number);
        this.clearForm();
    };

    render() {
        const { number, name } = this.state;
        return (
            <Form onSubmit={this.handleSubmit}>
                <label>
                    <h3>Name</h3>
                    <StyledInput
                        type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                        required
                    />
                </label>
                <label>
                    <h3>Number</h3>
                    <StyledInput
                        type="tel"
                        name="number"
                        value={number}
                        onChange={this.handleChange}
                        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                        required
                    />
                </label>
                <button type="submit">Add contact</button>
            </Form>
        );
    }
}

export default ContactForm;