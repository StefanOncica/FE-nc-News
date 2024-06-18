import ArticleCard from "./ArticleCard";

function AllArticles({ allArticles }) {
  return (
    <section className="all-articles">
      <h3> Total articles {allArticles.length} </h3>
      <ul className="articles-container">
        {allArticles.map((article) => {
          return (
            <li className="article-card" key={article.article_id}>
              <ArticleCard article={article} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default AllArticles;
