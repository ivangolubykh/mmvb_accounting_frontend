import React from 'react';
import ReactDOM from 'react-dom';

import Card from 'react-bootstrap/Card';

import ModalButtonForm from './ModalButtonForm';
import initialState from './initialState';


const editFormData = {
  "titleLink": "Редактировать",
  "titleForm": "Добавить новый регион (субъект РФ)",
  "url": "",
  "fields": [
    {
      "name": "munitipal_name",
      "label": "Муниципальное название",
      "placeholder": "Город Санкт-Петербург",
      "required": true,
      "type": "text",
      "value": "",
    },
    {
      "name": "administrative_name",
      "label": "Административное название",
      "placeholder": "Санкт-Петербург город",
      "required": false,
      "type": "text",
      "value": "",
    },
  ],
}


class MainParent extends React.Component {
  constructor(props) {
    super(props);
    this.currentPage = "#";
    initialState["currentPage"] = "#region"
    this.state = initialState;
  }

  render() {
    return  <ModalButtonForm
              currentPage={this.currentPage}
              icon={<Card.Img variant="null" src="/static/images/icons/edit_32x32.gif" style={{ marginRight: 5 }} />}
              formData={editFormData}
            />;
  }
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainParent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
