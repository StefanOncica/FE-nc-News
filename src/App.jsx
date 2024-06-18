import { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AllArticles from "./components/AllArticles";
import { fetchAllArticles } from "../src/Api";

function App() {
  const [user, setUser] = useState();
  const [allArticles, setAllArticles] = useState([]);


  useEffect(() => {
    fetchAllArticles().then((data) => {
      setAllArticles(() => {
        return [...data];
      });
    });
  }, [allArticles]);

  return (
    <main>
      <BrowserRouter>
        <Header user={user} setUser={setUser} />

        <Routes>
          <Route path="/" element={<Home allArticles={allArticles} />} />
          <Route
            path="/articles"
            element={<AllArticles allArticles={allArticles} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
