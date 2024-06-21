import { Link } from "react-router-dom";


function ArticleCard({ article }) {
    
  return (
    <section>
      <img
        src={article.article_img_url}
        alt={`picture about ${article.topic}`}
      />
      <Link to={`/articles/${article.article_id}`}>
      <h4>Tittle: {article.title}</h4>
      </Link>
      <h4>Author: {article.author}</h4>
      <p>Topic: {article.topic}</p>
      <p>Total votes: {article.votes}</p>
      <p>
        Created: {article.created_at.split("T")[0]}{" "}
        {article.created_at.split("T")[1].split(".")[0]}
      </p>
      <p>Total comments: {article.comment_count}</p>
  </section>
  )
}

export default ArticleCard;
