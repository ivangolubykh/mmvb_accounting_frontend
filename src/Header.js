import React from 'react';

// npm install react-bootstrap bootstrap
// https://react-bootstrap.github.io/components/navs/
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown  from 'react-bootstrap/NavDropdown';

// https://react-bootstrap.github.io/getting-started/introduction/  -> Stylesheets
import './css/Bootstrap_4.3.1/bootstrap.css'


function Header( {mainParent} ) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" onClick={() => mainParent.setState({currentPage: "home"})}>ММВБ Анализатор</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link  href="#home" onClick={() => mainParent.setState({currentPage: "home"})}>Главная</Nav.Link>
          <Nav.Link href="#link" onClick={() => mainParent.setState({currentPage: "link"})}>Аналитика</Nav.Link>
          <Nav.Link href="#issuers" onClick={(e) => mainParent.setState({currentPage: "issuers"})}>Эмитетны</Nav.Link>
          <NavDropdown title="Добавить данные" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1" onClick={(e) => mainParent.setState({currentPage: "action/3.1"})}>Покупка / продажа</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" onClick={(e) => mainParent.setState({currentPage: "action/3.2"})}>Ещё пункт меню</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">И ещё пункт меню</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4" onClick={(e) => mainParent.setState({currentPage: "action/3.1"})}>Управление Эмитентами</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        { !mainParent.state.isLogin && <Button variant="outline-success" href={mainParent.state.loginUrl}>Log In</Button>}
        { mainParent.state.isLogin && <Navbar.Brand>Здравствуй {mainParent.state.userName}</Navbar.Brand>}
        { mainParent.state.isLogin && <Button variant="outline-success" href={mainParent.state.logoutUrl}>Log Out</Button>}
      </Navbar.Collapse>
    </Navbar>
  )
}


export default Header;
