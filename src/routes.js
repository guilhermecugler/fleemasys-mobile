import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Details from "./pages/Details";

const AppNavigator = createStackNavigator(
  {
    Main: {
      screen: Main
    },
    Login: {
      screen: Login
    },
    Details: {
      screen: Details
    }
  },
  {
    initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#624da7"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

export default Routes = createAppContainer(AppNavigator);
