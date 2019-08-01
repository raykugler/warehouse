import {staging_area_data} from './data';


export function beltMaker(wide){
    let belt = document.getElementById('convBelt');
    for(let i = 0; i < 70; i++){
        let beltSegment = document.createElement('div');
        beltSegment.classList.add('beltsegment');


        
        belt.appendChild(beltSegment);
    }
      console.log('hfhfh');
}

export var wide = () => window.matchMedia("(min-width: 1020px)");

// export function fillLanes(){
//     let laneTwoCheck = document.getElementById('laneTwoHolder').childElementCount;
//     console.log(`lane two check: ${laneTwoCheck}`)
// for(let i = 0; i < staging_area_data.length; i++){
//     for(let j = 0; j< laneTwoCheck; j++){
//         if(j===i){
//             for(let h = 0; h < staging_area_data[i].routes.length; h++)
// {
//     let thisLocation = document.getElementById('staging_area_' + j);
//     let routeTest = staging_area_data[i].routes[h].routeNumber;
//     let numberTest = document.createTextNode(routeTest);
//     thisLocation.appendChild(numberTest);
// }            
//     }}
// }

// }

export function changeRoutes(){
    let selectedRoute = document.getElementById('changeRouteInput')
        selectedRoute.classList.remove('routeChangeInputhide');
                selectedRoute.classList.add('routeChangeInput');
            }