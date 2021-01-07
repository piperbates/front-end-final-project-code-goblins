import React, { useContext, useEffect, useState } from "react";
import { Redirect, Link, useLocation } from "react-router-dom";
import "./style.css";
import socLogo from "../../images/soc-logo.png";
import app from "../../firebase/Base";
import { AuthContext } from "../../firebase/Auth";
import ContentManagementLink from "../ContentManagementLink";
import { AdminUsersContext } from "../../contexts/adminUsersContext";
import { Button, Input } from "antd";

const { Search } = Input; //imports Search from ant.d 

function HeaderBar({ updateSearch, search }) {
  //updateSearch is the function that updates the searchState on App.js
  //search is App.js' searchState

  //Authorization stuff:
  const { currentUser } = useContext(AuthContext); 
  const adminUsers = useContext(AdminUsersContext);

  let {pathname} = useLocation(); //Confirmation of the route so we can use this later
  
  const [searchField, setSearchField] = useState(search.search); //State that controls the search field input, which is later used to update the main searchState that's sent back up to App.


  //onSearch - if the route is the homepage, it will run a regular search.
  //If the route is anywhere else, it *should*  route back to the homepage before running the search. Currently only works on the homepage.
  const onSearch = (value) => {
    console.log(pathname);
    if (pathname === "/") {
      updateSearch(value);
    } else {
      //  updateSearch(value);
      console.log("Checking");
    }
    // console.log(useLocation().pathname);
  };

  //Sets the searchField state to the value, to later set the main searchState in App in order to maintain the search sitewide.
  const onChange = (e) => {
    setSearchField(e.target.value);
  };

  // useEffect(() => {
  //   // updateSearch(searchField);
  // }, [searchField]);

  return (
    <header>
      <div id="header-content">
        <div id="logo-nav-wrapper">
          <Link
            to="/"
            onClick={() => {
              updateSearch("");
            }}
          >
            <img src={socLogo} alt="logo" id="soc-logo" />
          </Link>
          <nav>
            <ul>
              <li>Tutorials</li>
              <li>Lectures</li>
              {adminUsers[0].find(
                (user) => user.email === currentUser.email
              ) ? (
                <ContentManagementLink />
              ) : (
                <li style={{ display: "none" }}></li>
              )}
            </ul>
          </nav>
        </div>
        <div id="search-signout-wrapper">
          <div id="search-box">
            <Search
              placeholder="input search text"
              value={searchField}
              allowClear={true}
              onChange={onChange}
              onSearch={onSearch}
              style={{ width: 200 }}
            />
          </div>
          <Button
            onClick={() => app.auth().signOut()}
            style={{
              background: "#31986A",
              borderRadius: "10px",
              height: "50px",
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;
