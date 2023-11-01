import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import InitialStackNavigation from "./navigation/InitialStackNavigation";
import { Provider } from "react-redux";
import store from "./context/store";

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <InitialStackNavigation />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
