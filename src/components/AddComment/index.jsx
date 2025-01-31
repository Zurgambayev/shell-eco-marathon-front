import React, { useState } from "react";
import styles from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios"; // убедитесь, что путь правильный

const AddCommentForm = ({ postId, onAddComment }) => {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/posts/${postId}/comments`, { text });
      onAddComment(res.data);
      setText('');
    } catch (err) {
      console.warn(err);
      alert('Error adding a comment');
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
        />
        <div className={styles.form}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Write a comment"
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">Send</Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCommentForm;
