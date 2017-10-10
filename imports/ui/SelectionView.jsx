import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/SelectionView.css';
import {Meteor} from 'meteor/meteor';

class SelectionView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    cambiarEstadoApp() {

        this.props.updateV('room');
    }

    render() {
        return (
            <div className="SelectionView">
                <div className="header"><img src="images/logo.png" alt="Logo SAMM" height="90" width="270"/></div>
                <div className="button-container-1">
                    <span className="mas">Interact with your saved songs</span>
                    // Este botón no tiene acción asociada
                    <button id='work' type="button" name="Hover">Saved songs</button>
                </div>
                <div className="button-container-3">
                    <span className="mas">Create awesome music with people</span>
                    <button type="button" name="Hover" onClick={()=>this.cambiarEstadoApp()}>Virtual room</button>
                </div>
            </div>
        );
    }
}


export default SelectionView;
