import "./App.css";
import AppRoute from "./Routes";
import { Provider } from "react-redux";
import store from "../src/Store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppRoute />
    </Provider>
  );
};

export default App;
