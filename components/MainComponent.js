import 'react-native-gesture-handler';
import React, { Component } from 'react';
import {View,
        Platform, 
        StyleSheet, 
        ScrollView,
        Image, ToastAndroid} from 'react-native';
import { Icon, Button} from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { StackNavigator, SwitchNavigator, SafeAreaView } from 'react-navigation';
import Menu from './MenuComponent';
import DishDetail from './DishDetail';
import Reservation from './ReservationComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';

import NetInfo, {useNetInfo} from '@react-native-community/netinfo';

import { connect } from 'react-redux';
import { fetchDishes, 
      fetchComments, 
      fetchPromos, 
      fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}

const mapDispatchToProps = dispatch => ({
  fetchDishes: () => dispatch(fetchDishes()),
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
})

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
        options={{
          title: 'Home',
          headerLeft: () => (
              <Icon size={30} name='home' type='font-awesome' color='white'/>
          )
        }}
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
        options={{
          title:'Menu',
          headerLeft: () => (
            <Icon size={30} name='list' type='font-awesome' color='white'/>
        ) 
        }}
      />
      <Stack.Screen name="DishDetail" component={DishDetail} options={{title:'Dish detail'}}/>
    </Stack.Navigator> 
  )
}

function renderAbout({navigation}){
  return(
    <Stack.Navigator
      screenOptions={{flex:1, 
      headerStyle:{backgroundColor: '#512DA8'}, 
      headerTintColor: '#fff',
      headerTitleStyle: {color: '#fff'}}}
    >
      <Stack.Screen 
        name="About" 
        component={About} 
        options={{
          title:'About',
          headerLeft: () => (
            <Icon size={30} name='info-circle' type='font-awesome' color='white'/>
        ) 
        }}
      />
    </Stack.Navigator> 
  )
}

function renderContact({navigation}){
  return(
    <Stack.Navigator
      screenOptions={{flex:1, 
      headerStyle:{backgroundColor: '#512DA8'}, 
      headerTintColor: '#fff',
      headerTitleStyle: {color: '#fff'}}}
    >
      <Stack.Screen 
        name="Contact" 
        component={Contact} 
        options={{
          title:'Contact',
          headerLeft: () => (
            <Icon size={30} name='address-card' type='font-awesome' color='white'/>
        ) 
        }}
      />
    </Stack.Navigator> 
  )
}

function renderReservation({navigation}){
  return(
    <Stack.Navigator
      screenOptions={{flex:1, 
      headerStyle:{backgroundColor: '#512DA8'}, 
      headerTintColor: '#fff',
      headerTitleStyle: {color: '#fff'}}}
    >
      <Stack.Screen 
        name="Reservation" 
        component={Reservation} 
        options={{title:'Reservation'}}
      />
    </Stack.Navigator> 
  )
}

function renderFavoritesMenu({navigation}){
  return(
    <Stack.Navigator
      screenOptions={{flex:1, 
      headerStyle:{backgroundColor: '#512DA8'}, 
      headerTintColor: '#fff',
      headerTitleStyle: {color: '#fff'}}}
    >
      <Stack.Screen 
        name="My Favorites" 
        component={Favorites} 
        options={{
          title:'Favorites Menu',
          headerLeft: () => (
            <Icon size={30} name='heart' type='font-awesome' color='white'/>
        ) 
        }}
      />
    </Stack.Navigator> 
  )
}

function renderLogin({navigation}){
  return(
    <Stack.Navigator
      screenOptions={{flex:1, 
      headerStyle:{backgroundColor: '#512DA8'}, 
      headerTintColor: '#fff',
      headerTitleStyle: {color: '#fff'}}}
    >
      <Stack.Screen 
        name="Log In" 
        component={Login} 
        options={{
          title:'Log In',
          headerLeft: () => (
            <Icon size={30} name='sign-in' type='font-awesome' color='white'/>
        ) 
        }}
      />
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
 

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    // NetInfo.getConnectionInfo()
    //   .then((connectionInfo) => {
    //     ToastAndroid.show('Initial Network Connectivity Type: '
    //       + connectionInfo.type + ', effectiveType: ' 
    //       + connectionInfo.effectiveType,
    //       ToastAndroid.LONG)
    //   });
    
    // NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  // componentWillUnmount() {
  //   NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange)
  // }

  handleConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type){
      case 'none':
        ToastAndroid.show('You are now offline!', ToastAndroid.LONG)
        break;
      case 'wifi':
        ToastAndroid.show('You are now connected to Wifi!', ToastAndroid.LONG)
        break;
      case 'cellular':
        ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG)
        break;
      case 'unknown':
        ToastAndroid.show('You now have an unknown connection!', ToastAndroid.LONG)
        break;
      default:
        break;
    }
  }

  render() {

    return (
        <NavigationContainer>
          <Drawer.Navigator 
            initialRouteName="Home" 
            screenOptions={{flex:1, 
              headerStyle:{backgroundColor: '#512DA8'}, 
              headerTintColor: '#fff',
              headerTitleStyle: {color: '#fff'},
              backgroundColor: ''}}
            drawerContent={props => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen 
              name="Log In" 
              component={renderLogin}
              options={{
                drawerLabel: 'Log In',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='sign-in' type='font-awesome' color={tintColor} />
              }}
            />
            <Drawer.Screen 
              name="Home" 
              component={renderHome}
              options={{
                drawerLabel: 'Home',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='home' type='font-awesome' color={tintColor} />
              }}
            />
            <Drawer.Screen name="About Us" component={renderAbout} 
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
            <Drawer.Screen name="Contact" component={renderContact} 
              options={{
                title: 'Contact',
                drawerLabel: 'Contact',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='address-card' type='font-awesome' color={tintColor} />
              }}
            />
            <Drawer.Screen name="Reservation" component={renderReservation} 
              options={{
                drawerLabel: 'Reservation',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='cutlery' type='font-awesome' color={tintColor} />
              }}
            />
            <Drawer.Screen name="My Favorites" component={renderFavoritesMenu} 
              options={{
                drawerLabel: 'My Favorites',
                drawerIcon: ({tintColor, focused}) => <Icon size={24} name='heart' type='font-awesome' color={tintColor} />
              }}
            />
          </Drawer.Navigator>
               
        </NavigationContainer>
        );
      }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Main);

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
    fontWeight: 'bold'
  },
  drawerImage: {
    margin: 10,
    width: 80,
    height: 60
  }
});