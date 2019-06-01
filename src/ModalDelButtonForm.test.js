import React from 'react';
import ReactDOM from 'react-dom';

import Card from 'react-bootstrap/Card';

import ModalDelButtonForm from './ModalDelButtonForm';
import initialState from './initialState';


const delFormData = {
  "titleLink": "Удалить",
  "titleForm": "Удалить регион (субъект РФ) из БД",
  "url": "",
  "cardName": "Название",
}



class MainParent extends React.Component {
  constructor(props) {
    super(props);
    this.currentPage = "#";
    initialState["currentPage"] = "#region"
    this.state = initialState;
  }

  render() {
    return  <ModalDelButtonForm
              currentPage={this.currentPage}
              icon={<Card.Img variant="null" src="/static/images/icons/edit_32x32.gif" style={{ marginRight: 5 }} />}
              formData={delFormData}
            />;
  }
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainParent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
