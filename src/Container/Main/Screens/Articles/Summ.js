import React from 'react';
import {View, Text, StyleSheet, ScrollView, ImageBackground, Dimensions } from 'react-native';
import CustomHeader from '../../Component/CustomHeader';
import {customStyle} from '../../../../Helper/Constants';
import ArticleData from '../../../../Helper/ArticleData';

const window = Dimensions.get('window');

const myStyle = StyleSheet.create({
    Container : {
        
       
    },
    MainBody : {
        backgroundColor : customStyle.bodyBGColor,
        marginBottom : 120,
        paddingLeft : 15,
        paddingRight : 15,
    },
});


class Summ extends React.Component {
    constructor(props)
    {
        super(props);
        this.props = props;

        const {navigate} = this.props.navigation;
        this.navigate = navigate;

    }

    onPressTitle = (index) => {
        this.navigate('Detail', {articleID : index});
    }

    render ( ) {
        //console.log(ArticleData);
        const imgW = window.width - 20;
        
        return (
            <View >
                <CustomHeader  title = "Articles" />
                <View style = {myStyle.MainBody}>
                    <ScrollView style = {{maxHeight : '100%'}} >
                        {
                            ArticleData.map((article, index) =>(
                                <View key = {index} style = {{borderBottomColor : '#888', paddingBottom : 10, marginBottom : 10, borderBottomWidth : 2}}>
                                    <Text onPress = {() => this.onPressTitle(index)} style = {{color : '#35F', fontSize : 22, paddingVertical : 10, textAlign :'center'}}>
                                        {article.title}
                                    </Text>
                                    <ImageBackground source = {article.img} style = {{width : imgW, height : 260}} />
                                    <Text style = {{color : '#AAA', paddingTop : 8, fontSize : 16}}>
                                        {article.data}
                                    </Text>
                                </View>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default Summ;