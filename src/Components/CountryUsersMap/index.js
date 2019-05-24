import React from "react";
import reduce from "lodash/reduce";
import "./CountryUsersMap.css";

export default class CountryUsersMap extends React.Component {
  getTotalUsers = () => {
    const { usersPerCountries } = this.props;
    return reduce(
      usersPerCountries,
      (totalUsers, usersPerCountry) => totalUsers + usersPerCountry.users,
      0
    );
  };
  render() {
    return (
      <div>
        <h2 className="TotalUsers">{`Total Users: ${this.getTotalUsers()}`}</h2>
      </div>
    );
  }
}
