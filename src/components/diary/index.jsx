import React from "react";
import axios from "axios";

import { Route } from "react-router-dom";

import { CreatePost } from "./createPost";
import { Feed } from "./feed";
import "./styles.scss";

export class Diary extends React.Component {
  constructor(props) {
    super(props);
    //binding
    this.getPost = this.getPost.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  getPost(event) {
    event.preventDefault();
    console.log("Getting posts");

    const user = { user: this.props.user };

    axios
      .post("http://localhost:5000/post/getPost", user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data));
  }

  render() {
    return (
      <>
        <Route
          exact
          path={this.props.match.path}
          render={(props) => <Feed {...props} user={this.props.user} />}
        />
        <Route
          exact
          path={`${this.props.match.path}/createPost`}
          render={(props) => <CreatePost {...props} user={this.props.user} />}
        />
      </>
    );
  }
}
