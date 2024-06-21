import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";

function AllArticles({ allArticles }) {
  const [topics, setTopics] = useSearchParams();

  const currentTopic = topics.get("topic");

  let currentArticles = []
  if (!currentTopic) {
    currentArticles = [...allArticles] 
  }else{
    currentArticles = allArticles.filter((article) => article.topic===currentTopic)
  }

  function HandleSort () {

  }
  return (
    <section className="all-articles">
      <p> Total articles {currentArticles.length}</p>
      <ul className="articles-container">
        {currentArticles.map((article) => {
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
