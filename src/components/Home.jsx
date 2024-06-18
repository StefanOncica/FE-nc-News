import ArticleCard from "./ArticleCard";

function Home({ allArticles }) {

  const allArticleID = [];

  allArticles.forEach((article) => {
    allArticleID.push(Number(article.article_id));
  });

  const latestArticleID = Math.max(...allArticleID);
  const latesArticle = allArticles.filter(
    (article) => article.article_id === latestArticleID
  );

  if(!latesArticle[0]) {
    return (
      <p> Loading... </p>
    )
  }
  return (
    <section className="home">
      <h3> See below the latest article. </h3>
      <ArticleCard article={latesArticle[0]} />
    </section>
  );
}

export default Home;
