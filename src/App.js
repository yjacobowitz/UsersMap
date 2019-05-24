import React from "react";
import map from "lodash/map";
import filter from "lodash/filter";
import isInteger from "lodash/isInteger";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import MapIcon from "@material-ui/icons/Map";
import UsersIcon from "@material-ui/icons/SupervisedUserCircle";
import getCountryUsersSum from "./utils/getCountryUsersSum";
import usersList from "./utils/usersList";
import CountryUsersForm from "./Components/CountryUserForm";
import CountryUsersMap from "./Components/CountryUsersMap";
import { VIEW_USERS_PAGE, SET_USER_PAGE } from "./utils/constants";
import "./App.css";

const PAGES = [VIEW_USERS_PAGE, SET_USER_PAGE];
export default class App extends React.Component {
  state = {
    usersPerCountries: [],
    displayMenu: false,
    pageSelected: VIEW_USERS_PAGE
  };

  componentDidMount() {
    // postCountryUsersSum({ country: "Canada", users: 2 });
    getCountryUsersSum(usersPerCountries =>
      this.setState({
        usersPerCountries: filter(usersPerCountries, usersPerCountry =>
          isInteger(usersPerCountry.users)
        )
      })
    );
    // this.setState({ users: usersList });
  }

  toggleMenu = () =>
    this.setState(state => ({
      displayMenu: !state.displayMenu
    }));

  render() {
    console.log(this.state.usersPerCountries);
    return (
      <div>
        <Button onClick={this.toggleMenu}>
          <MenuIcon />
        </Button>
        <SwipeableDrawer
          anchor="left"
          open={this.state.displayMenu}
          onClose={this.toggleMenu}
          onOpen={this.toggleMenu}
        >
          <Button onClick={this.toggleMenu}>
            <MenuIcon />
          </Button>
          <List>
            {map(PAGES, (page, index) => (
              <ListItem
                button
                key={index}
                onClick={() =>
                  this.setState({ pageSelected: page }, this.toggleMenu)
                }
              >
                <ListItemIcon>
                  {page === SET_USER_PAGE ? <UsersIcon /> : <MapIcon />}
                </ListItemIcon>
                <ListItemText primary={page} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
        {this.state.pageSelected === SET_USER_PAGE ? (
          <CountryUsersForm />
        ) : (
          <CountryUsersMap usersPerCountries={this.state.usersPerCountries} />
        )}
      </div>
    );
  }
}
