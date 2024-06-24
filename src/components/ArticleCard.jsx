import { Link } from "react-router-dom";

function ArticleCard({ article, maxVotes }) {
  // console.log(maxVotes);
  return (
    <section>
      <a>
        {article.created_at.split("T")[0]}{" "}
        {article.created_at.split("T")[1].split(".")[0]}
      </a>
      <Link to={`/articles/${article.article_id}`}>
        <h3>Tittle: {article.title}</h3>
      </Link>
      <a>Total Votes {article.votes}</a>
      <img
        src={article.article_img_url}
        alt={`picture about ${article.topic}`}
        />
      <a >Total Comments: {article.comment_count}</a>

      <h4>Author: {article.author}</h4>
      <p>Topic: {article.topic}</p>
    </section>
  );
}

export default ArticleCard;
