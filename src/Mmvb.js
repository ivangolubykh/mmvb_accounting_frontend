import React from 'react';

import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import initialState from './initialState';

// https://react-bootstrap.github.io/getting-started/introduction/  -> Stylesheets
import './css/Bootstrap_4.3.1/bootstrap.css'


class Mmvb extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  resetState() {
    this.setState(initialState);
  }

  componentDidMount() {
    var me = this;
    fetch("api/get_session_data/current.json")
      .then((response) => {
        if (response.status !== 200) {
          me.resetState();
          return;
        }
        return response.json()
      })
      .then((response) => {
        if (response) {
          this.setState({isLoaded: true});
          this.setState({isLogin: true});
          this.setState({userName: response.first_name});
          this.setState({items: response});
        }
      })
      .then((error) => {
        if (error) {
          me.resetState();
          this.setState({error});
        }
      })
      .catch(function(ex) {
        console.log('parsing failed', ex);
        me.resetState();
      })
  }

  render() {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header mainParent={this} />
        <Body mainParent={this} />
        {Footer}
      </div>
    );
  }
}


export default Mmvb;
