import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import '../imports/StartUp/accounts-config.js';
import App from '../imports/ui/App.jsx';
// La aplicación no carga
Meteor.startup(() => {
    $.getScript("https://code.jquery.com/jquery-3.2.1.min.js", function () {});
    $.getScript("../../login.js", function () {});
    render(<App />, document.getElementById('root'));
});
