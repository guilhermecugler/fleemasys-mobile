import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  RefreshControl
} from "react-native";
import api from "../services/api";
import { parseISO, format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

export default class Details extends Component {
  static navigationOptions = {
    title: "Detalhes Viagem"
  };

  state = {
    viagens: [],
    refreshing: false
  };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.loadViagem().then(() => {
      this.setState({ refreshing: false });
    });
  };
  async componentDidMount() {
    this.loadViagem();
  }

  loadViagem = async () => {
    const id = this.props.navigation.state.params.viagemId;

    const response = await api.get(`/viagem/${id}`);

    let viagem = response.data;

    if (viagem[0].dataInicio != null) {
      dataIniciarFormatada = format(
        parseISO(viagem[0].dataInicio),
        "yyyy-MM-dd HH:mm:ss"
      );

      viagem[0].dataInicio = dataIniciarFormatada;
    }

    if (viagem[0].dataEncerramento != null) {
      dataEncerrarFormatada = format(
        parseISO(viagem[0].dataEncerramento),
        "yyyy-MM-dd HH:mm:ss"
      );

      viagem[0].dataEncerramento = dataEncerrarFormatada;
    }

    this.setState({ viagens: viagem });
  };

  startHandler = () => {
    viagens = Object.assign(this.state.viagens);

    dataAtualInicio = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    viagens[0].dataInicio = dataAtualInicio;

    viagens[0].viagemSituacao = "Em andamento";

    this.setState({ viagens });

    const objInicio = this.state.viagens[0];
    api
      .put(
        "/viagem/iniciar/" + this.props.navigation.state.params.viagemId,
        objInicio
      )
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));

    this.forceUpdateHandler();
  };

  finishHandler = () => {
    viagens = Object.assign(this.state.viagens);

    dataAtualFim = format(new Date(), "yyyy-MM-dd HH:mm:ss");
    viagens[0].dataEncerramento = dataAtualFim;

    viagens[0].viagemSituacao = "Finalizada";

    this.setState({ viagens });

    const objFim = this.state.viagens[0];
    api
      .put(
        "/viagem/encerrar/" + this.props.navigation.state.params.viagemId,
        objFim
      )
      .then(res => console.log(res.data))
      .catch(res => console.log(res.data));
    this.forceUpdateHandler();
  };

  forceUpdateHandler = () => {
    this.componentDidMount();
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
              <Text>ID: {item.viagemId}</Text>
              <Text>Motorista: {item.motoristaNome}</Text>
              <Text>Placa: {item.veiculoPlaca}</Text>
              <Text>Endereço: {item.viagemEndereco}</Text>
              <Text>Observação: {item.viagemObs}</Text>
              <Text>
                Data de inicio:
                {item.dataInicio}
              </Text>
              <Text>
                Data de encerramento:
                {item.dataEncerramento}
              </Text>
              <Text>Situação: {item.viagemSituacao}</Text>
              <TextInput
                style={styles.input}
                placeholder="Observação"
                onChangeText={this.handleObsChange}
                autoCorrect={true}
              ></TextInput>
              <TouchableOpacity
                onPress={this.startHandler}
                style={styles.buttonIniciar}
              >
                <Text style={styles.buttonText}>Iniciar Viagem</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.finishHandler}
                style={styles.buttonEncerrar}
              >
                <Text style={styles.buttonText}>Encerrar Viagem</Text>
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
    padding: 10
  },
  buttonIniciar: {
    height: 42,
    backgroundColor: "#2E8B57",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  buttonEncerrar: {
    height: 42,
    backgroundColor: "#ff6961",
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10
  },
  input: {
    marginTop: 10,
    padding: 10,
    height: 80,
    backgroundColor: "#f3f3f3",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 3
  },
  buttonText: {
    color: "#fff",
    fontSize: 16
  }
});
