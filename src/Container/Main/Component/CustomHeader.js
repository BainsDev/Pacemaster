import React from 'react';
import {View, Text, Alert} from 'react-native';
import {Header} from 'react-native-elements';
import IonicsIcons from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';

import {customStyle} from '../../../Helper/Constants';

class LogOutBtn extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    onLogOut = () => {
        Alert.alert(
            'Confirm',
            'Are you sure you wish to log out?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'Confirm', onPress: () => Actions.auth()},
            ],
            {cancelable: false},
        );
    }

    render () {
        return(
            <View>
                <IonicsIcons name= 'md-log-out' size = {35} color = '#FFF' onPress = {() =>this.onLogOut()} />
            </View>
        );
    }
}

class CustomHeader extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render ( ) {
        const MsgTxt = "Hello, " + global.user;
        return (
            <View >
                <Header
                    backgroundColor = {customStyle.headerBGColor}
                    containerStyle = {{height : 60, paddingTop : 10}}
                    rightContainerStyle = {{paddingRight : 20}}
                    centerComponent={{ text: this.props.title, style: { color: '#fff', fontSize : 20} }}
                    rightComponent={<LogOutBtn />}
                    leftComponent = {<Text style = {{ width: 250, color : '#AAA', fontSize : 16}}>{MsgTxt}</Text>}
                    leftContainerStyle = {{width : 250,maxWidth : 250}}
                />
            </View>
        );
    }
}

export default CustomHeader;