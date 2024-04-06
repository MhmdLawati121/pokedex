import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../media/Pokedex.png";

const SearchForm = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value.toLowerCase());
  };

  const redirectLink = `/pokemon/:${inputValue}`;

  return (
    <div className="searchFormDiv">
      <form className="searchForm">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter Pokemon"
        />
        <Link to={redirectLink} className="searchButton">
          <button>Go</button>
        </Link>
      </form>
    </div>
  );
};

function Header() {
  return (
    <>
      <nav>
        <img src={logo}></img>
      </nav>
      <SearchForm></SearchForm>
    </>
  );
}

export { Header };
