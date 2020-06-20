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
              <label htmlFor="description">Description</label>
              <textarea
                rows="4"
                cols="50"
                name="description"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="skin-condition">My skin is feeling...</label>
              <div className="emoji-selector">
                <span role="img" aria-label="good" className="emoji-button">
                  😁
                </span>
                <span
                  role="img"
                  aria-label="satisfied"
                  className="emoji-button"
                >
                  😌
                </span>
                <span role="img" aria-label="meh" className="emoji-button">
                  😕
                </span>
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}
