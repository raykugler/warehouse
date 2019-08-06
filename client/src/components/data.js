export function createRoute(location, dsp, routeNumber){
    console.log('create route');
}
export const map_data = [[50,48,46,42,38,34,30,26,22,18,14,10,6,2,200,230,250],[51,49,45,41,37,33,29,25,21,17,13,9,5,1,100,130,150]];
export const staging_area_data = [
    {location: 50,
        routes:[
        {
            routeNumber: null,
            DSP: null,
    },
         {
            routeNumber: 'CV40',
            DSP: 'DDDL',
    },
         {
            routeNumber: 'CX12',
            DSP: 'JUTR',
    },
         {
            routeNumber: 'CV90',
            DSP: 'BLST',
    },
         {
            routeNumber: 'CT32',
            DSP: 'POLE',
    },
        ]
    },
    {location: 46,
        routes:[ {
            routeNumber: 'CT33',
            DSP: 'DLFR',
        },
      {
            routeNumber: 'CV42',
            DSP: 'DDDL',
        },
     {
            routeNumber: 'CX14',
            DSP: 'JUTR',
        },
     {
            routeNumber: 'CV21',
            DSP: 'BLST',
        },
     {
            routeNumber: 'CT2',
            DSP: 'POLE',
        },
    ]
        },
    {location: 42,
     routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },
{location: 38,
    routes:[ {
        routeNumber: null,
        DSP: null,
    },
  {
        routeNumber: null,
        DSP: null,
    },
  {
        routeNumber: null,
        DSP: null,
    },
  {
        routeNumber: null,
        DSP: null,
    },
  {
        routeNumber: null,
        DSP: null,
    },
 ]
    },
    {location: 34,
        routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },
    {location: 30,
        routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },
    {location: 26,
        routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },
    {location: 22,
        routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },
    {location: 18,
        routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },
    {location: 14,
        routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },    
        {location: 10,
            routes:[ {
                routeNumber: null,
                DSP: null,
            },
          {
                routeNumber: null,
                DSP: null,
            },
          {
                routeNumber: null,
                DSP: null,
            },
          {
                routeNumber: null,
                DSP: null,
            },
          {
                routeNumber: null,
                DSP: null,
            },
         ]
        },
    {location: 6,
        routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },
    {location: 2,
        routes:[ {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
      {
            routeNumber: null,
            DSP: null,
        },
     ]
        },    
    ]



    let openRouteData = [
    {route: 'CV42'}
]






export function openStagingArea(e){
    for(let i = 0; i < 52; i++){
        if(staging_area_data[i].location === e){
            let spot = JSON.stringify(staging_area_data[i])
            console.log(spot)
            
            break; 
        }
        else{
            console.log('no routes here: ' + e);
        }
    }
}    
    



export const routes = [
    {
         route_code: 'CV56',
         dsp: 'DLFR',
         location: 50,
         
     },
     {
        route_code: 'CV52',
        dsp: 'DLFR',
        location: 46,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DLFR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    }, 
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'DDDL',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'JUTR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'JUTR',
        location: 50,
        
    },
    {
        route_code: 'CV56',
        dsp: 'JUTR',
        location: 50,
        
    },
];
//  function changeRoutes(){
//     let selectedRoute = document.getElementById('changeRouteInput')
//     selectedRoute.classList.remove('routeChangeInputhide');
//     selectedRoute.classList.add('routeChangeInput');
// }



// export function routeStager(e){
//     let modal = document.getElementById('plannedRoutes');
//     for (let i = 0; i < staging_area_data.length; i++){
//         if(e === staging_area_data[i].location){
//             for(let p = 0; p < staging_area_data[i].routes.length;p++){
                
//                 let route = staging_area_data[i].routes[p].routeNumber;
//                 let dsp = staging_area_data[i].routes[p].DSP;
//                 if(route !== null){
//                 console.log(`route: ${route} DSP: ${dsp}`);
//                 let routeButton = document.createElement('BUTTON');
//                 let routeNumber = document.createTextNode(`${dsp} ${route}`);
//                 routeButton.appendChild(routeNumber);
//                 routeButton.classList.add('routeButton')
//                 routeButton.addEventListener('click', e => changeRoutes(staging_area_data[i],p));
//                 modal.appendChild(routeButton);
//             }}
//             console.log(staging_area_data[i].routes)
//         }
//     }
//     console.log(`working with ${e}`);
// }
