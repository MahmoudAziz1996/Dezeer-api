
import React from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Button,
    View,
    Text,
    ActivityIndicator
} from "react-native";
import { Icon } from "react-native-elements";
import * as actions from '../actions'
import AlbumList from '../components/CardList'
import SearchText from '../components/SearchText'
export default class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            albums: [],
            artist: "",
            isFetching: false
        };

    }
    onsearchTracks = (artist) => {
        this.setState({ isFetching: true, albums: [], artist })
        actions
            .searchTracks(artist)
            .then(albums => this.setState({ albums, isFetching: false }))
            .catch(err => this.setState({ albums: [], isFetching: false }));
    }

    renderBottom = (album) => {
        const { artist } = this.state
        return (
            <View style={styles.albumMenu}>
                <Icon
                    onPress={() => { }}
                    raised
                    name="play"
                    type="font-awesome"
                    color="#067E35"
                    size={20}
                />
                <Icon
                    onPress={() => {
                        this.props.navigation.navigate('Detail', { album, artist })
                    }}
                    raised
                    name="info"
                    type="font-awesome"
                    color="#030D6A"
                    size={20}
                />
                <Icon
                    onPress={() => {
                        this.saveAlbumToFavorite(album)
                    }}
                    raised
                    name="heart"
                    type="font-awesome"
                    color="#f00"
                    size={20}
                />
            </View>
        )
    }

    
  async saveAlbumToFavorite(album) {
    console.log("Try to save album");

    const favoritesAlbums =
      (await actions.retrieveData("favoritesAlbums")) || {};

    if (favoritesAlbums[album.id]) {
      console.log("repeated!");
      return false;
    }

    favoritesAlbums[album.id] = album;

    const success = await actions.storeData("favoritesAlbums", favoritesAlbums);
    if (success) {
      console.log("Album saved!");
   alert(
        "Album Added",
        `Album ${album.title} was added to Favorites!`,
        [{ text: "Continue", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  }


    render() {
        const { albums, isFetching, artist } = this.state
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <SearchText submit={this.onsearchTracks} />
                {
                    albums.length > 0 && !isFetching &&
                    <AlbumList data={albums} artist={artist} bottomView={this.renderBottom} />
                }
                {
                    albums.length === 0 && isFetching &&
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <ActivityIndicator size='large' color="#030D6A" animating />
                    </View>
                }

            </View>

        )
    }
}

const styles = StyleSheet.create({
    albumMenu: {
        flexDirection: "row",
        justifyContent: "space-between"
    }
})