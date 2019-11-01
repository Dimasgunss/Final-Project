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
  Button
} from 'reactstrap';

import { NavLink } from 'react-router-dom'

import './Navbar.css'
import { onLogoutUser } from '../actions/index'
import { connect } from 'react-redux'

export class navbar extends React.Component {
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
    if (!this.props.user_name) {
      return (
        <div>
          <Navbar style={{ backgroundColor: '#e0143d', fontSize: '9px' }} expand="md">
            <NavbarBrand href="/" style={{ fontFamily: 'Luckiest Guy, cursive', fontSize: '35px', color: 'white' }}>
              BukaPalak
            </NavbarBrand>
            <div className='search'>
              <Input type='text' className='search-box' placeholder='Aku mau belanja' />
            </div>

            <button type="button" className="btn btn-outline-light mx-2">Search</button>
           
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>

              <div style={{ fontSize: '20px' }} className="ml-auto">
                <NavLink to='/cart'>
                  <span className="fa fa-shopping-cart" style={{ color: 'white'}}></span>
                </NavLink>
              </div>
             


              <div className="ml-4">
                <NavLink to="/login" style={{ color: 'white', fontSize: '13px' }}>Login</NavLink>
              </div>
              <div className="ml-4">
                <NavLink to="/register"><button type="button" className="btn btn-outline-dark" style={{ color: 'white', fontSize: '13px' }}>Sign Up</button></NavLink>
              </div>
              <UncontrolledDropdown nav inNavbar style={{ listStyleType: "none" }}>
                {/* <DropdownToggle nav caret style={{color:'black'}}>
                     <i className="material-icons" style={{color:'white'}}>account_circle</i>
                     {this.props.user_name}
                  </DropdownToggle> */}
                <DropdownMenu right>
                  <DropdownItem style={{ fontSize: '15px' }}>
                    My Account
                    </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem style={{ fontSize: '15px' }}>
                    Logout{this.props.onLogoutUser}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>

            </Collapse>
          </Navbar>
        </div>
      );
    } else {
      return (
        <div>
          <Navbar style={{ backgroundColor: '#e0143d', fontSize: '9px' }} expand="md">
            <NavbarBrand href="/" style={{ fontFamily: 'Luckiest Guy, cursive', fontSize: '35px', color: 'white' }}>
              BukaPalak
            </NavbarBrand>
            <div className='search'>
              <Input type='text' className='search-box' placeholder='Aku mau belanja' />
            </div>

            <button type="button" className="btn btn-outline-light mx-2">Search</button>

            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>

              <div style={{ fontSize: '20px' }} className="ml-auto">
                <NavLink to="/cart">
                   <span className="fa fa-shopping-cart" style={{ color: 'white' }}></span>
                </NavLink>
              </div>


  
              <UncontrolledDropdown nav inNavbar style={{ listStyleType: "none" }}>
                <DropdownToggle nav caret style={{ color: 'white' }}>
                  <i className="material-icons" style={{ color: 'white' }}>account_circle</i>
                Hi Kaka {this.props.user_name}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                      <NavLink className='nav-link' to=''>All Product</NavLink>
                  </DropdownItem>
                  <DropdownItem>
                      <NavLink className='nav-link' to='/manageproducts'>Manage Product</NavLink>
                    </DropdownItem>
                  <DropdownItem divider />
                  <NavLink to='/'>
                    <DropdownItem onClick={this.props.onLogoutUser} style={{ fontSize: '15px' }}>
                      Logout
                  </DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>

            </Collapse>
          </Navbar>
        </div>
      );
    }
  }
}

const mstp = state => {
  return {
    user_name: state.auth.username
  }
}

export default connect(mstp, { onLogoutUser })(navbar)