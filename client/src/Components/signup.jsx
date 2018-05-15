import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
       zipcode: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange(event){
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSignup(e){
    e.preventDefault();
    axios.post('/signup', {
      username: this.state.username,
      password: this.state.password,
      zipcode: this.state.zipcode
    })
    .then(() => {
      this.setState({username: '', password: '', zipcode: ''});
    })
    .catch((error) => {
      throw error;
    })
  }

  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Username</ControlLabel>
            <FormControl
              autoFocus
              type="Username"
              value={this.state.username}
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
            <FormGroup controlId="zipcode" bsSize="large">
            <ControlLabel>Zipcode</ControlLabel>
            <FormControl
              value={this.state.zipcode}
              onChange={this.handleChange}
              type="zipcode"
            />
          </FormGroup>

        </form>
      </div>
    );
  }
}
