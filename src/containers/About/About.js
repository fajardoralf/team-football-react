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
        <h2>This is a page for storing statistics concerning football.</h2>
        <br />
        <h3>
          Access the Dashboard for updating your information and managing your
          watchlist.
        </h3>
        <h3>Check out the Teams page for a list of all teams.</h3>
        <br />
        <h5>
          Users with administrative privileges should find all relevant
          controllers in the Dashboard.
        </h5>
      </div>
    );
  }
}

export default About;
