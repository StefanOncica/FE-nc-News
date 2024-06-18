import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://news-api-knls.onrender.com/api",
});

export const fetchAllUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    return data.users;
  });
};

export const fetchAllArticles = () => {
  return newsApi.get('/articles').then(({data})=>{
    return data.articles
  })
}
