import React from "react";
import axios from "axios";

export class CreateThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      title: "",
      comment: "",
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

    const newThread = {
      user: this.state.user,
      title: this.state.title,
      comment: this.state.comment,
    };

    //createPost
    axios
      .post(
        "https://decode-your-skin-backend.herokuapp.com/thread/createThread",
        newThread
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => this.setState({ error: err.response.data }));

    this.setState({
      title: "",
      comment: "",
    });

    //redirect to forum page after posting a thread
    window.location.pathname = "/forum";
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
              <label htmlFor="comment">Comment</label>
              <input
                type="text"
                name="comment"
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
