import React, { Component } from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import { ListItem, Card, Text, Icon } from "react-native-elements";
import { Header } from 'react-navigation-stack'

const height = (Dimensions.get('window').height - 80);

const menuList = [
    {
        title: "Search Albums",
        subTitle: "Search your favorite music",
        icon: "music",
        navigateTo: "Albums"
    },
    {
        title: "Favorite Collections",
        subTitle: "Access to your favorites albums",
        icon: "heart",
        navigateTo: "Favorite"
    },
    {
        title: "Setting",
        subTitle: "Customize your app",
        icon: "cog",
        navigateTo: "#"
    }
];

export default class Main extends Component {
    static navigationOptions = {
        title: "Home"
    };

    render() {
        return (
            <View style={styles.container}>
                {menuList.map((item, index) => {
                    return (
                        <TouchableOpacity style={{  }} onPress={() => this.props.navigation.navigate(item.navigateTo)}  key={index} activeOpacity={.9}>
                            <Card
                            containerStyle={{elevation:5,height:height/3.2}}
                                title={item.title}>
                                <View style={styles.cardView}>
                                    <Text style={{ marginBottom: 10 }}> {item.subTitle} </Text>
                                    <Icon
                                        raised
                                        name={item.icon}
                                        type="font-awesome"
                                        color="#f50"
                                        size={30}
                                    />
                                </View>
                            </Card>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        justifyContent:'space-around',
        height:height
    },
    cardView: {
        alignItems: "center"
    }
});