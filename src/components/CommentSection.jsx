import { useState, useEffect } from "react";
import { fetchComments, addComment } from "../services/api";

const CommentSection = ({ videoId, token }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const loadComments = async () => {
      const data = await fetchComments(videoId);
      setComments(data);
    };
    loadComments();
  }, [videoId]);

  const handleCommentSubmit = async () => {
    if (!comment) return;
    const newComment = await addComment(comment, videoId, token);
    setComments([...comments, newComment]);
    setComment("");
  };

  return (
    <div>
      <textarea
        className="w-full p-2 border border-gray-300"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment"
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white"
        onClick={handleCommentSubmit}
      >
        Post Comment
      </button>
      <div className="mt-4">
        {comments.map((comment) => (
          <div key={comment._id} className="p-2 border-b">
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
