import React from 'react';
import {ScrollView, View, Text } from 'react-native';
import {Card} from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import {LEADERS} from '../shared/leaders';
import {PROMOTIONS} from '../shared/promotions';
import {DISHES} from '../shared/dishes';
import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';
import { StackActions } from '@react-navigation/native';
import { Loading } from './LoadingComponent';

const mapStateToProps = state => {
    return {
        leaders: state.leaders,
        promotions: state.promotions,
        dishes: state.dishes
    }
}

function RenderItem(props){
    const item = props.item;
    if (props.isLoading) {
        return(
            <Loading />
        );
    } 
    else if (props.errMess) {
        return(
            <View>
                <Text>
                    {props.errMess}
                </Text>
            </View>
        )
    }
    else {
        if (item != null){
            return(
                
                <Card featuredTitle={item.name}
                    featuredSubtitle={item.designation}
                    image={{uri: baseUrl + item.image}}>
                    <Text style={{margin:10}}>{item.description}</Text>
                </Card>
            );
        } else {
            return(
                <View></View>
            );
        }
    }    
}

class Home extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dishes: DISHES,
            promotions: PROMOTIONS,
            leaders: LEADERS
        }
    }

    render(){
        return(
            <ScrollView>
                <RenderItem 
                    item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}    
                />
                <RenderItem 
                    item={this.props.promotions.promotions.filter((promo) => promo.featured)[0]} 
                    isLoading={this.props.promotions.isLoading}
                    errMess={this.props.promotions.errMess}    
                />
                <RenderItem 
                    item={this.props.leaders.leaders.filter((leader) => leader.featured)[0]} 
                    isLoading={this.props.leaders.isLoading}
                    errMess={this.props.leaders.errMess}
                />
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps)(Home);