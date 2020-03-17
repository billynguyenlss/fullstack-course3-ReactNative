import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {Card, ListItem, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import {COMMENTS} from '../shared/comments';

import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

function RenderDish(props){ //props
    console.log(props);
    //const dish = selectedDish; 
    const dish = props.selectedDish; //[0]
    if (dish != null){
        return(
            <Card
                featuredTitle={dish.name}
                image={{uri: baseUrl + dish.image}}
            >
            <Text>
                {dish.description}
            </Text>
            <Icon 
                raised
                reverse
                name={ props.favorite ? 'heart' : 'heart-o'}
                type="font-awesome"
                color='#f50'
                onPress = {() => props.favorite ? console.log('Already favorited') : props.onPress()}
            />
            </Card>

        );
    }
    else{
        return(
            <Text>No info</Text>
        )
    }
}

function RenderComments(props){
    const comments = props.comments;

    const renderCommentItem = ({item,index}) =>{
        return(
            <View key={index} style={{margin:10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating}</Text>
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return(
        <Card title='Comments'>
            <FlatList 
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
            />
        </Card>
    );
}

class DishDetail extends Component {


      
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }
   
    render(){
        //const dish = this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0];
        //const dishId = this.props.navigation.dishId;
        const dishId = this.props.route.params?.dishId ?? null;
        //const dishId = this.props.navigation.dangerouslyGetParent().getParam('dishId');
        return(
            <ScrollView>
                <RenderDish 
                    selectedDish={this.props.dishes.dishes.filter((dish) => dish.id === dishId)[0]} 
                    //selectedDish={this.props.dishes.dishes[+dishId]}
                    favorite={this.props.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);