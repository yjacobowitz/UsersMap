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
import Error from "../Error";
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
    error: null,
    displaySuccessPanel: false
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.setUsersForCountryLoading &&
      !this.props.setUsersForCountryLoading &&
      !this.props.setUsersForCountryError
    ) {
      this.setState({ displaySuccessPanel: true });
    }
  }

  onChange = countryChosen => {
    this.setState({ countryChosen });
  };

  setUsersForCountry = () => {
    if (!this.state.country) {
      return this.setState({ error: COUNTRY_ERROR });
    }
    if (
      !this.state.users ||
      (this.state.users && !_.isInteger(this.state.users))
    ) {
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
        <h2>{"Set Total Users Per Country"}</h2>
        {this.state.displaySuccessPanel ? (
          <div className="Form">
            <div className="SuccessPanelText">
              {"This operation has been a success!"}
            </div>
            <div style={{ fontFamily: "Verdana" }}>
              {"Would you like to update another country?"}
            </div>
            <div className="Button">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => this.setState({ displaySuccessPanel: false })}
              >
                {"YES"}
              </Button>
            </div>
          </div>
        ) : (
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
            {this.state.error === COUNTRY_ERROR && (
              <Error message={this.state.error} />
            )}
            <div style={{ marginBottom: 16 }} />
            <div className="FormField">
              <span className="FormFieldTitle">
                {"Enter the number of users:"}
              </span>
              <TextField
                error={this.state.error === USERS_ERROR}
                type="number"
                onChange={e =>
                  this.setState({ users: _.toInteger(e.target.value) })
                }
              />
            </div>
            {this.state.error === USERS_ERROR && (
              <Error message={this.state.error} />
            )}
            <div style={{ marginBottom: 16 }} />
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
        )}
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
