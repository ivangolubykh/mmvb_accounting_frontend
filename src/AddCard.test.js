import React from 'react';
import ReactDOM from 'react-dom';

import AddCard from './AddCard';
import initialState from './initialState';


const addCardData = {
  "title": "Добавить нового эмитента",
  "url": "test.json",
  "fields": [
    {
      "name": "textField",
      "label": "Текстовое поле формы",
      "placeholder": "тут текст надо ввести",
      "required": true,
      "type": "text",
    },
    {
      "name": "urlField",
      "label": "URL-поле формы",
      "required": true,
      "type": "url",
    },
    {
      "name": "textareaField",
      "label": "Textarea-поле формы",
      "required": false,
      "type": "textarea",
      "rows": "3",  // only for textarea type
    },
  ],
}


class MainParent extends React.Component {
  constructor(props) {
    super(props);
    initialState["currentPage"] = "#region"
    this.state = initialState;
  }

  render() {
    return <AddCard mainParent={this} addCardData={addCardData} />;
  }
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainParent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
