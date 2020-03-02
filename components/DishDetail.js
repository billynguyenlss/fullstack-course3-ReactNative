import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card} from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { StackRouter } from '@react-navigation/native';

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
            </Card>

        );
    }
    else{
        return(
            <Text>No info</Text>
        )
    }
}

class DishDetail extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            selectedDish: null,
        };
    }
    
   
    render(){
        //const dish = this.state.dishes.filter((dish) => dish.id === this.state.selectedDish)[0];
        //const dishId = this.props.navigation.dishId;
        const dishId = this.props.route.params?.dishId ?? null;
        //const dishId = this.props.navigation.dangerouslyGetParent().getParam('dishId');
        return(
            <View>
                <RenderDish selectedDish={this.state.dishes.filter((dish) => dish.id === dishId)} />
            </View>
        );
    }
}

export default DishDetail;