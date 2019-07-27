
// function gr(belt){
//     let row = document.createElement('TR');
//     row.classList.add('hzbeltsegment');
//    for(let i = 0; i < 95; i++){


//         let cell = document.createElement('TD');
//         cell.classList.add('hzbeltrod');

//         row.appendChild(cell);
        

// }
//     console.log('joj');
//     belt.appendChild(row);
// }
// function ht(belt){
//         for(let i = 0; i < 95; i++){
//         let row = document.createElement('TR');
//         row.classList.add('beltsegment');

//         let cell = document.createElement('TD');
//         cell.classList.add('beltrod');

//         row.appendChild(cell);
//         belt.appendChild(row);

// }
// console.log('llll')
// }

export function beltMaker(wide){
    let belt = document.getElementById('convBelt');
    for(let i = 0; i < 70; i++){
        let beltSegment = document.createElement('div');
        beltSegment.classList.add('beltsegment');


        
        belt.appendChild(beltSegment);
    }
      console.log('hfhfh');
}