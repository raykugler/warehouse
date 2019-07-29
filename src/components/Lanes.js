import React, { Component } from 'react';
// import {mapMaker, routeStager, openModal} from './functions';
import {changeRoutes, fillLanes} from './functions';
import {map_data, createLane, openStagingArea} from './data';
import StageModal from './StageModal';
import Belt from './Belt';
import {staging_area_data} from './data';

class Lanes extends Component {
   

    routeStager=(e)=>{
        let modal = document.getElementById('plannedRoutes');
        for (let i = 0; i < staging_area_data.length; i++){
            if(e === staging_area_data[i].location){
                for(let p = 0; p < staging_area_data[i].routes.length;p++){
                    
                    let route = staging_area_data[i].routes[p].routeNumber;
                    let dsp = staging_area_data[i].routes[p].DSP;
                    if(route !== null){
                    console.log(`route: ${route} DSP: ${dsp}`);
                    let routeButton = document.createElement('BUTTON');
                    let routeNumber = document.createTextNode(`${dsp} ${route}`);
                    routeButton.appendChild(routeNumber);
                    routeButton.classList.add('routeButton')
                    routeButton.addEventListener('click', e => changeRoutes(staging_area_data[i],p));
                    modal.appendChild(routeButton);
                }}
                console.log(staging_area_data[i].routes)
            }
        }
        console.log(`working with ${e}`);
    }


 mapMaker=(map_data)=>{

        for ( let i = 0; i < map_data.length; i++){
            let currentLane = map_data[i];
            for(let j = 0; j < currentLane.length; j++){
                let currentArea = currentLane[j];
                let stagingArea = document.createElement('section');
                    stagingArea.classList.add('stagingArea'); 
    
                let stageNumber= document.createElement('button');
                    stageNumber.classList.add('stagingNumber');    
                    stageNumber.setAttribute('id' ,currentArea);
            
                let digit = document.createTextNode(currentArea);
                    stageNumber.addEventListener('click', e => this.props.openModal(currentArea));
    
                let plannedRoutes = document.createElement('div');
                    plannedRoutes.classList.add('plannedRoutes');
    
                let movedRoutes = document.createElement('div');
                    movedRoutes.classList.add('movedRoutes');
                    
                    stageNumber.appendChild(digit);
                    stagingArea.appendChild(stageNumber);
                    stagingArea.appendChild(movedRoutes);
                    stagingArea.appendChild(plannedRoutes);
                         
                    if(i === 0){
                        let lane = document.getElementById('laneTwoHolder');
                        lane.appendChild(stagingArea);
                    }
                    else{
                        let lane = document.getElementById('laneOneHolder');
                        lane.appendChild(stagingArea);
                    }
                }}
           fillLanes();
            }

    componentDidMount=()=>{
       this.mapMaker(map_data);

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
