import React from 'react';

import Card from 'react-bootstrap/Card';

import ModalDelButtonForm from './ModalDelButtonForm';
import ModalEditButtonForm from './ModalEditButtonForm';


class RegionsCard extends React.Component {
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
        "titleForm": "Удалить регион (субъект РФ) из БД",
        "url": this.data.url,
        "cardName": this.data.munitipal_name,
      },
      editFormData: {
        "titleLink": "Редактировать",
        "titleForm": "Редактировать новый регион (субъект РФ)",
        "url": this.data.url,
        "fields": [
          {
            "name": "munitipal_name",
            "label": "Муниципальное название",
            "placeholder": "Город Санкт-Петербург",
            "required": true,
            "type": "text",
            "value": this.data.munitipal_name,
          },
          {
            "name": "administrative_name",
            "label": "Административное название",
            "placeholder": "Санкт-Петербург город",
            "required": false,
            "type": "text",
            "value": this.data.administrative_name,
          },
          {
            "name": "okato_code",
            "label": "Код ОКАТО",
            "placeholder": "40000000000",
            "required": false,
            "type": "text",
            "value": this.data.okato_code,
          },
          {
            "name": "oktmo_code",
            "label": "Код ОКТМО",
            "placeholder": "40000000",
            "required": false,
            "type": "text",
            "value": this.data.oktmo_code,
          },
          {
            "name": "postcode",
            "label": "Почтовый индекс",
            "placeholder": "190000",
            "required": false,
            "type": "text",
            "value": this.data.postcode,
          },
          {
            "name": "state_uuid",
            "label": "Уникальный номер в государственном адресном реестре",
            "placeholder": "C2DEB16A-0330-4F05-821F-1D09C93331E6",
            "required": false,
            "type": "text",
            "value": this.data.state_uuid,
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
          <Card.Title>{this.data.munitipal_name}</Card.Title>
        </Card.Header>
          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{this.data.administrative_name}</Card.Subtitle>
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

 
export default RegionsCard;
