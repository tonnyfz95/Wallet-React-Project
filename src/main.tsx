import './index.css';
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store"; // Importamos el store y el persistor
import { Provider } from "react-redux";
import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
