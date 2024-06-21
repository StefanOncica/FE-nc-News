import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import { useEffect, useState } from "react";
import { fetchAllArticles } from "../Api";

function AllArticles() {
  const [topics, setTopics] = useSearchParams();

  const currentTopic = topics.get("topic");

  const [allArticles, setAllArticles] = useState([]);

  const [orderBy, SetOrderBy] = useState("Descending");

  const [sortBy, SetSortBy] = useState();

  useEffect(() => {
    fetchAllArticles().then((data) => {
      setAllArticles(() => {
        if (currentTopic) {
          return data.filter((article) => article.topic === currentTopic);
        } else {
          return [...data];
        }
      });
  
      setAllArticles((currentArticles) => {
        let filteredArticles = [...currentArticles];
        filteredArticles = filteredArticles.sort((currArticle, nextArticle) => {
          let currValue = Number(currArticle[sortBy])
          let nextValue = Number(nextArticle[sortBy])
          if (sortBy === "created_at") {
            currValue = Number(Date.parse(currArticle.created_at))
            nextValue = Number(Date.parse(nextArticle.created_at))
          }
        
          if (currValue > nextValue) {
            return orderBy === "Descending" ? -1 : 1;
          }
          if (currValue < nextValue) {
            return orderBy === "Descending" ? 1 : -1;
          }
  
          return 0;
        });
        return filteredArticles;
      });
    });
  }, [currentTopic, orderBy, sortBy]);

  function handleClickOrder(event) {
    if (orderBy === "Descending") {
      SetOrderBy("Ascending");
    } else {
      SetOrderBy("Descending");
    }
  }

  function handleSort(event) {
    event.preventDefault();
    SetSortBy(event.target.value);
  }

  return (
    <section className="all-articles">
      <p> Total articles {allArticles.length}</p>

      <div className="dropdown">
        <select className="dropdown-content" onChange={handleSort}>
          <option key="0none" value={undefined}>
            Sort by
          </option>
          <option key="1date" value="created_at">
            Date
          </option>
          <option key="2comments" value="comment_count">
            Comments
          </option>
          <option key="3votes" value="votes">
            Votes
          </option>
        </select>
        <button onClick={handleClickOrder}>{orderBy}</button>
      </div>

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
