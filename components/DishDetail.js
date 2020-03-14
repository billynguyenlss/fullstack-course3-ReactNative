import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList} from 'react-native';
import {Card, ListItem, Icon } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import {COMMENTS} from '../shared/comments';

function RenderDish(props){
    const dish = props.selectedDish[0];
    if (dish != null){
        return(
            <Card
                featuredTitle={dish.name}
                image={require('./images/uthappizza.png')}
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
    
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null,
            comments: COMMENTS,
            favorites: []
        };
    }
    
    markFavorite(dishId) {
        this.setState({
            favorites: this.state.favorites.concat(dishId)
        });
    }
   
    render(){
        //const dish = this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0];
        //const dishId = this.props.navigation.dishId;
        const dishId = this.props.route.params?.dishId ?? null;
        //const dishId = this.props.navigation.dangerouslyGetParent().getParam('dishId');
        return(
            <ScrollView>
                <RenderDish 
                    selectedDish={this.state.dishes.filter((dish) => dish.id === dishId)} 
                    favorite={this.state.favorites.some(el => el === dishId)}
                    onPress={() => this.markFavorite(dishId)}
                />
                <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );
    }
}

export default DishDetail;