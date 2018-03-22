import React, { Component } from 'react';
import { 
  Collapse, 
  Navbar,
  NavbarToggler, 
  NavbarBrand, 
  Nav, 
  NavItem, 
  NavLink,
  Popover,
  PopoverContent,
  Button,
  UncontrolledNavDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from 'reactstrap';
import { Link } from 'react-router-dom';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      popoverOpen: false,
      dropdownToggle: false,
      class: 'up',
    };
  }
  
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      popoverOpen: !this.state.popoverOpen,
    });
  }

  openClose = () => {
    if(!this.state.dropdownToggle) {
      this.setState({
        dropdownToggle: true,
        class: 'dropdown',
      })
    } else {
      this.setState({
        dropdownToggle: false,
        class: 'up',
      })
    }
  }

  render() {
    console.log('NAV PROPS', this.props)
    return (
      <div>
        <Navbar light toggleable>
        <NavbarToggler right onClick={this.toggle} />
          <NavbarBrand><Link to= "/" onClick={() => this.props.setPage('home')}>codeshare</Link></NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink><Link to= "/" onClick={() => this.props.setPage('home')}>Home</Link></NavLink>
              </NavItem>
              <NavItem>
                <NavLink><Link to= "/challenges" onClick={() => this.props.setPage('challenges')}>Challenges</Link></NavLink>
              </NavItem>
              <UncontrolledNavDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Start Code Session
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem>
                    <NavLink>
                    <Link to= "/codeEditor" onClick={() => this.props.setPage('codeEditor')}>Create New Session</Link>
                    </NavLink>                    
                  </DropdownItem>
                  <DropdownItem>
                    Join an Already created session
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledNavDropdown>
              <NavItem>
                <NavLink><Link to= "/events" onClick={() => this.props.setPage('events')}>Events</Link></NavLink>
              </NavItem>
                <NavLink className="user" id="Popover1" onClick={this.toggle}>Hi, {this.props.username}</NavLink>
                <NavItem>
                  <Popover placement="bottom" isOpen={this.state.popoverOpen} target="Popover1">
                    <PopoverContent> 
                      <Button onClick={() => this.props.setPage('logout')}>
                        Logout
                      </Button>
                  </PopoverContent>
                  </Popover>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
