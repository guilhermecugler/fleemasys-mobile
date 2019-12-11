import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  RefreshControl
} from "react-native";
import api from "../services/api";

export default class Main extends Component {
  //Título do Header
  static navigationOptions = {
    title: "Viagens"
  };

  state = {
    viagens: [],
    refreshing: false
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.loadViagens().then(() => {
      this.setState({ refreshing: false });
    });
  };

  componentDidMount() {
    this.loadViagens();
  }

  forceUpdateHandler = () => {
    this.componentDidMount();
  };

  loadViagens = async () => {
    const response = await api.get("/viagem");

    this.setState({ viagens: response.data });
  };

  passarId = item => {
    this.props.navigation.navigate("Details", item);
  };

  render() {
    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
        style={styles.container}
      >
        <FlatList
          data={this.state.viagens}
          keyExtractor={viagem => viagem.viagemId}
          renderItem={({ item }) => (
            <View style={styles.viagem}>
              <TouchableOpacity onPress={() => this.passarId(item)}>
                <Text>ID: {item.viagemId}</Text>
                <Text>Motorista: {item.motoristaNome}</Text>
                <Text>Endereço: {item.viagemEndereco}</Text>
                <Text>Situação: {item.viagemSituacao}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  viagem: {
    marginTop: 20,
    backgroundColor: "#9f8be4",
    padding: 10
  }
});
