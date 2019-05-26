import React from "react";
import map from "lodash/map";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import MapIcon from "@material-ui/icons/Map";
import UsersIcon from "@material-ui/icons/SupervisedUserCircle";
import CountryUsersForm from "../CountryUserForm";
import CountryUsersMap from "../CountryUsersMap";
import { VIEW_USERS_PAGE, SET_USER_PAGE } from "../../utils/constants";
import "./PageWrapper.css";

import { changePage } from "../../store/actions";
import { connect } from "react-redux";

const PAGES = [VIEW_USERS_PAGE, SET_USER_PAGE];

class PageWrapper extends React.Component {
  state = {
    displayMenu: false
  };

  toggleMenu = () =>
    this.setState(state => ({
      displayMenu: !state.displayMenu
    }));

  render() {
    return (
      <React.Fragment>
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
                onClick={() => {
                  this.props.changePage(page);
                  this.toggleMenu();
                }}
              >
                <ListItemIcon>
                  {page === SET_USER_PAGE ? <UsersIcon /> : <MapIcon />}
                </ListItemIcon>
                <ListItemText primary={page} />
              </ListItem>
            ))}
          </List>
        </SwipeableDrawer>
        {this.props.pageToDisplay === SET_USER_PAGE ? (
          <CountryUsersForm />
        ) : (
          <CountryUsersMap />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  pageToDisplay: state.pageToDisplay
});

const mapDispatchToProps = dispatch => ({
  changePage: page => dispatch(changePage(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageWrapper);
