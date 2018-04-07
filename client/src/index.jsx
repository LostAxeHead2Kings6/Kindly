import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import NavigationBar from "./components/navbar.jsx";
import Maintron from "./components/jumbotron.jsx";
import List from "./components/list.jsx";
import Form from "./components/form.jsx";
import DescriptionCard from "./components/descriptionCard.jsx";
import LoginPage from "./Components/login.jsx"
import Signup from "./Components/signup.jsx"
import MapComponent from "./components/googleMaps.jsx"
import Trigger from "./components/responsiveButton.jsx"
import { Link, DirectLink, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lgShow: false, //this state is used to show/hide the Trigger component/modal, which is changed via lgSHow and lgHide functions
      posts: [],
      featuredItem: {
        title: null,
        description: null,
        id: null
      },
      show: false, //this state is used to show/hide the DescriptionCard comoponent, which is changed via changeFeatured function
      latitude: 40.750576,
      longitude: -73.976437
    };
    this.retrievePosts = this.retrievePosts.bind(this);
    this.changeFeatured = this.changeFeatured.bind(this);
    this.handleClaim = this.handleClaim.bind(this);
    this.resetFormView = this.handleClaim.bind(this);
    this.lgShow = this.lgShow.bind(this);
    this.lgClose = this.lgClose.bind(this);
    this.ScrollTo = this.ScrollTo.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.retrievePosts();
  }

  //This function toggles the description card to appear,
  //retrieves lat/long data from server/geo-helper function
  //sets the lat/long state, which is passed to the googleMaps component that renders the map
  changeFeatured(listItem) {
    console.log(this.state.show);
    if (this.state.show === false){
      this.setState({
        featuredItem: listItem,
        show: true
     });
      let address = `${listItem.address}, ${listItem.city}, ${listItem.state} ${listItem.zipCode}`;
      axios.post('/latlong', {address: address})
        .then(result => {
          this.setState({
            latitude: Number(result.data.lat),
            longitude: Number(result.data.long)
          })
        })
    }
    else if(this.state.show === true){
      if (this.state.featuredItem.id === listItem.id){
        this.setState({
          show: false
        })
      }else{
        this.setState({
          featuredItem: listItem,
          show: true
        })
      }
    }

  }

  //This function retrieves all post data from the mySql database
  retrievePosts() {
    axios
      .get("/fetch")
      .then(results => {
        this.setState({
          posts: results.data
        })
      })
      .catch(function(error) {
        console.log("There was an error retrieving posts.", error);
      });
  }

  //This function updates the selected post that is claimed (in database)
  handleClaim(claimedPostID) {
    axios
      .post("/updateentry", {
        postID: claimedPostID
      })
      .then(done => {
        this.retrievePosts();
        this.setState({
          show:!this.state.show
        })

        axios.post('/chat', {
          title: this.state.featuredItem.title
        }).then(messageSent => console.log('text messages sent!'))
      });
  }

  //This func is being passed to the Form Compnent and closes the Trigger Component/Modal
  lgClose() {
    this.setState({
      lgShow: false
    });
    this.retrievePosts();
  }

  //This func is being passed to the Form Compnent and Trigger Component/Modal and opens it
  lgShow(){
    this.setState({
      lgShow: true
    });
  }

  //This func scrolls from the Jumbotron to the Posts components
  ScrollTo(){
    scroll.scrollTo(550);
  }

  logOut() {
    axios.get('/logout')
    .then(()=> {
      console.log('response received');
      ReactDOM.render(<LoginPage />, document.getElementById("app"));
    })
  }

  render() {
    console.log(this.props.userName)
    return (
      <div onClick={this.setState({show: true})}>
      <NavigationBar onClick={this.ScrollTo} logOut={this.logOut} userName={this.props.userName} />
      <Maintron scrollTo={this.ScrollTo}/>
        <ReactBootstrap.Grid className="show-grid">
          <ReactBootstrap.Row>
            <ReactBootstrap.Col md={6}>
            <h2 id='listheader'> Recent Postings </h2>
              <List
                posts={this.state.posts}
                handleClick={this.changeFeatured}
              />
            </ReactBootstrap.Col>
            <ReactBootstrap.Col className="pass" md={6}>
             {!this.state.show
              ? <Form showModal={this.lgShow}/>
              :  <DescriptionCard
                    featuredItem = {this.state.featuredItem}
                    claimHandler={this.handleClaim}
                  /> }
            </ReactBootstrap.Col>
          </ReactBootstrap.Row>
        </ReactBootstrap.Grid>
        <Trigger show={this.state.lgShow} onHide={this.lgClose} />
         <div className="map">

        <MapComponent
          isMarkerShown
          googleMapURL=`https://maps.googleapis.com/maps/api/js?key=${process.env.secretKey}&v=3.exp&libraries=geometry,drawing,places`
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }}
        />}
          latitude={this.state.latitude}
          longitude={this.state.longitude}
        />
        </div>


      </div>
    );
  }
}

export default App
ReactDOM.render(<LoginPage />, document.getElementById("app"));
