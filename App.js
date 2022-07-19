import { Provider } from "react-redux";
import RootNavigation from "./navigation";

//store
import store from "./store";


const App = () => {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  );
};

export default App;
