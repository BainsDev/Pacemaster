import React, {Component} from 'react';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import Summ from './Articles/Summ';
import Detail from './Articles/Detail';
import {customStyle} from '../../../Helper/Constants';

const ArticleNavigator = createStackNavigator(
  {
    Summ : Summ,
    Detail : Detail
  },
  {
    headerMode : 'none',
    navigationOptions: {
        headerVisible: false,
    },
     
    initialRouteName: "Summ",
  }
);

const ArticleContainer = createAppContainer(ArticleNavigator);

class Articles extends Component{
  render() {
    return (
      <ArticleContainer />
    );
  }
}

export default Articles;
