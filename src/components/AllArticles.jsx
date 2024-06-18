
import ArticleCard from "./ArticleCard";


function AllArticles({ user, allArticles }) {
  
  
  return (
    <section className="all-articles">
      <h3> Total articles {allArticles.length} </h3>
      <h4>Current user: {user}</h4>

      <ul className="articles-container">
        {allArticles.map((article) => {
          return (
            <li className="article-card" key={article.article_id}>
              <ArticleCard article={article} />;
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default AllArticles;
