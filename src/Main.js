import React, { Component } from 'react';
import Belt from './components/Belt'
import './App.scss';
import Lanes from './components/Lanes';
import StageModal from './components/StageModal';
import {routeInput} from './components/data';
import {routeStager, beltMaker, changeRoutes} from './components/functions';
// import {createLane} from './components/data'
var wide = window.matchMedia("(min-width: 1020px)")
class Main extends Component {

    constructor() {
        super();
     
        // this.state = {
        //   modalIsOpen: false,
        //   stagingLocation: 0,
        // plannedRoutes:
        //     ['CV50','CX42','CX22']
        
        // };
    }
      
      


    routeInput=()=>{
        let newRoute = document.getElementById("changeRouteButton").value; 
        console.log(`new: ${newRoute}`)
    }
    // openModal=(e)=> {
    //     this.setState({modalIsOpen: true});
    //     this.setState({stagingLocation: e});
    //     console.log(this.state.plannedRoutes.three)
  
    //    console.log(`Staging Area ${e} is open`);
    //    routeStager(e);
        
    // }
    
    afterOpenModal() {
        // references are now sync'd and can be accessed.
      //   this.subtitle.style.color = '#f00';
      }
     
    closeModal=()=> {
        console.log('close')
        this.setState({modalIsOpen: false});
      }
     


render(){
    return(
        <main className='index'>
        

            <Lanes           
//             createLane = {this.createLane}
//             modalIsOpen={this.state.modalIsOpen}
//             closeModal = {this.closeModal} 
//             afterOpenModal={this.afterOpenModal}
//             stagingLocation = {this.state.stagingLocation}
//             openModal = {this.openModal}
// routeInput={this.routeInput}
            />
            
        </main>
    );
}}
export default Main;
