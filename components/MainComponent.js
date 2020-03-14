import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {View,
        Platform, 
        StyleSheet, 
        ScrollView,
        Image,} from 'react-native';
import { Icon, Button} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StackNavigator, SwitchNavigator, SafeAreaView } from 'react-navigation';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function renderHome({props, navigation}){
  return(
    <Stack.Navigator 
      screenOptions={{flex:1, 
      headerStyle:{backgroundColor: '#512DA8'}, 
      headerTintColor: '#fff',
      headerTitleStyle: {color: '#fff'}}}
      
    >
      <Stack.Screen 
        name="Home" 
        component={Home}
      />
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
      <Stack.Screen 
        name="Menu" 
        component={Menu} 
        options={{title:'Menu'}}
      />
      <Stack.Screen name="DishDetail" component={DishDetail} options={{title:'Dish detail'}}/>
    </Stack.Navigator> 
  )
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem 
        label="Ristorante Con Fusion" 
        labelStyle= {styles.drawerHeaderText}
        icon = {() => <Image source={require('./images/logo.png')} style={styles.drawerImage} />}  
        style = {styles.DrawerHeader}
        activeBackgroundColor='#512DA8'
        inactiveBackgroundColor='#512DA8'
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

class Main extends Component {

  

  render() {

    return (
        // <View style={{flex:1, 
        //  paddingTop: Platform.OS === 'ios' ? 0 : expo.Constants.statusBarHeight}}>
        //   <MenuNavigator />
        // </View>



        <NavigationContainer>
          <Drawer.Navigator 
            initialRouteName="Home" 
            screenOptions={{flex:1, 
              headerStyle:{backgroundColor: '#512DA8'}, 
              headerTintColor: '#fff',
              headerTitleStyle: {color: '#fff'}}}
            drawerContent={props => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen 
              name="Home" 
              component={Home}
              options={{
                title: 'Home',
                drawerLabel: 'Home',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='home' type='font-awesome' color={tintColor} />
              }}
            />
            <Drawer.Screen name="About Us" component={About} 
              options={{
                title: 'About Us',
                drawerLabel: 'About us',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='info-circle' type='font-awesome' color={tintColor} />
              }}
            />
            <Drawer.Screen name="Menu" component={renderMenu}
              options={{
                drawerLabel: 'Menu',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='list' type='font-awesome' color={tintColor} />
              }}
            />   
            <Drawer.Screen name="Contact" component={Contact} 
              options={{
                title: 'Contact',
                drawerLabel: 'Contact',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='address-card' type='font-awesome' color={tintColor} />
              }}
            />
          </Drawer.Navigator>
               
        </NavigationContainer>
        );
      }
}
  
export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#512DA8',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  drawerHeaderText: {
    flex:1,
    flexDirection:'row',
    alignSelf:'flex-end',
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    enable
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});