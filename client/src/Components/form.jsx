import React from 'react';
import axios from 'axios';
import {FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import Trigger from "../components/responsiveButton.jsx";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      title: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      isClaimed: false,
      photoUrl: ''
    }
    this.savePost = this.savePost.bind(this);
    this.clearFields = this.clearFields.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleState = this.handleState.bind(this);
    this.handleZipcode = this.handleZipcode.bind(this);
    this.handlePhotoUrl = this.handlePhotoUrl.bind(this);
    //title, description, address, city, state, zip_code, is_claimed
  }
  savePost(e) {
    e.preventDefault()
    axios.post('/savepost', this.state)
      .then( (response) =>{
        console.log('Post has been saved.', response);
        this.clearFields();
        this.props.showModal();
      })
      .catch(function(error) {
        console.log('There was an error saving this post.', error);
      })
  }
  clearFields() {
    this.setState({
      username: '',
      email: '',
      title: '',
      description: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      isClaimed: false,
      photoUrl: ''
    });
  }
  handleUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  handleEmail(e) {
    this.setState({
      email: e.target.value
    });
  }
  handleTitle(e) {
    this.setState({
      title: e.target.value
    });
  }
  handleDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  handleAddress(e) {
    this.setState({
      address: e.target.value
    });
  }
  handleCity(e) {
    this.setState({
      city: e.target.value
    });
  }
  handleState(e) {
    this.setState({
      state: e.target.value
    });
  }
  handleZipcode(e) {
    this.setState({
      zipCode: e.target.value
    });
  }
  handlePhotoUrl(e) {
    this.setState({
      photoUrl: e.target.value
    });
  }
   render() {

    //Here is where a user enters their posting. Ensure that the address input is a real address. Recommend using
    // google maps auto complete API to ensure this. Server will break if an inputted address is invalid (not a real address)


    //STATE INPUT: only accepts two chars (e.g, NY, CA) - if anything beyond two chars is submitted, this will not be saved to
    // the mySql database - this is a restriction set in the schema.


    return (
      <div className="form formDonate">
          <form>
          <div className="formFields">
          <ControlLabel>Post your donations</ControlLabel>
          <FormControl
            type="text"
            value={this.state.title}
            placeholder="Title"
            onChange={(e) => {this.handleTitle(e)}}
          />
          <FormControl
            type="text"
            value={this.state.address}
            placeholder="Street Address"
            onChange={(e) => {this.handleAddress(e)}}
          />
          <FormControl
            type="text"
            value={this.state.city}
            placeholder="City"
            onChange={(e) => {this.handleCity(e)}}
          />
          <FormControl
            type="text"
            value={this.state.state}
            placeholder="State"
            onChange={(e) => {this.handleState(e)}}
          />
          <FormControl
            type="text"
            value={this.state.zipCode}
            placeholder="ZipCode"
            onChange={(e) => {this.handleZipcode(e)}}
          />
        <FormControl
          type="text"
          value={this.state.email}
          placeholder="Email Address"
          onChange={(e) => {this.handleEmail(e)}}
          />
          <FormControl style={{height: '125px'}}
            type="text"
            value={this.state.description}
            placeholder="Description"
            onChange={(e) => {this.handleDescription(e)}}
          />
          <FormControl
            type="text"
            value={this.state.photoUrl}
            placeholder="Link an image"
            onChange={(e) => {this.handlePhotoUrl(e)}}
          />
          </div>
          <div className="formButton"><Button onClick={this.savePost}>Submit</Button></div>
      </form>
      </div>
    );
  }
}

export default Form;
