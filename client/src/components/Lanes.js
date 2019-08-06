import React, {Component} from 'react';
// import {mapMaker, routeStager, openModal} from './functions';
import {changeRoutes, fillLanes} from './functions';
import {map_data} from './data';
import StageModal from './StageModal';
import Belt from './Belt';
import {routeData} from './routeData'
import {staging_area_data} from './data';

class Lanes extends Component {


  routeStager = (e) => {
    // let modal = document.getElementById('plannedRoutes');
    // for (let i = 0; i < staging_area_data.length; i++) {
    //   if (e === staging_area_data[i].location) {
    //     for (let p = 0; p < staging_area_data[i].routes.length; p++) {

    //       let route = staging_area_data[i].routes[p].routeNumber;
    //       let dsp = staging_area_data[i].routes[p].DSP;
    //       if (route !== null) {
    //         console.log(`route: ${route} DSP: ${dsp}`);
    //         let routeButton = document.createElement('BUTTON');
    //         let routeNumber = document.createTextNode(`${dsp} ${route}`);
    //         routeButton.appendChild(routeNumber);
    //         routeButton.classList.add('routeButton')
    //         routeButton.addEventListener('click', e => changeRoutes(staging_area_data[i], p));
    //         modal.appendChild(routeButton);
    //       }
    //     }
    //     console.log(staging_area_data[i].routes)
    //   }
    // }
    console.log(`working with ${e}`);
  }


  mapMaker = (map_data) => {

    for (let i = 0; i < map_data.length; i++) {
      let currentLane = map_data[i];
      for (let j = 0; j < currentLane.length; j++) {
        let currentArea = currentLane[j];
        let stagingArea = document.createElement('section');
        stagingArea.classList.add('stagingArea');

        let stageNumber = document.createElement('button');
        stageNumber.classList.add('stagingNumber');


        let digit = document.createTextNode(currentArea);
        stageNumber.addEventListener('click', e => this.props.openModal(currentArea));

        let plannedRoutes = document.createElement('div');
        plannedRoutes.classList.add('plannedRoutes');
        plannedRoutes.setAttribute('id', 'staging_area_' + currentArea);

        stageNumber.appendChild(digit);
        stagingArea.appendChild(stageNumber);

        stagingArea.appendChild(plannedRoutes);

        if (i === 0) {
          let lane = document.getElementById('laneTwoHolder');
          lane.appendChild(stagingArea);
        } else {
          let lane = document.getElementById('laneOneHolder');
          lane.appendChild(stagingArea);
        }
      }
    }
    this.fillLanes()
  }

  fillLanes = () => {
    let laneTwoCheck = document.getElementById('laneTwoHolder').childElementCount;
    //console.log(laneTwoCheck)
    for(let i = 0; i < laneTwoCheck; i++){
    let test = document.getElementById('laneTwoHolder').childNodes[i].childNodes[1].id;
    console.log(`test: ${test}`)
    }
    //    var c = document.body.childNodes
   
//    var c = document.getElementById("mySelect").childNodes[2].text;
    // for(let i = 0; i< laneTwoCheck; i++){
    //   let mapLocation =document.getElementById('laneTwoHolder')
    //   for(let j = 0; j < routeData.length; j++){
      
    //     console.log(routeData[j].stagingArea)
    //     let thisLocation = document.getElementById('staging_area_' + routeData[i].stagingArea);
    //   }
     
    // }
     
    // for (let i = 0; i < staging_area_data.length; i++) {
    //   for (let j = 0; j < laneTwoCheck; j++) {
    //     if (j === i) {
    //       for (let h = 0; h < staging_area_data[i].routes.length; h++) {

    //         let thisLocation = document.getElementById('staging_area_' + staging_area_data[i].location);
    //         let route = staging_area_data[i].routes[h].routeNumber;
    //         let dsp = staging_area_data[i].routes[h].DSP;
    //         if (route !== null) {
    //           let routeButton = document.createElement('BUTTON');
    //           let routeNumber = document.createTextNode(`${dsp} ${route}`);
    //           routeButton.appendChild(routeNumber);
    //           routeButton.classList.add('routeButton');
    //           routeButton.addEventListener('click', e => changeRoutes(staging_area_data[i]));
    //           thisLocation.appendChild(routeButton);
    //         } else {

    //         }
    //       }
    //     }
    //   }
    // }

  }

  componentDidMount = () => {
    this.mapMaker(map_data);


  }

  render() {
    return (
      <section className='main'>
        <Belt/>
        <section className='laneTwoMain' id='laneTwoHolder'>

        </section>

        <section className='laneOneMain' id='laneOneHolder'></section>
        <StageModal
          modalIsOpen={this.props.modalIsOpen}
          closeModal={this.props.closeModal}
          afterOpenModal={this.props.afterOpenModal}
          stagingLocation={this.props.stagingLocation}
          openModal={this.props.openModal}
          changeRoutes={this.props.changeRoutes}
          routeInput={this.props.routeInput}
        />
      </section>
    );
  }
}

export default Lanes;
