import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../media/Pokedex.png";

/**
 * Component to display the searchbar
 *
 * @returns {JSX.Element} - The JSX element represnting the search bar
 */
const SearchForm = () => {
  const [inputValue, setInputValue] = useState("");

  // Automatically set user input to lower case for correct API format
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

/**
 * Component to display page header
 *
 * @returns {JSX.Element} - The JSX element representing the header and logo of the page
 */
function Header() {
  return (
    <>
      <nav>
        <img src={logo} alt={'"Pokedex" Logo'}></img>
      </nav>
      <SearchForm></SearchForm>
    </>
  );
}

export { Header };
