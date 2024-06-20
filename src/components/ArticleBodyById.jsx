import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchArticleById,
  fetchCommentsById,
  postComment,
  updateVotes,
} from "../Api";

function ArticleBodyById({ user }) {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [articleById, setArticleById] = useState([]);

  const [commentsById, setCommentsById] = useState([]);

  const [votes, setVotes] = useState();

  const [commentInput, setCommentInput] = useState("");

  const [newCommentExists, setNewCommentExists] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(id).then((data) => {
      setArticleById(data);
      setVotes(data.votes);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    fetchCommentsById(id).then((data) => {
      setCommentsById(data.comments);
    });
  }, [newCommentExists]);

  function handleLike(event) {
    event.preventDefault();
    const incVote = Number(event.target.value);
    setVotes((currentVotes) => currentVotes + incVote);
    updateVotes(id, incVote);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (commentInput) {
      postComment(id, commentInput, user).then((response) => {
        if (response.status === 201) {
          setNewCommentExists((curr) => {
            return curr + 1;
          });
        }
      });
      setCommentInput("");
    }
  }

  function handleChange(event) {
    setCommentInput(event.target.value);
  }

  return !isLoading ? (
    <div>
      <h2> {articleById.title} </h2>
      <h3> by: {articleById.author}</h3>
      <img src={articleById.article_img_url} alt="" />
      <p className="article-body"> {articleById.body} </p>
      <label>{votes} people have liked this article.</label>

      <div className="like-dislike-buttons">
        <button onClick={handleLike} value={1}>
          Like
        </button>
        <button onClick={handleLike} value={-1}>
          Dislike{" "}
        </button>
      </div>
      <h4>Comments: </h4>
      <form onSubmit={handleSubmit} className="comment-form">
        <p>
          {user
            ? "Type your comment bellow."
            : "You must sign in before you can post a comment."}
        </p>
        <textarea
          onChange={handleChange}
          value={commentInput}
          type="text"
          required
        ></textarea>
        <div>
          <button> Add comment</button>
        </div>
      </form>

      <ul className="comments">
        {commentsById.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h5>{comment.author}:</h5>
              <p>{comment.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <h3> Fetching Data ... </h3>
  );
}

export default ArticleBodyById;
