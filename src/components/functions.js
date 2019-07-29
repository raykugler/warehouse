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

export function fillLanes(){
    let laneTwoCheck = document.getElementById('laneTwoHolder').childElementCount;
for(let i = 0; i < staging_area_data.length; i++){
    for(let j = 0; j< laneTwoCheck; j++){
        if(j===i){
            let thisLocation = document.getElementById(i);
            for(let h = 0; h < staging_area_data[i].routes.length; h++)
{
    console.log(staging_area_data[i].routes[h].routeNumber);
}            
    }}
}
    console.log(staging_area_data);

}

export function changeRoutes(){
    let selectedRoute = document.getElementById('changeRouteInput')
        selectedRoute.classList.remove('routeChangeInputhide');
                selectedRoute.classList.add('routeChangeInput');
            }