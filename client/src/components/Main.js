import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getRoutes} from '../actions';
import '../App.scss';
import Lanes from './Lanes';
// import {wide} from './functions'; // your old wide variable
// import {createLane} from './components/data'


export class Main extends Component {

  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      stagingLocation: 0,
      plannedRoutes:
        ['CV50', 'CX42', 'CX22']
    };
  }


  componentDidMount() {
    // Request routes
    this.props.onGetRoutes(this.props.url);
  }


  routeInput = () => {
    let newRoute = document.getElementById("changeRouteButton").value;
    console.log(`new: ${newRoute}`)
  }


  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //   this.subtitle.style.color = '#f00';
  }

  openModal = (e) => {
    this.setState({modalIsOpen: true});
    this.setState({stagingLocation: e});
    let plannedRouteState = this.state.plannedRoutes;
    console.log(plannedRouteState)
    console.log(`Staging Area ${e} is open`);
    //    this.refs.lane.routeStager(e, plannedRouteState);

  };

  closeModal = () => {
    console.log('close')
    this.setState({modalIsOpen: false});
  };

  render() {

    // example routes
    console.log(this.props.routes);

    return (
      <main className='index'>
        <Lanes ref='lane'
          //             createLane = {this.createLane}
               modalIsOpen={this.state.modalIsOpen}
               closeModal={this.closeModal}
               afterOpenModal={this.afterOpenModal}
               stagingLocation={this.state.stagingLocation}
               openModal={this.openModal}
          // routeInput={this.routeInput}
        />

      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    routes: state.routes,
    url: state.config.urls.routes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onGetRoutes: url => dispatch(getRoutes(url))
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(Main);
