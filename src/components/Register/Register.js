import React, { Component } from 'react'

export class Register extends Component {
    render() {
        return (
            <div>
                <h2>Register</h2>
            <p>This is a React-based app that allows users to post about their NBA fantasy basketball teams and read posts from fellow users.
            </p>
            <p>If you've made an account, you can log in below. Otherwise, please register for an account or log in with the demo account, username: demo, password: DemoPass1234!</p>
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
