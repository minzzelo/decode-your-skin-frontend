import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { Thread } from "./thread";

export function ForumFeed(props) {
  const user = props.user;

  const [threads, setThreads] = useState(null);

  function getAllThreads() {
    axios
      .post("http://localhost:5000/thread/getAllThreads", {})
      .then((res) => {
        if (res.data.threads) {
          setThreads(
            res.data.threads.map((thread) => ({
              id: thread._id,
              title: thread.title,
              threadPosts: thread.threadPosts.map((threadPost) => ({
                user: threadPost.user,
                comment: threadPost.comment,
              })),
            }))
          );
        }
      })
      .catch((err) => console.log(err.response.data));
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
            {threads.map((thread) => (
              <div className="thread-title">{thread.title}</div>
              //   <Thread {...thread} />
            ))}
          </>
        );
      } else {
        return (
          <>
            <h1>No thread created</h1>
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
        <h1>Forum</h1>
      </div>
      <Link
        to={props.location.pathname + "/createThread"}
        style={{ width: "fit-content", alignSelf: "flex-end" }}
      >
        <button className="create-thread-btn" href="/createThread">
          Create thread
        </button>
      </Link>

      <Threads />
    </div>
  );
}
