import React from "react";
import axios from "axios";

import "./styles.scss";

export class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      title: "",
      description: "",
      products: "",
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
      title: this.state.title,
      description: this.state.description,
      products: this.state.products,
      skin_condition: this.state.skin_condition,
    };

    //createPost
    axios
      .post(
        "http://decode-your-skin-backend.herokuapp.com/post/createPost",
        newPost
      )
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
              <label htmlFor="products">Products used</label>
              <input
                type="text"
                name="products"
                onChange={this.handleChange}
                required
              />
              <label htmlFor="skin_condition">My skin is feeling...</label>
              <input
                type="text"
                name="skin_condition"
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
