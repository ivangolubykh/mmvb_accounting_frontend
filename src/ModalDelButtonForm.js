import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// https://react-bootstrap.github.io/getting-started/introduction/  -> Stylesheets
import './css/Bootstrap_4.3.1/bootstrap.css'
import './css/RequiredTrue.css'
import get_cookie from './utils/get_cookie'


class ModalDelButtonForm extends React.Component {
  constructor(props) {
    super(props);
    this.icon = props.icon;
    this.formData = props.formData;
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.data_parent = props.data_parent;
    this.refForm = null;
    this.refFormFunc = element => {
      if (element) {
        this.refForm = element;
        if (this.refForm.checkValidity()) {
          this.setState({formValidated: true, formErrors: ''});
        }
        else {
          this.setState({formValidated: false});
        }
      }
    };
    this.initalState = {
      formValidated: false,
      formErrors: '',
      showModal: false,
    };
    this.state = this.initalState;
  }

  handleClose() {
    this.setState(this.initalState);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleSubmit(event) {
    if (this.refForm.checkValidity() === true) {
      const me = this;
      var formData  = new FormData();
      formData.append('destroy_model_instance', true);

      fetch(this.formData.url,{
        method: "POST",
        headers: {
          Accept: 'application/json',
          'X-CSRFToken': get_cookie('csrftoken'),
        },
        body: formData,
      }).then((response) => {
          if ( (response.status === 200) || (response.status === 204) ) {
            me.data_parent.reload();
            return;
          }
          else if (response.status === 400) {
            return response.json();
          }
          return;
      }).then((response) => {
          if (response) {
            const keys = Object.keys(response);
            let formErrors = keys.map((key) => <div key={key}>{response[key]}</div>);
            this.setState({formErrors: formErrors, formValidated: false});
          }
      }).then((error) => {
          if (error) {
            console.log('error', error);
          }
      }).catch(function(ex) {
          console.log('parsing failed', ex);
          me.resetState();
      })
    }
  }

  resetState() {
    this.setState(this.initalState);
  }

  render() {
    return (
      <>
        <button onClick={this.handleShow} style={{ margin: '3px' }}>{this.icon ? this.icon : ''}{this.formData.titleLink}</button>

        <Modal show={this.state.showModal} onHide={this.handleClose} backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>{this.formData.titleForm}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form validated={this.state.formValidated} ref={this.refFormFunc}>
                {this.formData.cardName}
              <Form.Text>
                <Alert variant='danger' show={!this.state.formValidated}>
                <div ref={this.refErrors}>{this.state.formErrors}</div>
                </Alert>
              </Form.Text>
            </Form>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Отмена (не удалять)
            </Button>
            <Button variant="primary" onClick={e => this.handleSubmit(e)}>
              Удалить
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}


export default ModalDelButtonForm;
