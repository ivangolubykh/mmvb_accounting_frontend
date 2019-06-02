import React from 'react';

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

// https://react-bootstrap.github.io/getting-started/introduction/  -> Stylesheets
import './css/Bootstrap_4.3.1/bootstrap.css'
import './css/RequiredTrue.css'
import get_cookie from './utils/get_cookie'


class ModalEditButtonForm extends React.Component {
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
    let formData = {};
    let selects = {};
    this.formData.fields.forEach(function(item, i, arr) {
      formData[item.name] = item.value;
      if (item.type === "select") {
        selects[item.name] = {'url': item.url, fields: item.fields, 'data': [{"id": "", "name": "-"}]}
      }
    });
    this.initalState = {
      formData: formData,
      formValidated: false,
      formErrors: '',
      selects: selects,
      showModal: false,
    };
    this.state = this.initalState;
  }

  componentDidMount() {
    const me = this;
    Object.keys(me.state.selects).forEach(function(item, i, arr) {
      fetch(me.state.selects[item].url).then((response) => {
        if (response.status !== 200) {
          me.resetState();
          return;
        }
        return response.json();
      }).then((response) => {
        if (response) {
          let data = [{"id": "", "name": "-"}];
          response.forEach(function(data_item, i, arr) {
            data.push({"id": data_item[me.state.selects[item].fields.id], "name": data_item[me.state.selects[item].fields.name]});
          });

          let new_selects = {};
          Object.keys(me.state.selects).forEach(function(async_select_item, i, arr) {
            if (async_select_item === item) {
              new_selects[item] = {
                "url": me.state.selects[item].url,
                "fields": me.state.selects[item].fields,
                "data": data,
              };
            }
            else {
              new_selects[item] = {
                "url": me.state.selects[item].url,
                "fields": me.state.selects[item].fields,
                "data": me.state.selects[item].data,
              };
            }
          });
          me.setState({selects: new_selects});
        }
      }).then((error) => {
        if (error) {
          me.resetState();
          this.setState({error});
        }
      }).catch(function(ex) {
        console.log('parsing failed', ex);
        me.resetState();
      })
    });
  }

  handleClose() {
    this.setState(this.initalState);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  changeFormValues(event) {
    var formData = Object.assign({}, this.state.formData);
    formData[event.target.id] = event.target.value;
    this.setState({formData: formData});
    const formEl = this.refForm;
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
    if (this.refForm.checkValidity() === true) {
      const me = this;
      var formData  = new FormData();
      for(var name in this.state.formData) {
        formData.append(name, this.state.formData[name]);
      }

      fetch(this.formData.url,{
        method: "POST",
        headers: {
          Accept: 'application/json',
          'X-CSRFToken': get_cookie('csrftoken'),
        },
        body: formData,
      }).then((response) => {
          if ( (response.status === 200) || (response.status === 201) ) {
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

  renderField(fieldData) {
    var formControl;
    if (fieldData.type === 'pk') {
      return;
    }
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
    else if (fieldData.type === 'select') {
      let options = this.state.selects[fieldData.name].data.map((data) => <option key={data['id']} value={data['id']}>{data["name"]}</option>);
      formControl = (
        <Form.Control
          onChange={e => this.changeFormValues(e)}
          required={ fieldData.required || ''}
          as="select"
        >
          {options}
        </Form.Control>
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
    const fields = this.formData.fields.map((fieldData) => this.renderField(fieldData));
    return (
      <>
        <button onClick={this.handleShow} style={{ margin: '3px' }}>{this.icon ? this.icon : ''}{this.formData.titleLink}</button>

        <Modal show={this.state.showModal} onHide={this.handleClose} backdrop='static'>
          <Modal.Header closeButton>
            <Modal.Title>{this.formData.titleForm}</Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <Form validated={this.state.formValidated} ref={this.refFormFunc}>
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
    );
  }
}


export default ModalEditButtonForm;
