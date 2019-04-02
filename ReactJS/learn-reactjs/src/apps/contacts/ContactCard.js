import React, {Component} from 'react';

class ContactCard extends Component{
    render(){
        const contact = this.props.contact;
        return (
            <div className="contact-card">
                <img alt="" src={contact.imgUrl} />
                <h3>{contact.name}</h3>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
            </div>
        )
    }   
}

export default ContactCard;