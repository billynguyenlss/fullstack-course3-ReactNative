import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {View,
        Platform, 
        StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StackNavigator, SwitchNavigator } from 'react-navigation';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function renderHome({navigation}){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
    
  );
}

function renderMenu({navigation}){
  return(
    <Stack.Navigator
      screenOptions={{flex:1, 
      headerStyle:{backgroundColor: '#512DA8'}, 
      headerTintColor: '#fff',
      headerTitleStyle: {color: '#fff'}}}
    >
      <Stack.Screen name="Menu" component={Menu} options={{title:'Menu'}}/>
      <Stack.Screen name="DishDetail" component={DishDetail} options={{title:'Dish detail'}}/>
    </Stack.Navigator> 
  )
}

class Main extends Component {

  

  render() {
    return (
        // <View style={{flex:1, 
        //  paddingTop: Platform.OS === 'ios' ? 0 : expo.Constants.statusBarHeight}}>
        //   <MenuNavigator />
        // </View>

        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Homepage">
            <Drawer.Screen name="Homepage" component={renderHome}/>
            <Drawer.Screen name="About Us" component={About} />
            <Drawer.Screen name="Menu" component={renderMenu}/>   
            <Drawer.Screen name="Contact" component={Contact} />
          </Drawer.Navigator>
               
        </NavigationContainer>
        );
      }
}
  
export default Main;