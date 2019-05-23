import React from "react";
import logo from "./logo.svg";
import getCountryUsersSum from "./utils/getCountryUsersSum";
import usersList from "./utils/usersList";
import CountryUsersForm from "./Components/CountryUserForm";
import "./App.css";

export default class App extends React.Component {
  state = { users: [] };

  componentDidMount() {
    // postCountryUsersSum({ country: "Canada", users: 2 });
    getCountryUsersSum(users => this.setState({ users }));
    // this.setState({ users: usersList });
  }

  render() {
    console.log(this.state.users);
    return (
      <div>
        <CountryUsersForm />
      </div>
    );
  }
}
