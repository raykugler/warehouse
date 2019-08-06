import React, { Component } from 'react';
import { beltMaker } from './functions';
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        name: state.config.copyright.name
    }
}

class Belt extends Component {

    
    
    componentDidMount(){
        beltMaker();
    }


        render(){
            return(
                <div className='convBelt' id='convBelt'>

                    {this.props.name}        
                
                </div>
    
    );
}}

        export default connect(mapStateToProps)(Belt)