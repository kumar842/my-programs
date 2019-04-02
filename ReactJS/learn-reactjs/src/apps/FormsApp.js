import React, {Component} from 'react';

class FormsApp extends Component {
    constructor(){
        super();
        this.state = {
            firstName: "",
            lastName: "",
            isFriendly: true,
            gender: "male",
            myText: "",
            favColor: "blue"
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        const {name, value, type, checked} = event.target;
        
        type === "checkbox"? 
            this.setState({
                [name]: checked
            }) : 
            this.setState({
                [name]: value
            })
    }

    handleSubmit(){
        console.log('submitted');
    }

    render(){
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" 
                           name="firstName" 
                           value={this.state.firstName} 
                           placeholder="First Name" 
                           onChange={this.handleChange}/>
                    <br />
                    <input type="text" 
                           name="lastName" 
                           value={this.state.lastName} 
                           placeholder="Last Name" 
                           onChange={this.handleChange}/>
                    <br />
                    <textarea
                        name="myText"
                        placeholder="your text"
                        value={this.state.myText}
                        onChange={this.handleChange}/>
                    <br />
                    <label>
                        <input type="checkbox"
                            name="isFriendly"
                            checked={this.state.isFriendly}
                            onChange={this.handleChange} />
                        Is Friendly
                    </label>       
                    <br />
                    <br />
                    <label>
                        <input type="radio"
                            name="gender"
                            value="male"
                            checked={this.state.gender === "male"}
                            onChange={this.handleChange} />
                        Male
                    </label>
                    <br />
                    <label>
                        <input type="radio"
                            name="gender"
                            value="female"
                            checked={this.state.gender === "female"}
                            onChange={this.handleChange} />
                        Female
                    </label>
                    <br />
                    <label>Favorite Color: </label>
                    <select 
                        name="favColor"
                        value={this.state.favColor}
                        onChange={this.handleChange}>
                        
                        <option value="blue">Blue</option>
                        <option value="red">Red</option>
                        <option value="yellow">Yellow</option>
                    </select>
                    <button>Submit</button>
                    <h1>{this.state.firstName} {this.state.lastName} {this.state.isFriendly} </h1>
                </form>
            </div>
        )
    };
}

export default FormsApp;