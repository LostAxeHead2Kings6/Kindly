import React, { Component } from "react";
import ReactDOM from 'react-dom'
import App from '../index.jsx'
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import axios from 'axios'


export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.validateForm =this.validateForm.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(e){
    e.preventDefault();
    axios.post('/login', {
      username: this.state.email,
      password: this.state.password
    })
    .then((response) => {
      this.setState({username: '', password: ''});
      ReactDOM.render(<App userName={response.data}/>, document.getElementById("app"));
    })
    .catch((error) => {
      throw error;
    })

  }

  handleSignup(e){
    e.preventDefault();
    axios.post('/signup', {
      username: this.state.email,
      password: this.state.password,
    })
    .then((response) => {
      this.setState({username: '', password: ''});
      ReactDOM.render(<App userName={response.data}/>, document.getElementById("app"));
    })
    .catch((error) => {
      throw error;
    })
  }

  render() {
    return (
      <div className="welcome-container">
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">

            <h1 id='title'>Kindly</h1>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <Button
              block
              bsStyle="warning"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
            <Button
              block
              bsStyle="warning"
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              onClick={this.handleSignup}
            >Sign up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
