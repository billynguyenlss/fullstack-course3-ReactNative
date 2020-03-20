import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {ScrollView, View, Text, FlatList, Switch, Button, Modal, StyleSheet, Alert, PanResponder } from 'react-native';
import {Card, ListItem, Icon, Rating, Input } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import {COMMENTS} from '../shared/comments';

import {connect} from 'react-redux';
import {baseUrl} from '../shared/baseUrl';

import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
});

function RenderDish(props){ 
    const dish = props.selectedDish; 

    const recognizeDrag = ({moveX, moveY, dx, dy}) => {
        if (dx < -200)
            return true;
        else
            return false;
    };

    const panResponder = PanResponder.create({
       onStartShouldSetPanResponder: (e, gestureState) => {
           return true;
       },
       onPanResponderEnd: (e, gestureState) => {
           if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorite?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                        }
                    ],
                    {cancelable: false }
                )

            return true;
       }
    });

    if (dish != null){
        return(
            <Animatable.View 
                animation="fadeInDown" duration={2000} delay={1000}
                {...panResponder.panHandlers}
            >
                <Card
                    featuredTitle={dish.name}
                    image={{uri: baseUrl + dish.image}}
                >
                    <Text>
                        {dish.description}
                    </Text>
                    <View style={{ flexDirection: 'row', alignSelf:'center'}}>
                        <Icon 
                            raised
                            reverse
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type="font-awesome"
                            color='#f50'
                            onPress = {() => props.favorite ? console.log('Already favorited') : props.onPressFavorite()}
                        />
                        <Icon 
                            raised
                            reverse
                            name='pencil'
                            type="font-awesome"
                            color='#512DA8'
                            onPress = {props.onPressAddComment}
                        />                 
                    </View>
                    
                </Card>
            </Animatable.View>
            

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
                <Rating 
                    startingValue={item.rating} 
                    imageSize={15}
                    style={{flexDirection:'row', alignSelf: 'flex-end'}}
                />
                <Text style={{fontSize: 12}}>{'-- ' + item.author + ', ' + item.date}</Text>
            </View>
        )
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title='Comments'>
                <FlatList 
                    data={comments}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </Animatable.View>

    );
}

class DishDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            showModal: false,
            rating: '',
            author: '',
            comment: ''
        }
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal})
    }

    handleComments() {
        console.log(JSON.stringify(this.state));
        this.toggleModal();
    }

    resetForm() {
        this.setState({
            rating: '',
            author:'',
            comment:''
        })
    }
      
    markFavorite(dishId) {
        this.props.postFavorite(dishId);
    }

    addRating(rating) {
        this.setState({rating: rating})
    }

    handleCommentInput(comment) {
        this.setState({comment: comment})
    }

    handleAuthorInput(author) {
        this.setState({author: author})
    }

    handleComment(dishId) {
        //const id = this.props.comments.comments.length();
        //const dishId = this.props.route.params?.dishId ?? null;
        const rating = this.state.rating;
        const author = this.state.author;
        const comment = this.state.comment;
        //const date = new Date().toISOString();

        this.toggleModal();
        this.props.postComment(dishId, rating, author, comment);
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
                    //onPress={() => {this.markFavorite(dishId); this.toggleModal()}}
                    //onPress = {(dishId) => {this.onPress(dishId)}}
                    onPressFavorite={() => this.markFavorite(dishId)}
                    onPressAddComment={this.toggleModal}
                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            
                <Modal 
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => {this.toggleModal(); this.resetForm()}}
                    onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                >
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Add your comment</Text>
                        <Rating 
                            showRating
                            minValue={1}
                            startingValue={3}
                            fractions={0}
                            onFinishRating={rating => this.addRating(rating)}
                        />
                        <Input 
                            placeholder='Author'
                            leftIcon={(
                                <Icon 
                                    name='user-o'
                                    size={24}
                                    type="font-awesome"
                                />
                            )}
                            onChangeText={author => this.handleAuthorInput(author)}
                        />
                        <Input 
                            placeholder='Comment'
                            leftIcon={(
                                <Icon 
                                    name='comment-o'
                                    size={24}
                                    type="font-awesome"
                                />
                            )}
                            onChangeText={comment => this.handleCommentInput(comment)}
                        />
                        <Button
                            onPress={() => { this.handleComment(dishId); this.resetForm()}}
                            color='#512DA8'
                            title='Submit'
                        />
                    </View>
                </Modal>

            </ScrollView>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#522DA8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})