// src/components/Comments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Comments({ showNo }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/comments`, { params: { showNo } });
        setComments(response.data);
      } catch (error) {
        console.error("There was an error fetching the comments!", error);
        setError('댓글을 가져오는 중 오류가 발생했습니다.');
      }
    };
    fetchComments();
  }, [showNo]);

  const addComment = async () => {
    try {
      await axios.post(`http://localhost:9999/comments`, { showNo, commentContent: newComment });
      setComments([...comments, { showNo, commentContent: newComment, commentDate: new Date() }]);
      setNewComment('');
    } catch (error) {
      console.error("댓글 추가 중 오류 발생", error);
      setError('댓글 추가 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.commentContent}</p>
            <small>{new Date(comment.commentDate).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} />
      <button onClick={addComment}>댓글 추가</button>
    </div>
  );
}
