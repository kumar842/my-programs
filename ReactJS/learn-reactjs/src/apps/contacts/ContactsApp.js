import React, {Component} from 'react';
import ContactCard from './ContactCard';

class ContactsApp extends Component{
    render(){
        return (
            <div>
                <h2>{this.props.name}</h2>
                <ContactCard 
                    contact = {{name: "Rajkumar",
                    imgUrl: "http://placekitten.com/300/200",
                    phone: "1234",
                    email: "abc@gamil.com"
                    }}
                    />
                <ContactCard 
                    contact = {{name: "Rajkumar",
                    imgUrl: "http://placekitten.com/300/200",
                    phone: "1234",
                    email: "abc@gamil.com"
                    }}
                    />
                <hr />
            </div>
        )
    }
}

export default ContactsApp;
