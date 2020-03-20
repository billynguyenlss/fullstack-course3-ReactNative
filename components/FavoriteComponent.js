import React from 'react';
import { View, FlatList } from 'react-native';
import { ListItem, Tile } from 'react-native-elements';

import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      favorites: state.favorites
    };
  }

class Favorites extends React.Component {

    render(){
        const renderMenuItem = ({item, index}) => {
            return(
                <ListItem 
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    chevron
                    onPress={() => this.navigation.navigate('Dish Detail',{dishId: item.id}) }
                />
            );
        }

        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return(
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return(
                <FlatList
                    data={this.props.dishes.dishes.filter(dish => this.props.favorites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            );
        }
    }

}

export default connect(mapStateToProps)(Favorites);