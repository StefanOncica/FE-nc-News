import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { fetchAllArticles } from "../src/Api";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import AllArticles from "./components/AllArticles";
import ArticleBodyById from "./components/ArticleBodyById";

function App() {
  const [user, setUser] = useState();
  const [allArticles, setAllArticles] = useState([]);
  const [articleId, setArticleId] = useState()

  useEffect(() => {
    fetchAllArticles().then((data) => {
      setAllArticles(() => {
        return [...data];
      });
    });
  }, []);

  return (
    <main>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<Home allArticles={allArticles} />} />
          <Route
            path="/articles"
            element={<AllArticles allArticles={allArticles} setArticleId={setArticleId} />}
          />

          <Route
            path="/articles/:id"
            element={<ArticleBodyById user={user}  />}
          />
        </Routes>
        
      </BrowserRouter>
    </main>
  );
}

export default App;
