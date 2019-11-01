import React from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from '../screens/HomeScreen'
import Link from '../screens/Link'
import Setting from '../screens/Setting'
import  Icon  from 'react-native-vector-icons/Entypo'
import DetailScreen from '../screens/DetailScreen'
import Main from '../screens/Main'
import Favorite from '../screens/Favorite'
const HomeStack=createStackNavigator({
    Home:
    {
        screen:Main,
        navigationOptions:{
            header:null
        }
    },
    Albums:{
        screen:Home,
        navigationOptions:{
            header:null
        }
        
    },
    Detail:{
        screen:DetailScreen,
    },Favorite:{
        screen:Favorite,
        navigationOptions:{
            title:"Favorite Albums"
        }
    }
})
const BottomNav = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon name='info-with-circle' color={tintColor}  size={24}/>
            )
        })
    },
    Link: {
        screen: Link,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon name='link' color={tintColor}  size={24} />
            )
        })
    },
    Setting: {
        screen: Setting,
        navigationOptions: () => ({
            tabBarIcon: ({ tintColor }) => (
                <Icon name='menu' color={tintColor} size={24} />
            )
        })
    }
}, {
    tabBarOptions: {
        activeTintColor: '#030D6A',
        inactiveTintColor: 'gray',
        showLabel: true
    }
});


export default createAppContainer(BottomNav)