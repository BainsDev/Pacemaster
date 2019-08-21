import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {customStyle} from '../../../Helper/Constants';

const myStyle = StyleSheet.create({
    Button : {
        color : '#FFF',
    },
    BtnWrap : {
        backgroundColor : '#21442F',
        width: 72,
        height : 72,
        borderRadius : 36,
        justifyContent : 'center',
        alignItems : 'center',
        borderWidth : 2,
        borderColor : '#999'

    }
});

class RoundButton extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    render ( ) {
        return (
            <TouchableOpacity onPress = {this.props.onPress} >
                <View style = {myStyle.BtnWrap}>
                    <Text style = {myStyle.Button}>
                        {this.props.BtnText}
                    </Text>
                </View>
            </TouchableOpacity>
            
        );
    }
}

export default RoundButton;