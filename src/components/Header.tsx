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

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = () => setOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md">
      <Container>
        <NavbarBrand href="/">SES Availability</NavbarBrand>
        <NavbarToggler onClick={toggleOpen} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/member">Member</NavLink>
            </NavItem>
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
