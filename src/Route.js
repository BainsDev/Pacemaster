import React from 'react';
import {Scene, Router} from 'react-native-router-flux';
import Auth from './Container/Auth/Auth';
import Main from './Container/Main/Main';

//screens
const Routes = () => {
   return (
    <Router>
        <Scene key = "root" hideNavBar = {true}>
            <Scene key = "auth" component = {Auth} title = "Login" initial = {true}/>
            <Scene key = "main" component = {Main} title = "Main"  initial = {false}/>
        </Scene>
    </Router>
   );
};

export default Routes