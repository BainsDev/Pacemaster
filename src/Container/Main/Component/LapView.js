import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {customStyle} from '../../../Helper/Constants';
import moment from 'moment';

const myStyle = StyleSheet.create({
    LapContainer :{ 
        flexDirection : 'row',
        justifyContent : 'space-between',
        marginLeft : 20,
        borderBottomColor : '#777',
        borderBottomWidth : 1,
        paddingVertical : 10
    },
    LapText : {
        color : '#FFF',
        fontSize : 16
    }
});

const Lap = (props) => {
    const util = (num) => num < 10 ? '0' + num : num ;
    const duration = moment.duration(props.interval);
    const miliseconds = Math.floor(duration.milliseconds() / 10);
    const lapText = 'Lap ' + props.index;
    
    return (
        <View style = {myStyle.LapContainer}>
            <View>
                <Text style = {myStyle.LapText}>
                    {lapText} 
                </Text>
            </View>
            <View >
                <Text style = {myStyle.LapText}>
                    {util(duration.minutes())}:{util(duration.seconds())}:{util(miliseconds)}
                </Text>
            </View>
        </View>
    );
}

class LapView extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render ( ) {
        return (
            <ScrollView style = {{maxHeight : '100%'}}>
                {
                    this.props.Laps.map((lap, index) => (
                        <Lap index = { this.props.Laps.length - index} interval = {lap} key = {index}></Lap>
                    ))
                }
            </ScrollView>
        );
    }
}

export default LapView;