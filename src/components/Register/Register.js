import React, { Component } from 'react'

export class Register extends Component {
    render() {
        return (
            <div>
                <h2>Register</h2>
                <p>Probably should have a quick sentence about registration or something...</p>
        <form>
            <label htmlFor="">First Name</label>
            <input type="text"/>
            <br/>
            <label htmlFor="">Last Name</label>
            <input type="text"/>
            <br/>
            <label htmlFor="">Username</label>
            <input type="text"/>
            <br/>
            <label htmlFor="">Password</label>
            <input type="text"/>
            <br/>
            <label htmlFor="">Confirm Password</label>
            <input type="text"/>
            <br/>
            <label htmlFor="">Email</label>
            <input type="text"/>
            <br/>
            <label htmlFor="">Confirm Email</label>
            <input type="text"/>
            <br/>
            <button>Submit</button>
        </form>
            </div>
        )
    }
}

export default Register
