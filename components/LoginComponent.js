import React, {Component} from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {baseUrl} from '../shared/baseUrl';
import { Asset } from 'expo-asset';
import * as ImageManipulator from 'expo-image-manipulator';
import { TouchableOpacity } from 'react-native-gesture-handler';


class LoginTab extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password });
                    this.setState({remember: true });
                }
            })
    }

    static navigationOptions = {
        title: 'Login'
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            )
            .catch((error) => console.log('Could not save user info',error))
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could not delete user info',error))
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                    onChangeText={(username) => this.setState({username: username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key'}}
                    onChangeText={(password) => this.setState({password: password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={this.state.remember}
                    onPress = {() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox} 
                />
                <View style={styles.formButon}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title='Log In'
                        icon={
                            <Icon 
                                name='sign-in' 
                                type='font-awesome' 
                                color='white'
                                size={24}
                            />
                            }
                        buttonStyle={{backgroundColor:'#512DA8'}}
                    />
                </View>
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.props.navigation.navigate('Register')}
                        title='Register'
                        clear
                        icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome' 
                                color='blue'
                                size={24}
                            />
                            }
                        titleStyle={{color: 'blue'}}
                    />
                </View>
            </View>
        )
        
    }

}

class RegisterTab extends Component {
    constructor(props){
        super(props);
        this.state = {
            username:'',
            password:'',
            firstname: '',
            lastname:'',
            remember:false,
            email:'',
            imageUrl: baseUrl + 'images/logo.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if(!capturedImage.cancelled){
                //this.setState({ imageUrl: capturedImage.uri })
                this.processImage( capturedImage.uri );
            }
        }
    }

    processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: {width: 400}}
            ],
            { format: 'png'}
        );
        this.setState({ imageUri: processedImage.uri })
    }

    getImageFromGallery = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
        if (cameraPermission.status === 'granted' && cameraRollPermission.status ==='granted'){
            let capturedImage = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4,3]
            })

            if (!capturedImage.cancelled){
                this.processImage( capturedImage.uri );
            }
        }
    }

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember){
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                })
            )
            .catch((error) => console.log('Could not save user info',error))
        }

        this.props.navigation.navigate('Home')
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: this.state.imageUrl }}
                            loadingIndicatorSource={require('./images/logo.png')}
                            style={styles.image}
                        />
                        <Button
                            title='Camera'
                            onPress={this.getImageFromCamera}
                        />
                        <Button
                            title='Gallery'
                            onPress={this.getImageFromGallery}
                        />
                    </View>
                    <Input
                        placeholder="Username"
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(username) => this.setState({username: username})}
                        value={this.state.username}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Password"
                        leftIcon={{ type: 'font-awesome', name: 'key'}}
                        onChangeText={(password) => this.setState({password: password})}
                        value={this.state.password}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Firstname"
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(firstname) => this.setState({firstname: firstname})}
                        value={this.state.firstname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Lastname"
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(lastname) => this.setState({lastname: lastname})}
                        value={this.state.lastname}
                        containerStyle={styles.formInput}
                    />
                    <Input
                        placeholder="Email"
                        leftIcon={{ type: 'font-awesome', name: 'envelope-o'}}
                        onChangeText={(email) => this.setState({email: email})}
                        value={this.state.email}
                        containerStyle={styles.formInput}
                    />
                    <CheckBox
                        title='Remember Me'
                        center
                        checked={this.state.remember}
                        onPress = {() => this.setState({remember: !this.state.remember})}
                        containerStyle={styles.formCheckbox} 
                    />
                    <View style={styles.formButon}>
                        <Button
                            onPress={() => this.handleRegister()}
                            title='Register'
                            icon={
                                <Icon 
                                    name='user-plus' 
                                    type='font-awesome' 
                                    color='white'
                                    size={24}
                                />
                                }
                            buttonStyle={{backgroundColor:'#512DA8'}}
                        />
                    </View>
                </View>
            </ScrollView>
        );
        
    }
}

const Tab = createBottomTabNavigator()

function Login() {
    return (
      <Tab.Navigator
        tabBarOptions = {{
            activeBackgroundColor: '#9575CD',
            inactiveBackgroundColor:'#D1C4E9',
            activeTintColor:'white',
            inactiveTintColor:'gray'
        }}
      >
        <Tab.Screen 
            name="Log In" 
            component={LoginTab} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'            
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                ), 
            }}
        />
        <Tab.Screen 
            name="Register" 
            component={RegisterTab} 
            options={{
                tabBarLabel: 'Register',
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        name='user-plus'
                        type='font-awesome'            
                        size={24}
                        iconStyle={{ color: tintColor }}
                    />
                ), 
            }}
        />
      </Tab.Navigator>
    );
  }

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer:{
        flex:1,
        flexDirection: 'row',
        margin:20
    },
    image: {
        margin: 10,
        width:80,
        height: 60
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;