import React  from 'react';
import {View, Button, StyleSheet, Text, Image, ImageBackground} from 'react-native';
import {Input } from 'react-native-elements';
import {Actions} from 'react-native-router-flux';
import Spinner from 'react-native-loading-spinner-overlay';
import BackImg from '../../../assets/imgs/main/back2.jpg';
import {messages} from '../../Helper/Constants';

import {createTB, login, signUp} from '../../Helper/DBhelper';

const myStyle = StyleSheet.create({
    container: {
        flex : 1,
        flexDirection : 'column',
    },
    LoginForm: {
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'space-evenly',
        // backgroundColor : 'red',
        marginLeft: '8%',
        marginRight: '8%',
        marginTop : '2%',
        marginBottom : '2%',
    },
    FormItem:{
    },
    LoginBtn : {
    },
    RegisterBtn : {
        color : '#FFF',
        borderBottomWidth: 2,
        borderBottomColor: '#777',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    statusStr: {
        color : '#AAA',
        fontSize : 16,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    InputContainerStyle : {
        borderBottomColor : '#777',
        borderBottomWidth : 2
    }
});


class LoginForm extends React.Component {

    constructor (props) {
        super(props);
        this.props = props;
        this.state = {
            email : '',
            pass : '',
            emailErrMSG: '',
            passErrMSG: ''
        }
    }

    componentDidMount() {

    }

    onSubmit () {
        if (this.state.email == '')
        {
            this.setState({emailErrMSG : messages.formRequest});
            return;
        }
        if (this.state.pass == '')
        {
            this.setState({passErrMSG : messages.formRequest});
            return;
        }
        let credential = {
            email : this.state.email,
            pass : this.state.pass
        }
        this.props.onSubmit(credential);
    }

    render () {
        return (
            <View style = {myStyle.LoginForm}>
                
                <View style = {myStyle.FormItem}>
                    <Input  
                            inputStyle = {{ color: '#FFF'}}
                            inputContainerStyle = {myStyle.InputContainerStyle}
                            placeholderTextColor = {"#888"}
                            placeholder = "Email"
                            leftIcon = {{ type: 'font-awesome', color: '#FFF', name: 'envelope', marginRight : 15 }} 
                            errorMessage = {this.state.emailErrMSG}
                            errorStyle = {{color: 'red'}}
                            onChangeText = {(value) => 
                            {   this.setState({email: value})
                                this.setState({emailErrMSG : messages.empty})
                            }}
                            value = {this.state.email}
                            onSubmitEditing = {() => {this.passInput.focus()}}
                            blurOnSubmit = {false}
                    />
                </View>
                <View style = {myStyle.FormItem}>
                    <Input 
                            inputStyle = {{ color: '#FFF'}}
                            inputContainerStyle = {myStyle.InputContainerStyle}
                            placeholderTextColor = {"#888"}
                            placeholder = "Password" 
                            secureTextEntry = {true} 
                            leftIcon = {{type: 'font-awesome', color: '#FFF',name: 'lock', marginRight : 15}}
                            errorMessage =  {this.state.passErrMSG}
                            errorStyle = {{color: 'red'}}
                            value = {this.state.value}
                            onChangeText = {(value) => 
                            {   this.setState({pass : value})
                               this.setState({passErrMSG : messages.empty})
                            }}
                            ref = {(input) => {this.passInput = input}}
                    />
                </View>
                <View style = {myStyle.FormItem}>
                    <Button  title = "Submit" onPress = {() => this.onSubmit()}></Button>
                </View>
                <View style = {myStyle.FormItem}>
                    <Text style = {myStyle.RegisterBtn} selectable = {false} onPress = {() => {this.props.navigate('SignUp', {})}} >Don't have an account? Register</Text>
                </View>
            </View>
        );
    }
}

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            isFailed : false,
            statusString : ''
        }
    }

    componentDidMount(){
        createTB();
        this.setState({
            spinner: false
        });
    }

    onLoginSuccess = () =>{
        this.setState({
            spinner: false,
            statusString: "Login Success!"
        });

        setTimeout(() => {
            Actions.main(); //call Actions[key] to go to a new screen in React Native Router Flux
            this.setState({statusString : ""});
        }, 2000);
    }

    onLoginFailed = () =>{
        this.setState({
            spinner: false,
            statusString: "Login Failed!"
        });
        setTimeout(() => {
            this.setState({statusString : ""});
        }, 500);
    }

    doLogin = (credential) =>{
        console.log(credential);
        login(credential, this.onLoginSuccess, this.onLoginFailed);
        
    }

    render () {
        
        const {navigate} = this.props.navigation;
        return (
            <ImageBackground  style={myStyle.container} source = {BackImg} >
                <Spinner  visible = {this.state.spinner} textContent = "Please wait..." textStyle= {{color: '#FFF'}} />
                <Text  style = {myStyle.statusStr}>{this.state.statusString}</Text>
                <LoginForm onSubmit = {this.doLogin} navigate = {navigate} />
            </ImageBackground>
        );
    }
}

export default Login;

