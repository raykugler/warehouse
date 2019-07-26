import React, { Component } from 'react';


class Belt extends Component {

    beltMaker=()=>{
        let belt = document.getElementById('belt');
        for(let i = 0; i < 95; i++){
            let row = document.createElement('TR');
            row.classList.add('beltsegment');

            let cell = document.createElement('TD');
            cell.classList.add('beltrod');

            row.appendChild(cell);
            belt.appendChild(row);

    }
    }

    componentDidMount=()=>{
        this.beltMaker()

    }
render(){
    return(
            <table className='belttable'>
                <tbody id='belt'>
                </tbody>
            </table>
    
    );
}}
export default Belt;