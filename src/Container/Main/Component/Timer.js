import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {customStyle} from '../../../Helper/Constants';

const myStyle = StyleSheet.create({
    Container :{ 
        flexDirection : 'row',
        justifyContent : 'center',
        marginLeft : 20
    },
    TimerText : {
        color : '#FFF',
        fontSize : 68
    }
});

class Timer extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render ( ) {
      
        return (
            <View style = {myStyle.Container}>
                <View style = {{width : 100}}>
                    <Text style = {myStyle.TimerText}>
                        {this.props.mins}
                    </Text>
                </View>
                <View style = {{width : 20}}>
                    <Text style = {myStyle.TimerText}>
                        :
                    </Text>
                </View>
                <View style = {{width : 100}}>
                    <Text style = {myStyle.TimerText}>
                        {this.props.seconds}
                    </Text>
                </View>
                <View style = {{width : 20}}>
                    <Text style = {myStyle.TimerText}>
                         :
                    </Text>
                </View>
                <View style = {{width : 100}}>
                    <Text style = {myStyle.TimerText}>
                        {this.props.miliseconds}
                    </Text>
                </View>
            </View>
        );
    }
}

export default Timer;