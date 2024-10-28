/* eslint-disable no-unused-vars */

import { useState } from "react";
import UseCommentHook from "../hooks/UseCommentHook";
import Comment from "./comment";

/* eslint-disable react/prop-types */
const NestedComments = ({
  comments,
  onSubmit, // comment is submitted or replyed
  onEdit, // when content of comment is edited
  onDelete, // when  comment is deleted
}) => {
  const [comment, setComment] = useState("");
  const {
    comments: commentsData,
    insertComment,
    editComment,
  } = UseCommentHook(comments);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    if (comment) {
      insertComment(undefined, comment);
      setComment("");
    }
  };

  const handleSubmitReply = (commentId, content) => {
    console.log(commentId, content);
    insertComment(commentId, content);
  };

  const handleEditComment = (commentId, content) => {
    console.log(commentId, content);
    // funtion from the custom hook
    editComment(commentId, content);
  };

  return (
    <>
      <div className="add-comment">
        <textarea
          rows={3}
          cols={50}
          value={comment}
          onChange={handleCommentChange}
          className="comment-textarea"
          placeholder="Add a new comment...."
        />
        <button onClick={handleSubmit} className="comment-button">
          Add a comment
        </button>
      </div>

      {commentsData.map((comment) => (
        <Comment
          key={comment?.id}
          comment={comment}
          onSubmitComment={handleSubmitReply}
          onEditComment={handleEditComment}
        />
      ))}
    </>
  );
};

export default NestedComments;
