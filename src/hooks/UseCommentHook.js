import { useState } from "react";

const UseCommentHook = (initialComments) => {
  const [comments, setComments] = useState(initialComments);

  // -- content here is the new comment or new reply to the comment
  const insertNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  // -- content here is replaced by the already existing content of the comment with timestamp
  const editNode = (tree, commentId, content) => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          content:content,
          timestamp: new Date().toISOString()
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const insertComment = (commentId, content) => {
    const newComment = {
      id: Date.now(),
      content,
      votes: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setComments((prevComments) =>
        insertNode(prevComments, commentId, newComment)
      );
    } else {
      setComments((prevComments) => [newComment, ...prevComments]);
    }
  };

  const editComment = (commentId, content) => {
    setComments(prevComments=> editNode(prevComments, commentId, content))
  }

  return {
    comments,
    insertComment,
    editComment
  };
};

export default UseCommentHook;
