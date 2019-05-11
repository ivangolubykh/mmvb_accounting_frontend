import React from 'react';
import ReactDOM from 'react-dom';

import initialState from './initialState';
import RegionsCard from './RegionsCard';


const region = {
  administrative_name: "Санкт-Петербург город",
  comment: "",
  munitipal_name: "Город Санкт-Петербург",
  okato_code: "40000000000",
  oktmo_code: "40000000",
  postcode: "190000",
  state_uuid: "C2DEB16A-0330-4F05-821F-1D09C9",
  url: "http://mmvb.localhost/api/region_fias/1.json",
}


class MainParent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    return <RegionsCard data={region} mainParent={this} />;
  }
}


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainParent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
