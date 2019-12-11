import React, { Component } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { createStackNavigation } from "react-navigation-stack";

import api from "../services/api";

export default class Login extends Component {
  state = { usuarioLogin: "", usuarioSenha: "", error: "" };

  handleUserChange = usuarioLogin => {
    this.setState({ usuarioLogin });
  };

  handlePasswordChange = usuarioSenha => {
    this.setState({ usuarioSenha });
  };

  handleEntrar = async () => {
    if (
      this.state.usuarioLogin.length === 0 ||
      this.state.usuarioSenha.length === 0
    ) {
      this.setState(
        { error: "Preencha usuário e senha para continuar!" },
        () => false
      );
      alert(this.state.error);
    } else {
      try {
        const response = await api.post("/authenticate", {
          usuarioLogin: this.state.usuarioLogin,
          usuarioSenha: this.state.usuarioSenha
        });

        this.props.navigation.navigate("Main");
      } catch (_err) {
        this.setState({
          error: "Usuário ou senha inválidos!"
        });
        alert(this.state.error);
      }
    }
  };

  static navigationOptions = {
    header: null
  };

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#624da7"
      },
      input: {
        marginTop: 10,
        padding: 10,
        width: 300,
        backgroundColor: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        borderRadius: 3
      },
      button: {
        width: 80,
        height: 42,
        backgroundColor: "#333",
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
      },
      textLogo: {
        color: "#fff",
        fontSize: 25
      },
      buttonText: {
        color: "#fff",
        fontSize: 16
      }
    });
    return (
      <View style={styles.container}>
        <Text style={styles.textLogo}>Fleemasys</Text>
        <TextInput
          style={styles.input}
          placeholder="Login"
          value={this.state.user}
          onChangeText={this.handleUserChange}
          autoCapitalize="none"
          autoCorrect={false}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={this.handleEntrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
