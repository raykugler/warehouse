import React, { Component } from 'react';
import Belt from './components/Belt'
import './App.scss';
import Lanes from './components/Lanes';
import StageModal from './components/StageModal';
import {routeInput} from './components/data';
import {routeStager, beltMaker, changeRoutes} from './components/functions';
import {staging_area_data} from './components/data';
// import {createLane} from './components/data'
var wide = window.matchMedia("(min-width: 1020px)")
class Main extends Component {

    constructor() {
        super();
     
        this.state = {
          modalIsOpen: false,
          stagingLocation: 0,
        plannedRoutes:
            ['CV50','CX42','CX22']
        
        };
    }
 
      
 


    routeInput=()=>{
        let newRoute = document.getElementById("changeRouteButton").value; 
        console.log(`new: ${newRoute}`)
    }

    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
      //   this.subtitle.style.color = '#f00';
      }
      openModal=(e)=> {
        this.setState({modalIsOpen: true});
        this.setState({stagingLocation: e});
        let plannedRouteState = this.state.plannedRoutes;
        console.log(plannedRouteState)
       console.log(`Staging Area ${e} is open`);
    //    this.refs.lane.routeStager(e, plannedRouteState);
        
    }   
    closeModal=()=> {
        console.log('close')
        this.setState({modalIsOpen: false});
      }
     


render(){
    return(
        <main className='index'>
        

            <Lanes  ref='lane'         
//             createLane = {this.createLane}
             modalIsOpen={this.state.modalIsOpen}
             closeModal = {this.closeModal} 
             afterOpenModal={this.afterOpenModal}
                stagingLocation = {this.state.stagingLocation}
                openModal = {this.openModal}
// routeInput={this.routeInput}
            />
        
            
        </main>
    );
}}
export default Main;
