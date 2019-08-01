import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {};
}

export class Header extends Component {
  render() {
    return (
      <header>
        <h1>Warehouse</h1>
      </header>
    );
  }
}

export default connect(
  mapStateToProps,
)(Header);