import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  deleteComment,
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

  const [postingComment, setPostingComment] = useState(false)

  const [isCommentDeleted, setIsCommentDeleted] = useState(1);

  const [isDeletingComment, setIsDeletingComment] = useState(false)

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
  }, [newCommentExists, isCommentDeleted]);

  function handleLike(event) {
    event.preventDefault();
    const incVote = Number(event.target.value);
    setVotes((currentVotes) => currentVotes + incVote);
    updateVotes(id, incVote);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (commentInput && user) {
      setPostingComment(true)
      postComment(id, commentInput, user).then((response) => {
        setPostingComment(false)
        if (response.status === 201) {
          setNewCommentExists((curr) => {
            return curr + 1;
          });
        }
      });
      setCommentInput("")
    }
  }

  function handleChange(event) {
    setCommentInput(event.target.value);
  }

  function handleClickDelete(event) {
    const commentId = event.target.value;
    setIsDeletingComment(true)
    deleteComment(commentId).then(() => {
      setIsDeletingComment(false)
      setIsCommentDeleted((curr) => {
        return curr + 1;
      });
    });
  }

  const totalCommentsByUser = commentsById.filter(
    (comment) => comment.author === user
  );

  return !isLoading ? (
    <div className="article-comments">
      <section className="article-by-id">

      
      <h2> {articleById.title} </h2>
      <h3> by: {articleById.author}</h3>
      <img src={articleById.article_img_url} alt="" />
      <p className="article-body"> {articleById.body} </p>
      <label>{votes} people have liked this article.</label>

      <div className="like-dislike-buttons">
        <button onClick={handleLike} value={1}>
          UpVote
        </button>
        <button onClick={handleLike} value={-1}>
          DownVote{" "}
        </button>
      </div>

      </section>
      <h4>Comments: </h4>
      <form onSubmit={handleSubmit} className="comment-form">
        <p>
          {user
            ? "Type your comment bellow."
            : " <!> You must sign in before you can post a comment. <!>"}
        </p>
        <textarea
          onChange={handleChange}
          value={commentInput}
          type="text"
          required
        ></textarea>
        <div>
          {postingComment?(<p>Adding comment...</p>):''}
          
          <button> Add a new comment</button>
          {user ? (<p className="comment-count">
              {!isDeletingComment ? `You have ${totalCommentsByUser.length} comments on this article.` : 'Deleting in progress...'}
            </p>) : ("")}
        </div>
      </form>

      <ul className="comments">
        {commentsById.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h4>{comment.author}:</h4>
              <p>Created: {comment.created_at.split("T")[0]}{" "}
              {comment.created_at.split("T")[1].split(".")[0]} </p>
              <p>{comment.body}</p>
              {comment.author === user ? (
                <button onClick={handleClickDelete} value={comment.comment_id}>
                  Delete comment
                </button>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <h3> Fetching Article for you ... </h3>
  );
}

export default ArticleBodyById;
