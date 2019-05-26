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

    return (
      <div>
        <h2 className="TotalUsers">{`Total Users: ${this.getTotalUsers()}`}</h2>
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
                      style={{
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
                      }}
                    />
                  ))
                }
              </Geographies>
              <Markers>
                {_.map(
                  countriesAndGeoPoints,
                  country =>
                    _.find(this.props.usersPerCountries, {
                      country: _.get(country, "properties.sr_subunit")
                    }) && (
                      <Marker
                        marker={{
                          coordinates: _.get(country, "geometry.coordinates")
                        }}
                        key={_.get(country, "properties.sr_subunit")}
                      >
                        <circle cx={0} cy={0} r={10} />
                      </Marker>
                    )
                )}
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
