import axios from "axios";
import _ from "lodash";
import AsyncStorage from '@react-native-community/async-storage';
const axiosInstance = axios.create({
  baseURL: "https://deezerdevs-deezer.p.mashape.com/",
  timeout: 2000,
  headers: {
    "X-Mashape-Key": "2558340aa8mshf366d268b0a3671p18a9ebjsn348b687c6c0e"
  }
});

export const searchTracks = singerName => {
  return axiosInstance.get(`search/?q=${singerName}`).then(response => {
    const albums = response.data.data.map(item => item.album);
    // Unique albums by title.
    return _.uniqBy(albums, "title");
  });
};

export const getAlbumTracks = albumId => {
  return axiosInstance.get(`album/${albumId}`).then(response => {
    return response.data.tracks.data;
  });
};

export const storeData = async (key, value) => {
  const stringifyValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, stringifyValue);
    return true;
  } catch (error) {
    // Error saving data
  }
};

export const retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else {
      return {};
    }
  } catch (error) {
    // Error retrieving data
    return false;
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

