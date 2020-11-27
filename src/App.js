import React from "react";
import { Container  } from "@material-ui/core";
import { store } from "./actions/store";
import { Provider } from "react-redux";
import BillChart from './components/bill';

function App() {
  return (
    <Provider store={store}>
      <Container>
        <BillChart />
      </Container>
    </Provider>
  );
}

export default App;
