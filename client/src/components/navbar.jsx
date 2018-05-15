import React from 'react';
import axios from 'axios';
import {Nav, Navbar, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';

class NavigationBar extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="NavBarHeader">
        <Navbar fixedTop>
          <Navbar.Header>
            <Nav pullLeft>
              <a href="#home">Welcome, {this.props.userName}</a>
            </Nav>
          </Navbar.Header>
            <Nav pullRight>
              <NavItem eventKey={1} href="#" onClick={this.props.logOut}>
                Log Out
              </NavItem>
            </Nav>
        </Navbar>
      </div>
    )
  }
}

export default NavigationBar;
