import React from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import { CreateThread } from "./createThread";
import { ForumFeed } from "./forumFeed";
import "./styles.scss";

export class Forum extends React.Component {
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <>
        <Route
          exact
          path={this.props.match.path}
          render={(props) => <ForumFeed {...props} user={this.props.user} />}
        />
        <Route
          exact
          path={`${this.props.match.path}/createThread`}
          render={(props) => <CreateThread {...props} user={this.props.user} />}
        />
      </>
    );
  }
}
