import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// https://react-bootstrap.github.io/getting-started/introduction/  -> Stylesheets
import './css/Bootstrap_4.3.1/bootstrap.css'
import './css/RequiredTrue.css'
import get_cookie from './utils/get_cookie'


class AddCard extends React.Component {
  constructor(props) {
    super(props);

    this.cardData = props.addCardData;
    this.mainParent = props.mainParent;
    this.parent = props.parent;
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.refForm = React.createRef();
    this.refErrors = React.createRef();
    let formData = {};
    this.cardData.fields.forEach(function(item, i, arr) {
      formData[item.name] = item.value;
    });
    this.initalState = {
      formData: formData,
      formValidated: false,
      formErrors: '',
      showAddModal: false,
    };
    this.state = this.initalState;
  }

  handleClose() {
    this.setState(this.initalState);
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
      for (let i = 0; i < formLength; i++) {
        const elem = formEl[i];
        if (elem.nodeName.toLowerCase() !== "button") {
          if ((!elem.validity.valid) && (elem.labels.length)) {
            errrors.push([elem.labels[0].htmlFor, elem.labels[0].textContent + ' - ' + elem.validationMessage]);
          }
        }
      }
      let formErrors = errrors.map((error) => <div key={error[0]}>{error[1]}</div>);
      this.setState({formErrors: formErrors});
    }
  }

  handleSubmit(event) {
    if (this.refForm.current.checkValidity() === true) {
      const me = this;
      var formData  = new FormData();
      for(var name in this.state.formData) {
        formData.append(name, this.state.formData[name]);
      }

      fetch(this.cardData.url,{
        method: "POST",
        headers: {
          Accept: 'application/json',
          'X-CSRFToken': get_cookie('csrftoken'),
        },
        body: formData,
      })
        .then((response) => {
          if (response.status === 201) {
            me.resetState();
            me.parent.reload();
            return;
          }
          else if (response.status === 400) {
            return response.json();
          }
          return;
        })
        .then((response) => {
          if (response) {
            const keys = Object.keys(response);
            let formErrors = keys.map((key) => <div key={key}>{response[key]}</div>);
            this.setState({formErrors: formErrors, formValidated: false});
          }
          else {
            me.resetState();
          }
        })
        .then((error) => {
          if (error) {
            console.log('error', error);
          }
        })
        .catch(function(ex) {
          console.log('parsing failed', ex);
          me.resetState();
        })
    }
  }

  renderField(fieldData) {
    var formControl;
    if (fieldData.type === 'text') {
      formControl = (
        <Form.Control
          onChange={e => this.changeFormValues(e)}
          placeholder={fieldData.placeholder || fieldData.label}
          required={ fieldData.required || ''}
          type="text"
          value={this.state.formData[fieldData.name]}
        />
      );
    }
    if (fieldData.type === 'url') {
      formControl = (
        <Form.Control
          onChange={e => this.changeFormValues(e)}
          placeholder={fieldData.placeholder || ''}
          required={ fieldData.required || ''}
          type="url"
          value={this.state.formData[fieldData.name]}
        />
      );
    }
    else if (fieldData.type === 'textarea') {
      formControl = (
        <Form.Control
          onChange={e => this.changeFormValues(e)}
          placeholder={fieldData.placeholder || fieldData.label}
          required={ fieldData.required || ''}
          as="textarea"
          rows={ fieldData.rows || "3" }
          value={this.state.formData[fieldData.name]}
        />
      );
    }

    return (
      <div key={fieldData.name}>
        <Form.Group controlId={fieldData.name}>
          <Form.Label className={ ( fieldData.required && "required-true" ) || ""}>{fieldData.label}</Form.Label>
          {formControl}
        </Form.Group>
      </div>
    )
  }

  resetState() {
    this.setState(this.initalState);
  }

  render() {
    const fields = this.cardData.fields.map((fieldData) => this.renderField(fieldData));
    return (
      <>
        <Card border="primary" style={{ maxWidth: '640px', minWidth: '290px', marginBottom: '10px' }}>
          <Card.Body className="text-center">
            <Card.Link href={this.mainParent.state.currentPage} onClick={this.handleShow}>
              <Card.Header>{this.cardData.titleCard}</Card.Header>
              <Card.Img variant="null" src="static/images/plus_01.gif" />
            </Card.Link>
          </Card.Body>
        </Card>

        <Modal show={this.state.showAddModal} onHide={this.handleClose} backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>{this.cardData.titleForm}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form validated={this.state.formValidated} ref={this.refForm}>
              {fields}
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


export default AddCard;
