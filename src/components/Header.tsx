import logo from '../assets/logo.svg';
import React, { useState } from 'react';
import {
  Collapse,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
  UncontrolledDropdown,
} from 'reactstrap';
import { FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { NavLink as RouterNavLink } from 'react-router-dom';

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand tag={RouterNavLink} to="/">
          <img src={logo} alt="SES Logo" /> SES Availability
        </NavbarBrand>
        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/" exact>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RouterNavLink} to="/member">Member</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>Unit</DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={RouterNavLink} to="/unit/storm">
                  Storm and Support
                </DropdownItem>
                <DropdownItem tag={RouterNavLink} to="/unit/rescue">
                  Rescue
                </DropdownItem>
                <DropdownItem tag={RouterNavLink} to="/unit/statistics">
                  Statistics
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar className="ml-auto">
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <FaMapMarkerAlt /> Wollongong City
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  Dapto
                </DropdownItem>
                <DropdownItem active={true}>
                  Wollongong City
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <FaUser /> Member Name
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Log Out</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
