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
  let currentPage = mainParent.state.currentPage.split('');
  if (currentPage[0] === "#") {
    currentPage[0] = "%23"
  }
  currentPage = currentPage.join('');
  const loginUrl = mainParent.state.loginUrl + '?next=/' + currentPage;
  const logoutUrl = mainParent.state.logoutUrl + '?next=/' + currentPage;

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" onClick={() => mainParent.setState({currentPage: "#home"})}>ММВБ Анализатор</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link  href="#home" onClick={() => mainParent.setState({currentPage: "#home"})}>Главная</Nav.Link>
          <Nav.Link href="#link" onClick={() => mainParent.setState({currentPage: "#link"})}>Аналитика</Nav.Link>
          <NavDropdown title="Управление данными" id="basic-nav-dropdown">
            <NavDropdown.Item href="#issuers" onClick={(e) => mainParent.setState({currentPage: "#issuers"})}>Эмитенты</NavDropdown.Item>
            <NavDropdown.Item href="#regions" onClick={(e) => mainParent.setState({currentPage: "#regions"})}>Регионы (субъекты РФ)</NavDropdown.Item>
            <NavDropdown.Item href="#brokerage_accounts" onClick={(e) => mainParent.setState({currentPage: "#brokerage_accounts"})}>Брокерские счета</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2" onClick={(e) => mainParent.setState({currentPage: "#action/3.2"})}>Ещё пункт меню</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#help" onClick={(e) => mainParent.setState({currentPage: "#help"})}>Помощь</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        { !mainParent.state.isLogin && <Button variant="outline-success" href={loginUrl}>Log In</Button>}
        { mainParent.state.isLogin && <Navbar.Brand>Здравствуй {mainParent.state.userName}</Navbar.Brand>}
        { mainParent.state.isLogin && <Button variant="outline-success" href={logoutUrl}>Log Out</Button>}
      </Navbar.Collapse>
    </Navbar>
  )
}


export default Header;
