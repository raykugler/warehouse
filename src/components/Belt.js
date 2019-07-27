import React, { Component } from 'react';
import { beltMaker } from './functions';


class Belt extends Component {

    componentDidMount(){
        beltMaker();
    }

render(){
    return(
            <div className='convBelt' id='convBelt'>
                
                
            </div>
    
    );
}}
export default Belt;