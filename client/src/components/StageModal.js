import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    innerHeight :'400px',
    innerWidth  :'400px'
  }
};
Modal.setAppElement(document.getElementById('root'))

class StageModal extends React.Component {
  
  


    render(){
      return(
       <div>
          <Modal
            openModal={this.props.openModal}
            isOpen={this.props.modalIsOpen}
            onAfterOpen={this.props.afterOpenModal}
            onRequestClose={this.props.closeModal}
            style={customStyles}
            contentLabel="Stage Modal"
            routeInput={this.props.routeInput}
          >
              <section className='modalStyle' id='routeModal'>
                <h3 className='stagingAreaHeader' >
                 Staging Area {this.props.stagingLocation}
                </h3>
                <section className='plannedRouteStyle' id='plannedRoutes'></section>
                <section className='unplannedRouteStyle'></section>
                <section className='routeChangeInputhide' id='changeRouteInput'>
                <input type='text' name='route' className='routeInput' id='changeRouteButton' ></input>
                <button onClick={this.props.routeInput}>Make Change</button>
              </section>
              </section>
              <button onClick={this.props.closeModal}>close</button>
      </Modal>        
</div>
      );
  }}

    export default StageModal;