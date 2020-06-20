import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import "./styles.scss";

export function Feed(props) {
  const user = props.user;

  const [posts, setPosts] = useState(null);

  function getPosts() {
    axios
      .post("http://localhost:5000/post/getPost", { user: user })
      .then((res) => {
        if (res.data.post) {
          console.log(res.data.post);
          setPosts(
            res.data.post.map((post) => ({
              id: post._id,
              title: post.title,
              description: post.description,
            }))
          );
        }
      })
      .catch((err) => console.log(err.response.data));
  }

  function deletePost(id) {
    axios
      .post("http://localhost:5000/post/deletePost", { id })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data));

    // Refreshes page after delete
    window.location.reload();
  }

  useEffect(() => {
    return getPosts();
  }, [user]);

  const PostLog = () => {
    if (posts) {
      if (posts.length > 0) {
        return (
          <div className="feed">
            <Link
              to={props.location.pathname + "/createPost"}
              style={{ width: "fit-content", alignSelf: "flex-end" }}
            >
              <button className="create-post-btn">create post</button>
            </Link>
            {posts.map((post) => {
              return (
                <>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <IconButton
                    aria-label="delete"
                    onClick={() => deletePost(post.id)}
                    className="delete"
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </>
              );
            })}
          </div>
        );
      } else {
        return <div className="feed">You have yet to create any post!</div>;
      }
    } else {
      return null;
    }
  };

  return <PostLog />;
}
