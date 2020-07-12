import React from "react";
import axios from "axios";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

export function Thread(props) {
  const title = props.title;
  const threadPosts = props.threadPosts;
  const id = props.id;

  function deletePost(id) {
    axios
      .post("http://localhost:5000/thread/deleteThread", { id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data));

    // Refreshes page after delete
    window.location.reload();
  }
  return (
    <>
      <h2>{title}</h2>
      {threadPosts.map((threadPost) => (
        <p>{threadPost.comment}</p>
      ))}
      <IconButton
        aria-label="delete"
        onClick={() => deletePost(id)}
        className="delete"
      >
        <DeleteOutlineIcon />
      </IconButton>
    </>
  );
}
