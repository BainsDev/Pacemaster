import React from "react";
import { View, Button, StyleSheet, Text, ScrollView, ImageBackground } from "react-native";
import { Input } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import Spinner from "react-native-loading-spinner-overlay";
import BackImg from '../../../assets/imgs/main/back2.jpg';
import {messages} from '../../Helper/Constants';

import {createTB, login, signUp} from '../../Helper/DBhelper';

const myStyle = StyleSheet.create({
  Container: {
    flex: 1
  },
  Container_statusStr: {
    justifyContent: 'center',
    marginLeft: "auto",
    marginRight: "auto",
    fontSize: 16,
    color : '#AAA'
  },
  RegisterForm: {
    flex: 1,
    marginLeft: "8%",
    marginRight: "8%"
  },
  RegisterForm_FormItem: {
    marginTop: "2%",
    marginBottom: "2%"
  },
  RegisterForm_ButtonWrapper: {
    marginTop: "3%",
    marginBottom: "2%",
    //flex :1,
    flexDirection: "row"
  },
  RegisterForm_Button: {
    flex: 1,
    marginLeft: "1%",
    marginRight: "1%"
  },
  InputContainerStyle : {
    borderBottomColor : '#777',
    borderBottomWidth : 2
  }
});

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      name: "",
      email: "",
      pass: "",
      confirmpass: "",
      nameErrMSG: "",
      emailErrMSG: "",
      passErrMSG: "",
      confirmpassErrMSG: "",
    };
  }

  componentDidMount() {}

  doRegister() {
    if (this.state.name == "") {
      this.setState({ nameErrMSG: messages.formRequest });
      return;
    }
    if (this.state.email == "") {
      this.setState({ emailErrMSG: messages.formRequest });
      return;
    }
    if (this.state.pass == "") {
      this.setState({ passErrMSG: messages.formRequest });
      return;
    }
    if (this.state.confirmpass == "") {
      this.setState({ confirmpassErrMSG: messages.formRequest });
      return;
    }
    if (this.state.confirmpass != this.state.pass) {
      this.setState({ confirmpassErrMSG: messages.passMisMatch });
      return;
    }
   
    let RegisterInfo = {
      email: this.state.email,
      pass: this.state.pass,
      name: this.state.name
    };
    this.props.onSubmit(RegisterInfo);
  }

  doCancel() {
    this.setState({
      name: "",
      email: "",
      pass: "",
      confirmpass: "",
      nameErrMSG: "",
      emailErrMSG: "",
      passErrMSG: "",
      confirmpassErrMSG: "",
    });
    this.props.navigate("Login", {});
  }

  render() {
    return (
      <ScrollView style={myStyle.RegisterForm}>
        <View style={myStyle.RegisterForm_FormItem}>
          <Input
            inputStyle = {{ color: '#FFF'}}
            inputContainerStyle = {myStyle.InputContainerStyle}
            placeholderTextColor = {"#888"}
            placeholder="Name"
            leftIcon={{ type: "font-awesome", color: '#FFF', name: "user", marginRight: 15 }}
            errorMessage={this.state.nameErrMSG}
            errorStyle={{ color: "red" }}
            onChangeText={value => {
              this.setState({ name: value });
              this.setState({ nameErrMSG: messages.empty });
            }}
            value={this.state.name}
            onSubmitEditing={() => {
              this.emailInput.focus();
            }}
            blurOnSubmit={false}
          />
        </View>
        <View style={myStyle.RegisterForm_FormItem}>
          <Input
            inputStyle = {{ color: '#FFF'}}
            inputContainerStyle = {myStyle.InputContainerStyle}
            placeholderTextColor = {"#888"}
            placeholder="Email"
            leftIcon={{
              type: "font-awesome",
              color: '#FFF',
              name: "envelope",
              marginRight: 15
            }}
            errorMessage={this.state.emailErrMSG}
            errorStyle={{ color: "red" }}
            onChangeText={value => {
              this.setState({ email: value });
              this.setState({ emailErrMSG: messages.empty });
            }}
            value={this.state.email}
            onSubmitEditing={() => {
              this.passInput.focus();
            }}
            ref={input => {
              this.emailInput = input;
            }}
            blurOnSubmit={false}
          />
        </View>
        <View style={myStyle.RegisterForm_FormItem}>
          <Input
            inputStyle = {{ color: '#FFF'}}
            inputContainerStyle = {myStyle.InputContainerStyle}
            placeholderTextColor = {"#888"}
            placeholder="Password"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome",color: '#FFF', name: "lock", marginRight: 15 }}
            errorMessage={this.state.passErrMSG}
            errorStyle={{ color: "red" }}
            value={this.state.pass}
            onChangeText={value => {
              this.setState({ pass: value });
              this.setState({ passErrMSG: messages.empty });
            }}
            onSubmitEditing={() => {
              this.confirmpassInput.focus();
            }}
            ref={input => {
              this.passInput = input;
            }}
          />
        </View>
        <View style={myStyle.RegisterForm_FormItem}>
          <Input
            inputStyle = {{ color: '#FFF'}}
            inputContainerStyle = {myStyle.InputContainerStyle}
            placeholderTextColor = {"#888"}
            placeholder="Confirm Password"
            secureTextEntry={true}
            leftIcon={{ type: "font-awesome",color: '#FFF', name: "lock", marginRight: 15 }}
            errorMessage={this.state.confirmpassErrMSG}
            errorStyle={{ color: "red" }}
            value={this.state.confirmpass}
            onChangeText={value => {
              this.setState({ confirmpass: value });
              this.setState({ confirmpassErrMSG: messages.empty });
            }}
            ref={input => {
              this.confirmpassInput = input;
            }}
          />
        </View>
        
        <View style={myStyle.RegisterForm_ButtonWrapper}>
          <View style={myStyle.RegisterForm_Button}>
            <Button title="Register" onPress={() => this.doRegister()} />
          </View>
          <View style={myStyle.RegisterForm_Button}>
            <Button title="Cancel" onPress={() => this.doCancel()} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      spinner: false,
      isFailed: false,
      statusString: ""
    };
    const { navigate } = this.props.navigation;
    this.navigate = navigate;
  }

  componentDidMount() {}

  onSignUPSuccess = () =>{
      this.setState({
          spinner: false,
          statusString: "Account created successfully"
      });
      
      setTimeout(() => {
        this.setState({statusString : ""});
        this.navigate('Login', {});
      }, 500);
  }

  onSignUPFailed = () =>{
      this.setState({
          spinner: false,
          statusString: "Sign Up Failed!"
      });

      setTimeout(() => {
        this.setState({statusString : ""});
      }, 500);
  }

  doRegister = RegisterInfo => {
    this.setState({
      spinner: true
    });

    console.log(RegisterInfo);
    // api call
    
    signUp(RegisterInfo, this.onSignUPSuccess, this.onSignUPFailed);

  };

  render() {
    return (
     
      <ImageBackground style={myStyle.Container} source = {BackImg}>
        <Spinner
          visible={this.state.spinner}
          textContent="Please wait..."
          textStyle={{ color: "#FFF" }}
        />
        <Text style={myStyle.Container_statusStr}>
          {this.state.statusString}
        </Text>
        <RegisterForm onSubmit={this.doRegister} navigate={this.navigate} />
      </ImageBackground>
    );
  }
}

export default SignUp;
