import React from "react";
import PageWrapper from "./Components/PageWrapper";
import { Provider } from "react-redux";
import store from "./store";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PageWrapper />
      </Provider>
    );
  }
}
