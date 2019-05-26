import React from "react";
import _ from "lodash";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Markers,
  Marker
} from "react-simple-maps";
import UsersIcon from "@material-ui/icons/SupervisedUserCircle";
import "./CountryUsersMap.css";
import states from "../../utils/states.json";
import countriesAndGeoPoints from "../../utils/countriesAndGeoPoints.json";
import Loader from "../Loader";

import { getUsersForCountry } from "../../store/actions";
import { connect } from "react-redux";

class CountryUsersMap extends React.Component {
  componentDidMount() {
    this.props.getUsersForCountry();
    this.getUsersForCountryPoller = setInterval(
      this.props.getUsersForCountry,
      5 * 60 * 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.getUsersForCountryPoller);
  }

  getTotalUsers = () => {
    const { usersPerCountries } = this.props;
    return _.reduce(
      usersPerCountries,
      (totalUsers, usersPerCountry) => totalUsers + usersPerCountry.users,
      0
    );
  };

  onCountryClick = geography => {
    const countryChosen = _.get(geography, "properties.NAME");
    // TODO:
  };
  render() {
    if (this.props.getUsersForCountryLoading) {
      return <Loader />;
    }
    const geographyStyle = {
      default: {
        fill: "#9ABCF4",
        stroke: "#FFF",
        strokeWidth: 0.5,
        outline: "none"
      },
      hover: {
        fill: "#B7D1F7",
        stroke: "#FFF",
        strokeWidth: 0.5,
        outline: "none"
      },
      pressed: {
        fill: "#BDD0ED",
        stroke: "#FFF",
        strokeWidth: 0.5,
        outline: "none"
      }
    };

    return (
      <div>
        <h2 className="TotalUsers">
          <UsersIcon style={{ height: 80, width: 80 }} />
          <span>{`Total Users: ${this.getTotalUsers()}`}</span>
        </h2>
        <div className="MapWrapper">
          <ComposableMap>
            <ZoomableGroup>
              <Geographies geography={states}>
                {(geographies, projection) =>
                  _.map(geographies, (geography, i) => (
                    <Geography
                      key={`geography-${i}`}
                      cacheId={`geography-${i}`}
                      geography={geography}
                      projection={projection}
                      onClick={this.onCountryClick}
                      style={geographyStyle}
                    />
                  ))
                }
              </Geographies>
              <Markers>
                {_.map(countriesAndGeoPoints, country => {
                  const usersPerCountry = _.find(this.props.usersPerCountries, {
                    country: _.get(country, "properties.sr_subunit")
                  });
                  const users = usersPerCountry && usersPerCountry.users;
                  return (
                    usersPerCountry && (
                      <Marker
                        marker={{
                          coordinates: _.get(country, "geometry.coordinates")
                        }}
                        key={_.get(country, "properties.sr_subunit")}
                      >
                        <g transform="translate(-12, -24)">
                          <path
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeLinejoin="miter"
                            d="M20,9c0,4.9-8,13-8,13S4,13.9,4,9c0-5.1,4.1-8,8-8S20,3.9,20,9z"
                          />
                          <circle
                            fill="none"
                            strokeWidth="2"
                            strokeLinecap="square"
                            strokeMiterlimit="10"
                            strokeLinejoin="miter"
                            cx="12"
                            cy="9"
                            r="3"
                          />
                        </g>
                        <text
                          textAnchor="middle"
                          style={{
                            fontFamily: "Roboto, sans-serif",
                            fill: "black",
                            stroke: "none"
                          }}
                        >
                          {users}
                        </text>
                      </Marker>
                    )
                  );
                })}
              </Markers>
            </ZoomableGroup>
          </ComposableMap>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({
  usersPerCountries,
  getUsersForCountryLoading,
  getUsersForCountryError
}) => ({
  usersPerCountries,
  getUsersForCountryLoading,
  getUsersForCountryError
});

const mapDispatchToProps = dispatch => ({
  getUsersForCountry: () => dispatch(getUsersForCountry())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountryUsersMap);
