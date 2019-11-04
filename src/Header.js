import React from 'react';

// npm install react-bootstrap bootstrap
// https://react-bootstrap.github.io/components/navs/
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown  from 'react-bootstrap/NavDropdown';

// https://react-bootstrap.github.io/getting-started/introduction/  -> Stylesheets
import './css/Bootstrap_4.3.1/bootstrap.css'


const data_management_menu = [  // Управление данными
  {href: 'issuers', text: 'Эмитенты'},
  {href: 'regions', text: 'Регионы (субъекты РФ)'},
  {href: 'brokerage_accounts', text: 'Брокерские счета'},
  {href: 'securities_types', text: 'Тип ценных бумаг'},
  {href: 'issue_of_securities', text: 'Выпуск ценных бумаг'},
].sort(( a, b ) => {
  if (a.text === b.text) {return 0;}
  return a.text > b.text ? 1 : -1
})


function Header( {mainParent} ) {
  let currentPage = mainParent.state.currentPage.split('');
  if (currentPage[0] === "#") {
    currentPage[0] = "%23"
  }
  currentPage = currentPage.join('');
  const loginUrl = mainParent.state.loginUrl + '?next=/' + currentPage;
  const logoutUrl = mainParent.state.logoutUrl + '?next=/' + currentPage;
  let data_management_menu_code = data_management_menu.map((data) => <NavDropdown.Item
    key={data['href']}
    href={"#" + data['href']}
    onClick={(e) => mainParent.setState({currentPage: "#" + data['href']})}
  >{data['text']}</NavDropdown.Item>);

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home" onClick={() => mainParent.setState({currentPage: "#home"})}>ММВБ Анализатор</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link  href="#home" onClick={() => mainParent.setState({currentPage: "#home"})}>Главная</Nav.Link>
          <Nav.Link href="#link" onClick={() => mainParent.setState({currentPage: "#link"})}>Аналитика</Nav.Link>
          <NavDropdown title="Управление данными" id="basic-nav-dropdown">
            {data_management_menu_code}
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
