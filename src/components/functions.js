import {staging_area_data} from './data';


function openModal(e){
    this.setState({modalIsOpen: true});
    this.setState({stagingLocation: e});
    console.log(this.state.plannedRoutes.three)

   console.log(`Staging Area ${e} is open`);
   routeStager(e);
    
}    

export function routeStager(e){
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

export function beltMaker(wide){
    let belt = document.getElementById('convBelt');
    for(let i = 0; i < 70; i++){
        let beltSegment = document.createElement('div');
        beltSegment.classList.add('beltsegment');


        
        belt.appendChild(beltSegment);
    }
      console.log('hfhfh');
}

export function mapMaker(map_data){
    console.log(map_data[0],map_data[1]);
    for ( let i = 0; i < map_data.length; i++){
        let currentLane = map_data[i];
        for(let j = 0; j < currentLane.length; j++){
            let currentArea = currentLane[j];
            let stagingArea = document.createElement('section');
                stagingArea.classList.add('stagingArea'); 

            let stageNumber= document.createElement('button');
                stageNumber.classList.add('stagingNumber');    
        
            let digit = document.createTextNode(currentArea);
                stageNumber.addEventListener('click', e => openModal(currentArea));

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
            }}}

export function changeRoutes(){
    let selectedRoute = document.getElementById('changeRouteInput')
        selectedRoute.classList.remove('routeChangeInputhide');
                selectedRoute.classList.add('routeChangeInput');
            }