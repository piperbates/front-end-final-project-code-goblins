import React, { useContext, useEffect, useState, Memo } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import {apiURL} from "../../config"

// import { Layout } from "antd";

import { AuthContext } from "../../firebase/Auth";
import { AdminUsersContext } from "../../contexts/adminUsersContext";

import VideoSelectionPage from "../VideoSelectionPage";
import LectureViewer from "../LectureViewer";
import CoachCMS from "../CoachCMS";
import HeaderBar from "../HeaderBar";
import Login from "../Login";
import PrivateRoute from "../PrivateRoute";
import Restricted from "../Restricted";

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

// const { Footer, Content } = Layout;

const api = `/`;

function App() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);
  const [allVideoData, setAllVideoData] = useState([]);
  const [searchState, setSearchState] = useState({ search: "" });


  function updateSearch(search) {
    setSearchState({ ...searchState, search: search });
    //console.log(searchState);
  }

  console.log(allVideoData);
  useEffect(() => {
    async function getAllVideoData() {
      const response = await fetch(
        apiURL + `/?search=${searchState.search}`
      );//refactir into config file
      const data = await response.json();
      setAllVideoData(data);
    }
    getAllVideoData();
  }, [searchState]);

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoute
          exact
          path="/"
          render={() => (
            <>
              <HeaderBar updateSearch={updateSearch} search={searchState} />
              <VideoSelectionPage allVideoData={allVideoData} />
            </>
          )}
        />

        <PrivateRoute
          exact
          path={"/videoviewer/:id"}
          render={() => (
            <>
              <HeaderBar updateSearch={updateSearch} search={{ search: "" }} />
              <LectureViewer allVideoData={allVideoData} search={searchState} />
            </>
          )}
        />

        <PrivateRoute
          exact
          path={"/cms"}
          render={() =>
            adminUsers[0].find((user) => user.email === currentUser.email) ? (
              <>
                <HeaderBar updateSearch={updateSearch} search={searchState} />
                <CoachCMS />
              </>
            ) : (
              <Restricted />
            )
          }
        />
      </Switch>
    </div>
  );
}

export default App;
