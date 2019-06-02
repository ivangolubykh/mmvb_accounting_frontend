import React from 'react';

import Card from 'react-bootstrap/Card';

import ModalDelButtonForm from './ModalDelButtonForm';
import ModalEditButtonForm from './ModalEditButtonForm';


class IssuersCard extends React.Component {
  constructor(props) {
    super(props);
    this.currentPage = props.mainParent.state.currentPage;
    this.data = props.data;
    this.data_parent = props.parent;
    this.editWindowClose = this.editWindowClose.bind(this);
    this.editWindowShow = this.editWindowShow.bind(this);
    this.initalState = {
      showEditModal: false,
      delFormData: {
        "titleLink": "Удалить",
        "titleForm": "Удалить эмитента из БД",
        "url": this.data.url,
        "cardName": this.data.name,
      },
      editFormData: {
        "titleLink": "Редактировать",
        "titleForm": "Редактировать эмитента",
        "url": this.data.url,
        "fields": [
          {
            "name": "name",
            "label": "Название компании",
            "placeholder": 'ООО "Компания"',
            "required": true,
            "type": "text",
            "value": this.data.name,
          },
          {
            "name": "region",
            "label": "Регион",
            "fields": {"id": "url", "name": "munitipal_name"},
            "required": false,
            "type": "select",
            "url": "api/region_fias.json?only_name=true",
            "value": this.data.region,
          },
          {
            "name": "ogrn",
            "label": "ОГРН",
            "placeholder": '1234567890123',
            "required": false,
            "type": "text",
            "value": this.data.ogrn,
          },
          {
            "name": "site",
            "label": "Сайт эмитента",
            "required": false,
            "type": "url",
            "value": this.data.site,
          },
          {
            "name": "comment",
            "label": "Комментарий",
            "required": false,
            "type": "textarea",
            "rows": "3",  // only for textarea type
            "value": this.data.comment,
          },
        ],
      },

    };
    this.state = this.initalState;
  }

  editWindowClose() {
    this.setState(this.initalState);
  }

  editWindowShow() {
    this.setState({ showEditModal: true });
  }

  render() {
    return (
      <>
        <Card border="secondary" style={{ maxWidth: '640px', minWidth: '290px', marginBottom: '10px' }}>
        <Card.Header>
          <Card.Title>{this.data.name}</Card.Title>
        </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">Регион: {this.data.region_name}</Card.Subtitle>
            <Card.Text>{this.data.comment}</Card.Text>
          </Card.Body>
          <Card.Footer className="text-muted">
            <ModalEditButtonForm
              currentPage={this.currentPage}
              icon={<Card.Img variant="null" src="/static/images/icons/edit_32x32.gif" style={{ marginRight: 5 }} />}
              formData={this.state.editFormData}
              data_parent={this.data_parent}
            />
            <ModalDelButtonForm
              currentPage={this.currentPage}
              icon={<Card.Img variant="null" src="/static/images/icons/delete_32x32.gif" style={{ marginRight: 5 }} />}
              formData={this.state.delFormData}
              data_parent={this.data_parent}
            />
          </Card.Footer>
        </Card>
      </>
    );
  }
}


export default IssuersCard;
