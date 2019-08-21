import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomHeader from '../Component/CustomHeader';
import {customStyle} from '../../../Helper/Constants';
import Timer from '../Component/Timer';
import RoundButton from '../Component/RoundButton';
import LapView from '../Component/LapView';
import moment from 'moment';

const myStyle = StyleSheet.create({
    Container : {
       
    },
    MainBody : {
        paddingLeft : '5%',
        paddingRight : '5%',
        backgroundColor : customStyle.bodyBGColor,
        height : '100%',
        alignItems : 'center',
    },
    TimeWrapper: {
        flexDirection : 'row',
        marginTop : 30,
    },
    ButtonWrapper: {
        flexDirection : 'row',
        marginTop : 20,
    },
    LapViewWrapper: {
        marginTop : 30,
        flexDirection : 'row',
        borderTopColor : '#555',
        borderTopWidth : 2,
        flex : 1,
        marginBottom : 120,
    }
});


class StopWatch extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
        this.state = {
            isStarted : false,
            startT : 0,
            endT : 0,
            laps : [],
            IntervalTimer : null,
            LapBtnText: "Lap"
        };
    }

    onLapPress = () => {
        
        const curT = new Date().getTime();
        const interval = this.state.endT - this.state.startT;
        let tmpArr = this.state.laps;
        tmpArr.unshift(interval);
        this.setState({
            startT : curT,
            endT : curT,
            laps : tmpArr
        });
    }
    
    onResetPress = () => {
        
        const curT = new Date().getTime();
        const interval = this.state.endT - this.state.startT;
        let tmpArr = this.state.laps;
        tmpArr.unshift(interval);
        this.setState({
            startT : curT,
            endT : curT,
            laps : []
        });
    }

    onStartPress = () => {
        const curT = new Date().getTime();
        this.setState({
            isStarted : true,
            startT : curT,
            endT : curT,
            LapBtnText: "Lap"
        });
        IntervalTimer = setInterval(() => {
            this.setState({
                endT : new Date().getTime(),
            });
        }, 100);

        this.setState({
            IntervalTimer : IntervalTimer
        });
    }

    onStopPress = () => {
        clearInterval(this.state.IntervalTimer);
        this.setState({
            isStarted : false,
            LapBtnText: "Reset"
        });
        this.setState({
            IntervalTimer : null
        });
    }

    render ( ) {
        const util = (num) => num < 10 ? '0' + num : num ;
        const interval = this.state.endT - this.state.startT;
        const duration = moment.duration(interval);
        const mins = util(duration.minutes());
        const seconds = util(duration.seconds());
        const miliseconds = util(Math.floor(duration.milliseconds() / 10));
        return (
            <View style = {myStyle.Container} >
                <CustomHeader title = "STOPWATCH" />
                <View style = {myStyle.MainBody}>
                    <View style = {myStyle.TimeWrapper}>
                        <Timer mins = {mins} seconds= {seconds} miliseconds = {miliseconds} />
                    </View>
                    <View style = {myStyle.ButtonWrapper}>
                        <RoundButton BtnText = {this.state.LapBtnText} onPress = {() =>{this.state.LapBtnText == "Lap" ? this.onLapPress() : this.onResetPress()} } />
                        <View style = {{width : '30%'}}></View>
                        <RoundButton BtnText = { this.state.isStarted == true ? "Stop" : "Start"} onPress = {() =>{  this.state.isStarted == true ? this.onStopPress() : this.onStartPress();} }/>
                    </View>
                    <View style = {myStyle.LapViewWrapper}>
                        <LapView Laps = {this.state.laps} />
                    </View>
                </View>
            </View>
        );
    }
}

export default StopWatch;