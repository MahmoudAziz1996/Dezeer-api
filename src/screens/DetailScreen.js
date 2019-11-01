import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Linking
} from "react-native";
import { Icon, Avatar, Divider, ListItem, Text } from "react-native-elements";
import * as actions from "../actions/";
import Sound from 'react-native-sound';

export default class DetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      isFetching: true,
      tracks: [],
      album: ''
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('album', '').title,
    };
  };

  PlaySound=(url)=>{
    
    var whoosh = new Sound(`${url}`, null, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    })
    
  }

  componentDidMount() {
    const album = this.props.navigation.getParam("album", []);
    actions.getAlbumTracks(album.id).then(tracks => {
      this.setState({
        tracks,
        album,
        isFetching: false
      });
    });
  }

  renderTracks = () => {
    const { tracks, album } = this.state;
    if (tracks && tracks.length > 0) {
      return tracks.map((track, index) => {
        return (
          <ListItem
            containerStyle={{ padding: 0, paddingVertical: 4 }}
            key={index}
            title={track.title}
            leftIcon={
              <Icon
                raised
                name="play"
                type="font-awesome"
                size={16}
                onPress={() => Linking.openURL(track.preview)}
              />}
            bottomDivider
            rightIcon={
              <Icon
                raised
                name="star"
                type="font-awesome"
                color="#f50"
                size={16}
              // onPress={() => this.saveTrackToFavorites(album, track)}
              />
            }
          />
        );
      });
    }
  }

  render() {
    const { isFetching, tracks } = this.state;
    const { navigation } = this.props;
    const album = navigation.getParam("album", []);
    const artist = navigation.getParam("artist", '');
    if (album.id) {
      return (
        <ScrollView>
          {!isFetching && (
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.avatar}>
                  <Avatar size="xlarge" rounded source={{ uri: album.cover_medium }} />
                </View>
                <View style={styles.headerRight}>
                  <Text h4 style={styles.mainText} numberOfLines={1} ellipsizeMode="tail" >
                    {album.title}
                  </Text>
                  <Text h4 style={styles.subText}>
                    {artist}
                  </Text>
                  <Icon
                    raised
                    name="play"
                    type="font-awesome"
                    onPress={() => { }}
                  />
                </View>
              </View>
              <Divider style={{ backgroundColor: "#DDD", height: 10 }} />
              <ScrollView >
                {this.renderTracks()}
              </ScrollView>
            </View>
          )}
          {isFetching && <ActivityIndicator size="large" />}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 20
  },
  avatar: {
    marginRight: 20
  },
  headerRight: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  mainText: {
    fontWeight: "bold",
    color: "#3a3a3a",
    flexWrap: "wrap",
    fontSize: 17,
    paddingRight: 6
  },
  subText: {
    color: "#3a3a3a",
    fontSize: 17
  }
});