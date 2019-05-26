import React from "react";
import _ from "lodash";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import countriesAndGeoPoints from "../../utils/countriesAndGeoPoints.json";
import {
  COUNTRY_ERROR,
  USERS_ERROR,
  COUNTRY_PLACEHOLDER
} from "../../utils/constants";
import Loader from "../Loader";
import "./CountryUsersForm.css";

import { setUsersForCountry } from "../../store/actions";
import { connect } from "react-redux";

class CountryUsersForm extends React.Component {
  state = {
    options: _.sortBy(
      _.map(countriesAndGeoPoints, country => {
        const name = _.get(country, "properties.sr_subunit");
        return {
          label: name,
          value: name
        };
      }),
      "label"
    ),
    country: null,
    users: null,
    error: null
  };

  onChange = countryChosen => {
    this.setState({ countryChosen });
  };

  setUsersForCountry = () => {
    if (!this.state.country) {
      console.error(COUNTRY_ERROR);
      return this.setState({ error: COUNTRY_ERROR });
    }
    if (
      !this.state.users ||
      (this.state.users && !_.isInteger(this.state.users))
    ) {
      console.error(USERS_ERROR);
      return this.setState({ error: USERS_ERROR });
    }
    this.props.setUsersForCountry({
      country: this.state.country.value,
      users: this.state.users
    });
    this.setState({ country: null, users: null, error: null });
  };

  render() {
    if (this.props.setUsersForCountryLoading) {
      return <Loader />;
    }
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
              placeholder={COUNTRY_PLACEHOLDER}
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
              error={Boolean(this.state.error)}
              type="number"
              onChange={e =>
                this.setState({ users: _.toInteger(e.target.value) })
              }
            />
          </div>
          <div className="Button">
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

const mapStateToProps = ({
  setUsersForCountryLoading,
  setUsersForCountryError
}) => ({ setUsersForCountryLoading, setUsersForCountryError });

const mapDispatchToProps = dispatch => ({
  setUsersForCountry: usersForCountry =>
    dispatch(setUsersForCountry(usersForCountry))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryUsersForm);
