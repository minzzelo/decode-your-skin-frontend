import React from "react";
import axios from "axios";

import "./styles.scss";

export class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      date: "",
      title: "",
      description: "",
      skin_condition: "",
      error: "",
    };

    //binding
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPost = this.getPost.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const newPost = {
      user: this.state.user,
      date: new Date(),
      title: this.state.title,
      description: this.state.description,
    };

    //createPost
    axios
      .post("http://localhost:5000/post/createPost", newPost)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => this.setState({ error: err.response.data }));

    this.setState({
      title: "",
      description: "",
    });

    window.location.reload();
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
        <div className="create-post">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="Description">Description</label>
              <textarea
                rows="4"
                cols="50"
                name="description"
                onChange={this.handleChange}
                required
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}
