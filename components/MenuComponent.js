import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Tile } from 'react-native-elements';

import { DISHES } from '../shared/dishes';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }

class Menu extends React.Component {

   
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES
        };
        this.navigation = props.navigation;
        
    }

    render(){

        // const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {

            return (
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() =>  this.navigation.navigate('DishDetail',{ dishId: item.id})  }
                        imageSrc={{ uri: baseUrl + item.image }}
                        //leftAvatar={{ source: require('./'+item.image)}}
                      />
                </Animatable.View>

            );
        };

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess){
            return(
                <View>
                    <Text>
                        {this.props.dishes.errMess}
                    </Text>
                </View>
            );
        }
        else {
            return (
                <FlatList 
                    data={this.props.dishes.dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                    />
            );
        }

        
    }
}

export default connect(mapStateToProps)(Menu);