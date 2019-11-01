import React from "react";
import { View, StyleSheet,Keyboard } from 'react-native'
import {
  Input,
  Button
} from "react-native-elements";

export default class SearchText extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: "Eminem"
    };
  }

  onChange(searchValue) {
    this.setState({ searchValue });
  }

  onSubmitSearch() {
    const { submit } = this.props;
    const { searchValue } = this.state;
    submit(searchValue);
    Keyboard.dismiss();
  }


  render() {
    return (
      <View style={{ padding: 10 }}>
        <Input
          autoFocus
          leftIconContainerStyle={{ marginLeft: 0 }}
          placeholder='Search an Artist / Band'
          value={this.state.searchValue}
          leftIcon={{ type: 'EvilIcons', name: 'search' }}
          onChangeText={event => {
            this.onChange(event);
          }}
        />
        <Button title="Search" onPress={() => { this.onSubmitSearch() }} containerStyle={{ marginHorizontal: 10, marginTop: 6 }} />
      </View>

    );
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
    flex: 1,
    marginRight: 20
  },
  headerRight: {
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "flex-end",
    flexDirection: "column"
  },
  mainText: {
    fontWeight: "bold",
    color: "#3a3a3a",
    fontSize: 17
  },
  subText: {
    color: "#3a3a3a",
    fontSize: 17
  }
});