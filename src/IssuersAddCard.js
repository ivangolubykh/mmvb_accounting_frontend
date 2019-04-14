import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// https://react-bootstrap.github.io/getting-started/introduction/  -> Stylesheets
import './css/Bootstrap_4.3.1/bootstrap.css'


const initalState = {
      formData: {
        longNameIssuer: '',
        shortNameIssuer: '',
        urlIssuer: '',
      },
      formValidated: false,
      showAddModal: false,
};


class IssuersAddCard extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.mainParent = props.mainParent;
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.refForm = React.createRef();
    this.state = initalState;
  }

  handleClose() {
    this.setState(initalState);
  }

  handleShow() {
    this.setState({ showAddModal: true });
  }

  changeFormValues(event) {
    var formData = Object.assign({}, this.state.formData);
    formData[event.target.id] = event.target.value;
    this.setState({formData: formData});
    if (this.refForm.current.checkValidity() === true) {
      this.setState({formValidated: true});
    }
    else {
      this.setState({formValidated: false});
    }
  }

  handleSubmit(event) {
    if (this.refForm.current.checkValidity() === true) {
      console.log('Время отправляеть форму');
      console.log('state', this.state);

      var me = this;
      fetch("api/get_session_data/current.json",{
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:  JSON.stringify(this.state.formData),
      })
        .then((response) => {
          if (response.status !== 200) {

            // me.resetState();

            return;
          }
          return response.json()
        })
        .then((response) => {
          if (response) {
            // this.setState({isLoaded: true});
            // this.setState({isLogin: true});
            // this.setState({userName: response.first_name});
            // this.setState({items: response});
          }
        })
        .then((error) => {
          if (error) {

            // me.resetState();
            // this.setState({error});
          }
        })
        .catch(function(ex) {
          console.log('parsing failed', ex);
          // me.resetState();
        })


    }
  }

  render() {
    var me = this;
    return (
      <>
        <Card border="primary" style={{ maxWidth: '640px', minWidth: '290px', marginBottom: '10px' }}>
          <Card.Body className="text-center">
            <Card.Link href="#" onClick={this.handleShow}>
              <Card.Header>Добавить эмитента-</Card.Header>
              <Card.Img variant="null" src="static/images/plus_01.gif" />
            </Card.Link>
          </Card.Body>
        </Card>

        <Modal show={this.state.showAddModal} onHide={this.handleClose} backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>Добавить нового эмитента</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form validated={this.state.formValidated} ref={this.refForm}>
              <Form.Group controlId="longNameIssuer">
                <Form.Label>Полное название эмитента</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Название эмитента"
                  required
                  type="text"
                  value={this.state.formData.longNameIssuer}
                />
              </Form.Group>
              <Form.Group controlId="shortNameIssuer">
                <Form.Label>Короткое название эмитента</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Название эмитента"
                  required
                  type="text"
                  value={this.state.formData.shortNameIssuer}
                />
              </Form.Group>
              <Form.Group controlId="urlIssuer">
                <Form.Label>Сайт эмитента</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Сайт эмитента"
                  required
                  type="url"
                  value={this.state.formData.urlIssuer}
                />
              </Form.Group>
              <Form.Text>
                <Alert variant={ this.state.formValidated ? 'success' : 'danger' }>* Все поля обязательны для заполнения.</Alert>
              </Form.Text>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Закрыть не сохраняя
            </Button>
            <Button variant="primary" onClick={e => this.handleSubmit(e)}>
              Сохранить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}


export default IssuersAddCard;
