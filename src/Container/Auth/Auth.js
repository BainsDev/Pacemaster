import React from 'react';
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import {View, Button, StyleSheet, Text, Image, ImageBackground} from 'react-native';

import LogBackImg from '../../../assets/imgs/main/logonew.png';
import Login from './Login';
import SignUp from './SignUp';

const myStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems : 'stretch',
    },
    Logo_View: {
       width : '100%',
       height: '34%'
    },
    Lgo_BackImg : {
        width : '100%',
        height : '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    Logo_Text : {
        fontSize: 20,
        color : '#a1a1a1',
    },
    LogImg : {
    }
    
});

const Logo = () => {
    //require("../../../assets/imgs/logo1.png")
    return(
        <View style = {myStyle.Logo_View}>
            <ImageBackground style = {myStyle.Lgo_BackImg}  source = {LogBackImg}  >
              
                <Text style = {myStyle.Logo_Text}>PACEMASTER</Text>
            </ImageBackground>
        </View>
    );
}

const AuthTap = createMaterialTopTabNavigator(
    {
        Login : { screen : Login},
        SignUp : {screen : SignUp},
    },
    {
        tabBarPosition: 'top',
        swipeEnabled : true,
        animationEnabled : true,
        tabBarOptions : {
            initialRouteName: 'Login',
            activeTintColor : '#FFFFFF',
            inactiveTintColor : '#F8F8F8',
            style: { 
                backgroundColor : 'rgb(81,62,83)',
            },
            labelStyle:{
                textAlign : 'center',
            },
            indicatorStyle: {
                borderBottomColor : '#87B56A',
                borderBottomWidth : 2,
            },
        },
    }
);

const AuthContainer = createAppContainer(AuthTap);

class Auth extends React.Component {

    render () {
        console.log("AUTH page");
        return (
            <View style = {myStyle.container}>
                <Logo/>
                <AuthContainer />
            </View>
            
        );
    }
}

export default Auth;
