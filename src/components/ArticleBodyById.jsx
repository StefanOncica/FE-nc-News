import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, fetchCommentsById } from "../Api";

function ArticleBodyById() {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);

  const [articleById, setArticleById] = useState([]);

  const [commentsById, setCommentsById] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchArticleById(id).then((data) => {
      setArticleById(data);
      setIsLoading(false);
    });
  }, [id]);

  useEffect(() => {
    setIsLoading(true);
    fetchCommentsById(id).then((data) => {
      setCommentsById(data.comments);
      setIsLoading(false);
    });
  }, []);

  return !isLoading ? (
    <div>
      <h2> {articleById.title} </h2>
      <h3> by: {articleById.author}</h3>
      <img src={articleById.article_img_url} alt="" />
      <p className="article-body"> {articleById.body} </p>
      <h4>Comments: </h4>
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
