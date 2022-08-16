import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import store, { persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

function App(params) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;