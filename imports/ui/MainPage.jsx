import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/MainPage.css';
import {Accounts} from 'meteor/accounts-base'
import {Meteor} from 'meteor/meteor';
import './css/MainPage.css';

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            texto: "",
            userName: "",
            email: "",
            password: "",
            profile: {name: ""}
        }
    }

    cambiarTexto(texto) {
        this.setState({texto: texto})
    }

    onEnterLogIn() {

        Meteor.loginWithPassword(this.state.userName, this.state.password, (error) => {
            if (error)
                console.log(error);
            else
                console.log('Bien :D')
        })
        console.log(this.state.userName,this.state.email,this.state.password,this.state.profile)
    }

    onEnterSignUp() {
        // Nunca se debería quemar el password de una persona dentro de la aplicación 
        Accounts.createUser({
            username: this.state.userName,
            email: this.state.email,
            password: this.state.password,
            profile: this.state.profile
        }, (error) => {
            if (error)
                console.log(error);
            else
                console.log('Bien :D')
        })
        console.log(this.state.userName,this.state.email,this.state.password,this.state.profile)
    }
    cambiarEstadoApp() {

        this.props.updateV('selectionView');
    }
    demo(){


    }

    render() {
        return (
            <div className="MainPage">
                <div className="container">
                    <form className="signUp">
                        <img src="images/logo.png" alt="Logo SAMM" height="90" width="270"/>
                        <br/>
                        <p>Create your account
                        </p>
                        <input className="w100" type="userName" placeholder="Insert user name" onChange={ (event) => {
                            this.setState({userName: event.target.value, profile: {name: event.target.value}})
                        }}/>
                        <input className="w100" type="email" placeholder="Insert eMail" onChange={ (event) => {
                            this.setState({email: event.target.value})
                        }}/>
                        <input type="password" placeholder="Insert Password"/>
                        <input type="password" placeholder="Verify Password" onChange={ (event) => {
                            this.setState({password: event.target.value})
                        }}/>
                        <button className="form-btn sx log-in" type="button" onClick={ (event) => {
                            event.preventDefault();
                            this.onEnterLogIn()
                        }}>Log In
                        </button>
                        <button className="form-btn dx" type="submit" onClick={ (event) => {
                            event.preventDefault();
                            this.onEnterSignUp();
                            this.onEnterLogIn();
                            this.cambiarEstadoApp();
                        }}>Sign Up
                        </button>
                    </form>
                    <form className="signIn">
                        <img src="images/logo.png" alt="Logo SAMM" height="90" width="270"/>
                        <button className="fb" type="button">Log In With Facebook</button>
                        <p>- or -</p>
                        <input type="email" placeholder="Insert eMail"/>
                        <input type="password" placeholder="Insert Password"/>
                        <button className="form-btn sx back" type="button">Back</button>
                        <button className="form-btn dx" type="submit">Log In</button>
                    </form>
                </div>
                <div className="button-container-1 demo">
                    <span className="mas demo">App for creating awesome music between people</span><a href="https://www.youtube.com/watch?v=izSoM3-0JgU&list=RDizSoM3-0JgU">
                    <button id='work' type="button" name="Hover">DEMO</button></a>
                </div>

            </div>
        );
    }
}


export default MainPage;
