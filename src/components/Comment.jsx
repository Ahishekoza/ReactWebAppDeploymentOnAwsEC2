import { useState } from "react";

/* eslint-disable react/prop-types */
const Comment = ({ comment, onSubmitComment, onEditComment }) => {
  const [expand, setExpand] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [editCommentContent, setEditCommentContent] = useState(comment.content);

  /**
   * @param {boolean} argument
   * Expand the comment dialog box
   * @returns {void}
   */
  const toggleExpand = () => {
    setExpand(!expand);
  };

  /**
   * @param {boolean} argument1
   * @param {string} argument2
   * Expand the Edit comment dialog box
   */
  const toggleEdit = () => {
    setEditMode(!editMode);
    setEditCommentContent(comment?.content);
  };

  /**
   *
   * @param {*} e
   *  handle the change in reply content
   */
  const handleReply = (e) => {
    setReplyContent(e.target.value);
  };

  /**
   * Submit the reply content
   */
  const handleReplySubmit = () => {
    if (replyContent) {
      onSubmitComment(comment?.id, replyContent);
      setReplyContent("");
    }
  };

  /**
   *
   * @param {*} e
   * handles the change in the Edit comment
   */
  const handleEditCommentChange = (e) => {
    setEditCommentContent(e.target.value);
  };

  /**
   * submits the change in the comment
   */
  const handleEditSubmit = () => {
    onEditComment(comment?.id, editCommentContent);
    setEditMode(false);
  };

  return (
    <div className="comment">
      {!editMode ? (
        <>
          <p className="comment-content">{comment?.content}</p>
          <p className="comment-info">Votes: {comment?.votes}</p>
          <p className="comment-info">
            {new Date(comment?.timestamp).toLocaleString()}
          </p>
        </>
      ) : (
        <>
          {" "}
          <div className="add-comment">
            <textarea
              value={editCommentContent}
              onChange={handleEditCommentChange}
              rows={3}
              cols={50}
              className="comment-textarea"
            />
            <button onClick={handleEditSubmit} className="comment-button">
              Save Edit
            </button>
            <button onClick={toggleEdit} className="comment-button">
              Cancel Edit
            </button>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="comment-actions">
        <button onClick={toggleExpand} className="comment-button">
          {expand ? "HideReplies" : "Reply"}
        </button>
        <button onClick={toggleEdit} className="comment-button">
          Edit
        </button>
        <button className="comment-button">Delete</button>
      </div>

      {/* Reply Comment Dialog Box */}
      {expand && (
        <>
          <div className="add-comment">
            <textarea
              rows={3}
              cols={50}
              value={replyContent}
              onChange={handleReply}
              className="comment-textarea"
              placeholder="Add a new comment...."
            />
            <button onClick={handleReplySubmit} className="comment-button">
              Add a comment
            </button>
          </div>

          {comment?.replies?.map((comment) => (
            <Comment
              key={comment?.id}
              comment={comment}
              onSubmitComment={onSubmitComment}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Comment;
