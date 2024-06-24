import { Link } from "react-router-dom";
import { fetchAllUsers } from "../Api";
import { useEffect, useState } from "react";

function Header({ user, setUser }) {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetchAllUsers().then((users) => {
      setAllUsers(users);
      setIsLoading(false);
    });
  }, []);

  function HandleUser(event) {
    event.preventDefault();
    if (event.target.value === "----") {
      setUser(undefined);
    } else {
      setUser(event.target.value);
    }
  }

  return (
    <header>
      <div className="top-header">
        <h1>Welcome to the Northcoders News Page ! </h1>
        <ul className="user-top-icon">
          {allUsers.map((element) => {
            if (element.username === user) {
              return (
                <li className="user-top-icon" key={element.username}>
                  <img
                    className="user-img"
                    src={element.avatar_url}
                    alt="user icon"
                  />
                </li>
              );
            }
          })}
        </ul>
      </div>
      <nav>
        <ul className="main-navigation">
          <li className="main-link" key="home">
            <Link to="/home">Home</Link>
          </li>
          <li className="main-link" key="coding">
            <Link to="/articles?topic=coding">Coding</Link>
          </li>
          <li className="main-link" key="football">
            <Link to="/articles?topic=football">Football</Link>
          </li>
          <li className="main-link" key="cooking">
            <Link to="/articles?topic=cooking">Cooking</Link>
          </li>
          <li className="main-link" key="allItems">
            <Link to="/articles">See All Articles</Link>
          </li>
        </ul>
      </nav>

      <p>
        {user === undefined
          ? isLoading
            ? "LOADING... "
            : "You are NOT signed in!"
          : `Signed in as: ${user}`}
      </p>

      <div className="dropdown">
        <button className="dropbtn">Sign in</button>
        <select className="dropdown-content" onChange={HandleUser}>
          <option key="0000" value={undefined}>
            ----
          </option>
          {allUsers.map((user) => {
            return <option key={user.name}>{user.username}</option>;
          })}
        </select>
      </div>
    </header>
  );
}

export default Header;
