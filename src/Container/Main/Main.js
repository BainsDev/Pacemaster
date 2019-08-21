import React, {Component} from 'react';
import {Text} from 'react-native';
import { createBottomTabNavigator, createAppContainer} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Calculators from './Screens/Calculators';
import StopWatch from './Screens/StopWatch';
import RunningTrack from './Screens/RunningTrack';
import Articles from './Screens/Articles';
import {customStyle} from '../../Helper/Constants';

const MainBottomTab = createBottomTabNavigator(
    {
        StopWatch : {screen : StopWatch},
        RunningTrack : {screen : RunningTrack},
        Articles : {screen : Articles},
        Calculators : { screen : Calculators}
        
    },
    {
        swipeEnabled : false,
        animationEnabled : true,
        lazy : false,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
              const { routeName } = navigation.state;
              let iconName;
              if (routeName === 'Calculators') {
                iconName = 'ios-calculator';
              }
              else if (routeName === 'StopWatch') {
                iconName = 'ios-stopwatch';
              }
              else if (routeName === 'RunningTrack') {
                iconName = 'ios-timer';
              }
              else if (routeName === 'Articles') {
                iconName = 'ios-paper';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={40} color={tintColor} />;
            },
            tabBarLabel : () =>{
              const { routeName } = navigation.state;
              let LabelName;
              if (routeName === 'Calculators') {
                LabelName = 'Calculator';
              }
              else if (routeName === 'StopWatch') {
                LabelName = 'Stopwatch';
              }
              else if (routeName === 'RunningTrack') {
                LabelName = 'Running Tracks';
              }
              else if (routeName === 'Articles') {
                LabelName = 'Articles';
              }
              // You can return any component that you like here!
              return (
                <Text style = {{textAlign : 'center', color : '#AAA'}} >  
                  {LabelName}
                </Text>
              );
            }
        }),
         
        tabBarOptions : {
            
            initialRouteName: 'StopWatch', //first screen
            activeTintColor : '#FFFFFF',
            inactiveTintColor : '#999999',
            style: { 
                backgroundColor : customStyle.headerBGColor,
                height : 60
            },
            labelStyle:{
                textAlign : 'center',
                fontSize : 12
            },
            inactiveBackgroundColor : customStyle.headerBGColor,
            indicatorStyle: {
                borderTopColor : '#ffffff',
                borderTopWidth : 2,
                borderLeftColor : '#ffffff',
                borderLeftWidth : 2
            },
        },
    }
);
  
const MainContainer = createAppContainer(MainBottomTab);

class Main extends Component{
  render() {
    return (
      <MainContainer />
    );
  }
}

export default Main;
