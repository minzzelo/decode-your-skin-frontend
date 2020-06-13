import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./styles.scss";

export class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
    };

    this.getPost = this.getPost.bind(this);
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
        <Link to={this.props.location.pathname + "/createPost"}>
          <button className="btn">create post</button>
        </Link>
      </>
    );
  }
}
