import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {};
}

export class Header extends Component {
  render() {
    return (
      <header>
      </header>
    );
  }
}

export default connect(
  mapStateToProps,
)(Header);