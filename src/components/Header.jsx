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
      <h1>Welcome to the NC News Page ! </h1>

      <nav>
        <ul>
          <li key="home">
            <Link to="/">Home</Link>
          </li>
          <li key="allItems">
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
