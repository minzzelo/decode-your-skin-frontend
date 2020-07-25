import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

import { Thread } from "./thread";

import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

export function ForumFeed(props) {
  const user = props.user;

  const [threads, setThreads] = useState(null);

  function getAllThreads() {
    axios
      .post(
        "http://decode-your-skin-backend.herokuapp.com/thread/getAllThreads",
        {}
      )
      .then((res) => {
        if (res.data.threads) {
          setThreads(
            res.data.threads.map((thread) => ({
              id: thread._id,
              user: thread.user,
              title: thread.title,
              comment: thread.comment,
              date: thread.date,
            }))
          );
        }
      })
      .catch((err) => console.log(err.response.data));
  }

  function deletePost(id) {
    axios
      .post(
        "http://decode-your-skin-backend.herokuapp.com/thread/deleteThread",
        { id }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.response.data));

    // Refreshes page after delete
    window.location.reload();
  }

  function redirect(id) {
    window.location.pathname = "/forum/" + id;
  }

  useEffect(() => {
    return getAllThreads();
  }, [user]);

  // TODO:
  // Style forum
  // Dynamic routing for threads
  // Add create thread post under a thread

  const Threads = () => {
    if (threads) {
      if (threads.length > 0) {
        return (
          <>
            <List className="list">
              {threads.map((thread) => (
                <ListItem
                  key={thread.id}
                  className="listItem"
                  onClick={() => console.log("clicked")}
                >
                  <div className="listHeader">
                    <Link to={props.location.pathname + "/" + `${thread.id}`}>
                      {thread.title}
                    </Link>

                    {/* delete button only appears if you are the one that created the post*/}
                    {thread.user == user && (
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon onClick={() => deletePost(thread.id)} />
                      </IconButton>
                    )}
                  </div>

                  <h5>{thread.comment}</h5>
                  <ListItemText secondary={thread.date} />
                </ListItem>
              ))}
            </List>
          </>
        );
      } else {
        return (
          <>
            <h3>No thread created</h3>
          </>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <div className="forum-feed">
      <div className="forum-header">
        <h1>Forum📡</h1>
      </div>
      <Link
        to={props.location.pathname + "/createThread"}
        style={{ width: "fit-content", alignSelf: "flex-end" }}
      >
        <button className="create-thread-btn" href="/createThread">
          Create thread 📩
        </button>
      </Link>

      <Threads />
    </div>
  );
}
