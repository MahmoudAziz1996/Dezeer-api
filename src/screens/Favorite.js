import React from "react";
import { ScrollView, StyleSheet, View, Linking } from "react-native";
import {
    Card,
    Button,
    List,
    Text,
    ListItem,
    Icon
} from "react-native-elements";
import _ from "lodash";
import * as actions from "../actions";
export default class Favorite extends React.Component {
    constructor() {
        super();
        this.state = {
            tracks: []
        };
        this.getFavoritesAlbums();
    }

    async getFavoritesAlbums() {
        const favoritesAlbums = await actions.retrieveData("favoritesAlbums");
        if (favoritesAlbums) {
            this.setState({
                tracks: favoritesAlbums
            });
        }
    }

    async deleteAlbum(albumId) {
        const { tracks } = this.state;
        delete tracks[albumId];
        const success = await actions.storeData("favoritesAlbums", tracks);
        if (success) {
            this.setState({
                tracks
            });
        }
    }

    renderFavoritesTracks = (album) => {
        actions.getAlbumTracks(album.id).then(tracks => {
            this.setState({
                tracks,
            });
        });
        const { tracks } = this.state;
        return (
            tracks.map((item, id) => (
                <View key={id}>
                    <ListItem
                        bottomDivider
                        title={item.title}
                        rightIcon={
                            <Icon
                                raised
                                name="music"
                                type="font-awesome"
                                color="#f50"
                                onPress={() => Linking.openURL(item.preview)}
                            />
                        }
                    />
                </View>
            ))
        )  
    }

    renderFavoriteAlbums() {
        const { favoritesAlbums } = this.state;

        if (favoritesAlbums) {
            return _.map(favoritesAlbums, (album, id) => {
                return (
                    <View key={id}>
                        <Card
                            title={album.title}
                            image={{ uri: album.cover_big }}
                            imageStyle={{ height: 200 }}

                        >
                            <Button
                                title="Delete Album"
                                raised
                                backgroundColor="#f50"
                                name="trash"
                                onPress={() => {
                                    this.deleteAlbum(album.id);
                                }}
                            />
                            {this.renderFavoritesTracks(album)}
                        </Card>
                    </View>
                );
            });
        }
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                {this.renderFavoriteAlbums()}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: "#fff"
    },
    listContainer: {
        backgroundColor: "#eaeaea"
    },
    albumMenu: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
});