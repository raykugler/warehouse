import React, { Component } from 'react';
import {createLane, openStagingArea} from './data';
import StageModal from './StageModal';
import Belt from './Belt';
class Lanes extends Component {
   

         


    createLanes = (e,f)=>{

        for ( let i = 2; i < 52; i+=4){
            let number = i;
            let laneTwo = document.getElementById(e)
        
            let stagingArea = document.createElement('section');
            stagingArea.classList.add('stagingArea');
            
            let stageNumber= document.createElement('button');
            stageNumber.classList.add('stagingNumber');
            
            let digit = document.createTextNode(number);
            stageNumber.addEventListener('click', e => this.props.openModal(number));
        
            let plannedRoutes = document.createElement('div');
            plannedRoutes.classList.add('plannedRoutes');
             
            let movedRoutes = document.createElement('div');
            movedRoutes.classList.add('movedRoutes');
        
            stageNumber.appendChild(digit);
            stagingArea.appendChild(stageNumber);
            stagingArea.appendChild(movedRoutes);
            stagingArea.appendChild(plannedRoutes);
            laneTwo.appendChild(stagingArea);
        }
        for ( let i = 1; i < 52; i+=4){
            let number = i;
            let laneTwo = document.getElementById(f)
        
            let stagingArea = document.createElement('section');
            stagingArea.classList.add('stagingArea');
            
            let stageNumber= document.createElement('button');
            stageNumber.classList.add('laneOneStagingNumber');
            
            let digit = document.createTextNode(number);
            stageNumber.addEventListener('click', e => this.props.openModal(number));
        
            let plannedRoutes = document.createElement('div');
            plannedRoutes.classList.add('laneOnePlannedRoutes');
             
            let movedRoutes = document.createElement('div');
            movedRoutes.classList.add('laneOneMovedRoutes');
        
            stageNumber.appendChild(digit);
            stagingArea.appendChild(stageNumber);
            stagingArea.appendChild(movedRoutes);
            stagingArea.appendChild(plannedRoutes);
            laneTwo.appendChild(stagingArea);
        }
        }
fillLanes=()=>{

}
    componentDidMount=()=>{
        this.createLanes('laneTwoHolder','laneOneHolder');
    }
render(){
    return(
        <section className='main'>
            <Belt />
        <section className='laneTwoMain' id='laneTwoHolder'>
        
        </section>

        <section className='laneOneMain' id='laneOneHolder'></section>
        <StageModal
          modalIsOpen={this.props.modalIsOpen}
          closeModal = {this.props.closeModal} 
          afterOpenModal={this.props.afterOpenModal}
          stagingLocation = {this.props.stagingLocation}
          openModal = {this.props.openModal}
          changeRoutes={this.props.changeRoutes}
          routeInput={this.props.routeInput}
          />
        </section>
    );
}}
export default Lanes;
