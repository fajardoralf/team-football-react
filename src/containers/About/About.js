import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container text-center">
        <NavigationBar />
        <br />
        <h2>
          This is a site for viewing and storing statistics concerning football.
        </h2>
        <br />
        <h3>
          All users of the site have access to the main page, displaying matches
          and players. To see the result of the matches, please login or sign
          up.
          <br />
          Once you are logged in, you can access the dashboard for updating your
          information and managing your watchlist.
        </h3>
        <h3>Check out the teams page for a list of all teams.</h3>
        <br />
        <h5>
          Users with administrative privileges should find all relevant
          controllers in the dashboard. Here all entries to the database can be
          edited and deleted. The dashboard offers in addition the possibility
          to create new entries.
        </h5>
      </div>
    );
  }
}

export default About;
