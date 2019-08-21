import React from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import { Button, Header } from 'react-native-elements';
import {Input } from 'react-native-elements';
import IonicsIcons from 'react-native-vector-icons/Ionicons';
import {Actions} from 'react-native-router-flux';
import {customStyle, Calculator} from '../../../Helper/Constants';
import CustomHeader from '../Component/CustomHeader';

const myStyle = StyleSheet.create({
    Container : {
        backgroundColor : customStyle.bodyBGColor,
        paddingTop : 40,
        paddingLeft : '10%',
        paddingRight : '10%',
        height : '100%'
    },
    MainBody : {
        marginBottom : 120,
    },
    InputContainerStyle : {
        borderBottomColor : '#777',
        borderBottomWidth : 2
    }
});



class LogOutBtn extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    onLogOut = () => {
        Alert.alert(
            'Confirm',
            'Are you sure to log out?',
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

class Timer extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;

        this.state = {
            height : '',
            weight : '',
            steps: '',
            distance : '',
            calories : ''
        }
    }

    floatToStr = (num) => {
        return num.toString().indexOf('.') === -1 ? num.toFixed(1) : num.toFixed(2);
    }
   
    onCalculate = () => {
        console.log(navigator);

        var h = parseFloat(this.state.height);
        var w = parseFloat(this.state.weight);
        var s = parseFloat(this.state.steps);
        console.log(h);
        console.log(w);
        console.log(s);
        var dist = h * Calculator.stride_M * s;
        var cal = (dist / 1000) * Calculator.calories_Km_Kg * w;
        
        this.setState({
            distance : this.floatToStr(dist),
            calories : this.floatToStr(cal)
        });
    }

    render ( ) {
        
        return (
            <View >
                 <CustomHeader title = "Calculator" />
                <View style = {myStyle.Container}>
                    <View style = {myStyle.MainBody}>
                        <ScrollView style = {{maxHeight : '100%'}}>
                            <View>
                                <Text  style = {{color : '#FFF', fontSize : 16, textAlign : 'center'}}>
                                    Your height ( M )
                                </Text>
                                <Input 
                                    inputStyle = {{ color: '#FFF'}}
                                    inputContainerStyle = {myStyle.InputContainerStyle}
                                    placeholderTextColor = {"#888"}
                                    placeholder = "Height" 
                                    value = {this.state.height}
                                    onChangeText = {(value) => 
                                    {   this.setState({height : value})
                                    }}
                                    keyboardType = "numeric"
                                />
                            </View>
                            <View>
                                <Text  style = {{color : '#FFF', fontSize : 16, textAlign : 'center'}}>
                                    Weight (Kg) 
                                </Text>
                                <Input 
                                    inputStyle = {{ color: '#FFF'}}
                                    inputContainerStyle = {myStyle.InputContainerStyle}
                                    placeholderTextColor = {"#888"}
                                    placeholder = "Weight" 
                                    value = {this.state.weight}
                                    onChangeText = {(value) => 
                                    {   this.setState({weight : value})
                                    }}
                                    keyboardType = "numeric"
                                />
                            </View>
                            <View>
                                <Text  style = {{color : '#FFF', fontSize : 16, textAlign : 'center'}}>
                                    Steps 
                                </Text>
                                <Input 
                                    inputStyle = {{ color: '#FFF'}}
                                    inputContainerStyle = {myStyle.InputContainerStyle}
                                    placeholderTextColor = {"#888"}
                                    placeholder = "Steps" 
                                    value = {this.state.steps}
                                    onChangeText = {(value) => 
                                    {   this.setState({steps : value})
                                    }}
                                    keyboardType = "numeric"
                                />
                            </View>
                            <View style = {{marginVertical : 30, width : '50%', marginLeft : 'auto', marginRight : 'auto'}}>
                                <Button title = "Calculate" onPress = {() => this.onCalculate()} />
                            </View>
                            <View>
                                <Text  style = {{color : '#FFF', fontSize : 16, textAlign : 'center'}}>
                                    Distance you walked ( M )
                                </Text>
                                <Input 
                                    inputStyle = {{ color: '#FFF'}}
                                    inputContainerStyle = {myStyle.InputContainerStyle}
                                    placeholderTextColor = {"#888"}
                                    placeholder = "Distance" 
                                    value = {this.state.distance}
                                    editable = {false}
                                    keyboardType = "numeric"
                                />
                            </View>
                            <View style = {{paddingBottom : 70}}>
                                <Text  style = {{color : '#FFF', fontSize : 16, textAlign : 'center'}}>
                                    Calories you burnt
                                </Text>
                                <Input 
                                    inputStyle = {{ color: '#FFF'}}
                                    inputContainerStyle = {myStyle.InputContainerStyle}
                                    placeholderTextColor = {"#888"}
                                    placeholder = "Calories" 
                                    value = {this.state.calories}
                                    editable = {false}
                                    keyboardType = "numeric"
                                />
                            </View>
                        </ScrollView>
                    </View>
                </View>
                
            </View>
        );
    }
}

export default Timer;