import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button } from 'reactstrap';

import { NavLink } from 'react-router-dom'

import './Navbar.css'
import {onLogoutUser} from '../actions/index'
import {Connect} from 'react-redux'

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
        <Navbar style={{backgroundColor:'gren', fontSize: '9px'}}  light expand="md">
          <NavbarBrand href="/" style={{fontFamily: 'Luckiest Guy, cursive', fontSize:'35px', color: 'blue'}}>
            dimsSt🤣re
          </NavbarBrand>
          <div className='search'>
            <Input type='text' className='search-box' placeholder='Cari Produk' />
          </div>


          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>

              <div style={{fontSize: '20px'}}>
                <a href="#">
                  <span class="glyphicon glyphicon-shopping-cart"></span>
                </a>
              </div>

            <Nav className="ml-auto" navbar>
              <NavItem className='container'>
                <NavLink to="/login" style={{color:'', fontSize: '100px'}}><button type="button" className="btn btn-outline-secondary">Login</button></NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/register" style={{color:'', fontSize:'100px'}}><button type="button" className="btn btn-outline-secondary">Sign Up</button></NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{color:'black'}}>
                   <i className="material-icons" style={{color:'black'}}>account_circle</i>
                   {this.props.user_name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem style={{fontSize:'15px'}}>
                    My Account
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem style={{fontSize:'15px'}}>
                    Logout{this.props.onLogoutUser}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
