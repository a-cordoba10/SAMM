import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Meteor} from 'meteor/meteor'

export default class DrawerMenu extends React.Component {

    constructor(props) {
        super(props);

    }

    logOut() {
        Meteor.logout((error) => {
            if (error)
                console.log(error);
            else
                console.log('log out')
        });
        this.props.vista('login');
    }


    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.props.estado}
                    onRequestChange={() => {
                        this.props.cerrar()
                    }}
                >
                    //La función que guarda la canción no se llama así, por lo que esta nunca se guarda
                    <MenuItem onClick={()=>{this.props.saveSong()}}>Save your song</MenuItem>
                    <MenuItem onClick={()=>{this.logOut()}}>Log out</MenuItem>
                </Drawer>
            </div>
        );
    }
}
