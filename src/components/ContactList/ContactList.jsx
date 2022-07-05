import PropTypes from 'prop-types';
import { StyledContactItem, StyledButton } from './ContactList.styled';


function ContactList({ contacts, onDeleteContacts }) {
    return (
        <div>
            <ul>
                {contacts && contacts.map(contact =>
                    <StyledContactItem key={contact.id}>
                        <p>{contact.name}: {contact.number}</p>
                        <StyledButton type="button" onClick={() => onDeleteContacts(contact.id)}>Delete</StyledButton>
                    </StyledContactItem>
                )}
            </ul>
        </div>
    );
}

export default ContactList;

ContactList.propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContacts: PropTypes.func.isRequired
};