import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    text: state.config.copyright.text,
    url: state.config.copyright.url,
    name: state.config.copyright.name
  };
}

export class Footer extends Component {
  render() {
    return (
      <footer>
        <div>
          <span>{this.props.text} </span>
          <a href={this.props.url}
             target="_blank">{this.props.name}</a>
        </div>
      </footer>
    );
  }
}

export default connect(
  mapStateToProps,
)(Footer);