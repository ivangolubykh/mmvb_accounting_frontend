import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// https://react-bootstrap.github.io/getting-started/introduction/  -> Stylesheets
import './css/Bootstrap_4.3.1/bootstrap.css'
import './css/RequiredTrue.css'

const initalState = {
      formData: {
        longNameIssuer: '',
        shortNameIssuer: '',
        urlIssuer: '',
        region: '',
        address: '',
        comment: '',
      },
      formValidated: false,
      formErrors: '',
      showAddModal: false,
};


class IssuersAddCard extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.mainParent = props.mainParent;
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.refForm = React.createRef();
    this.refErrors = React.createRef();
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
    const formEl = this.refForm.current;
    if (formEl.checkValidity() === true) {
      this.setState({formValidated: true, formErrors: ''});
    }
    else {
      var errrors = [];
      this.setState({formValidated: false});
      const formLength = formEl.length;
      const errorLabel = this.refErrors.current;
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        if (elem.nodeName.toLowerCase() !== "button") {
          if ((!elem.validity.valid) && (elem.labels.length)) {
            errrors.push(elem.labels[0].innerText + ' - ' + elem.validationMessage);
          }
        }
      }
      let formErrors = errrors.map((error) => <div>{error}</div>);
      this.setState({formErrors: formErrors});
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
                <Form.Label className="required-true">Полное название эмитента</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Полное название эмитента"
                  required
                  type="text"
                  value={this.state.formData.longNameIssuer}
                />
              </Form.Group>
              <Form.Group controlId="shortNameIssuer">
                <Form.Label className="required-true">Короткое название эмитента</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Короткое название эмитента"
                  required
                  type="text"
                  value={this.state.formData.shortNameIssuer}
                />
              </Form.Group>
              <Form.Group controlId="urlIssuer">
                <Form.Label className="required-true">Сайт эмитента</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Сайт эмитента"
                  required
                  type="url"
                  value={this.state.formData.urlIssuer}
                />
              </Form.Group>
              <Form.Group controlId="region">
                <Form.Label>Регион (субъект РФ)</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Регион (субъект РФ)"
                  type="text"
                  value={this.state.formData.region}
                />
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Адрес</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Адрес"
                  type="text"
                  value={this.state.formData.address}
                />
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Комментарий</Form.Label>
                <Form.Control
                  onChange={e => this.changeFormValues(e)}
                  placeholder="Комментарий"
                   as="textarea" rows="3"
                  value={this.state.formData.comment}
                />
              </Form.Group>
              <Form.Text>
                <Alert variant={ this.state.formValidated ? 'success' : 'danger' }>* Эти поля обязательны для заполнения.
                <br />
                <div ref={this.refErrors}>{this.state.formErrors}</div>
                </Alert>
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
