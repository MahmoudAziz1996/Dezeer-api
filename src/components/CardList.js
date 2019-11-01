import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import { Card, Button } from "react-native-elements";

export default class CardList extends Component {

    render_albums = () => {
        const { data, bottomView,artist } = this.props;
        return data.map((u, i) => (

            <Card key={i}
                title={u.title}
                containerStyle={{ padding: 0,elevation:8}}
                wrapperStyle={{paddingHorizontal:0,paddingBottom:0}}
                image={{ uri: u.cover_big }}
                imageStyle={{ height: 200 }}
            >

                    {bottomView(u)}
            </Card>

        ))

    }

    render() {
        return (
            <ScrollView>
                {this.render_albums()}
            </ScrollView>
        )

    }
}
