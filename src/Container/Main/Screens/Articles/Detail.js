import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import CustomHeader from '../../Component/CustomHeader';
import {customStyle} from '../../../../Helper/Constants';
import ArticleData from '../../../../Helper/ArticleData';
import {Header} from 'react-native-elements';
import IonicsIcons from 'react-native-vector-icons/Ionicons';
const window = Dimensions.get('window');

const myStyle = StyleSheet.create({
    Container : {
        
       
    },
    MainBody : {
        backgroundColor : customStyle.bodyBGColor,
        paddingBottom : 120,
        paddingLeft : 15,
        paddingRight : 15,
    },
});

class BackBtn extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    onClick = () => {
        this.props.onBack();
    }

    render () {
        return(
            <View>
                <IonicsIcons name= 'md-arrow-round-back' size = {35} color = '#FFF' onPress = {() =>this.onClick()} />
            </View>
        );
    }
}


class Detail extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;
    }

    onBack = () => {
        this.props.navigation.goBack();
    }

    render ( ) {
        //console.log(ArticleData);
        const imgW = window.width - 20;
        const index = this.props.navigation.state.params.articleID;
        
        return (
            <View >
                <Header
                    backgroundColor = {customStyle.headerBGColor}
                    containerStyle = {{height : 60, paddingTop : 10}}
                    rightContainerStyle = {{paddingRight : 20}}
                    centerComponent={{ text: "Articles", style: { color: '#fff', fontSize : 20 } }}
                    leftComponent = {<BackBtn onBack = {this.onBack}/>}
                />
                <View style = {myStyle.MainBody}>
                    <ScrollView style = {{maxHeight : '100%'}} >
                        <View style = {{borderBottomColor : '#888', paddingBottom : 10, marginBottom : 10, borderBottomWidth : 2}}>
                            <Text style = {{color : '#35F', fontSize : 22, paddingVertical : 10, textAlign :'center'}}>
                                {ArticleData[index].title}
                            </Text>
                            <ImageBackground source = {ArticleData[index].img} style = {{width : imgW, height : 260}} />
                            <Text style = {{color : '#AAA', paddingTop : 8, fontSize : 16}}>
                                {ArticleData[index].detail}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default Detail;