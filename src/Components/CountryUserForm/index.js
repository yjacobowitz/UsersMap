import React from "react";
import _ from "lodash";
import countryList from "react-select-country-list";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import postCountryUsersSum from "../../utils/postCountryUsersSum";
import "./CountryUsersForm.css";

export default class CountryUsersForm extends React.Component {
  state = {
    options: _.map(countryList().getLabels(), option => ({
      label: option,
      value: option
    })),
    country: null,
    users: null,
    error: null
  };

  onChange = countryChosen => {
    this.setState({ countryChosen });
  };

  setUsersForCountry = () => {
    if (!this.state.country || !this.state.users) {
      console.error("You must fill out all the fields");
      return this.setState({ error: "You must fill out all the fields" });
    }
    if (!_.isInteger(this.state.users)) {
      console.error("You must enter a number");
      return this.setState({ error: "You must enter a number" });
    }
    postCountryUsersSum({
      country: this.state.country.value,
      users: this.state.users
    });
  };

  render() {
    return (
      <div className="Container">
        <h2>{"Set Sum of Users Per Country"}</h2>
        <div className="Form">
          <div className="FormField">
            <span className="FormFieldTitle">{"Choose a country:"}</span>
            <Select
              options={this.state.options}
              value={this.state.country}
              onChange={country => this.setState({ country })}
              placeholder="Select a Country"
              styles={{
                container: base => ({ ...base, width: "50%" })
              }}
            />
          </div>
          <div className="FormField">
            <span className="FormFieldTitle">
              {"Enter the number of users:"}
            </span>
            <TextField
              type="number"
              onChange={e =>
                this.setState({ users: _.toInteger(e.target.value) })
              }
            />
          </div>
          <div>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={this.setUsersForCountry}
            >
              {"SET"}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
