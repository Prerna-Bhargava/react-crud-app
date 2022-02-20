import React, { Component } from 'react'

export default class Form extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            userId: '',
            title: '',
            body: ''
        }
        
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    style = {
        width: "77%"
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(
            {
                [name]: value
            }
        )
    }
    handleSubmit(event) {
       event.preventDefault();
       this.props.onFormSubmit(this.state);
        this.setState(this.initialState)
    }
    render() {
        return (
            <div className='container position '>
                <form className='container' style={this.style} onSubmit={this.handleSubmit}>
                    <label htmlFor='user_id'>User Id : </label><br />
                    <input type='text' name="userId" value={this.state.userId} onChange={this.handleChange} placeholder='Enter User Id' /><br />

                    <label htmlFor='title'>Title : </label><br />
                    <input type='text' name="title" value={this.state.title} onChange={this.handleChange} placeholder='Enter the Title' /><br />

                    <label htmlFor='body'>Body : </label><br />
                    <input type='text' name="body" value={this.state.body} onChange={this.handleChange} placeholder='Enter the Body' /><br/>
                    <button type="submit" className="btn btn-primary finaladd my-3">Submit</button>

                </form>


            </div>
        )
    }
}
