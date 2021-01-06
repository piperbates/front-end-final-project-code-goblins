import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

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

const api = `/`;

function App() {
  console.log("app firing");
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);
  const [allVideoData, setAllVideoData] = useState([]);

  useEffect(() => {
    async function getAllVideoData() {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + api);
      const data = await response.json();
      setAllVideoData(data);
    }
    getAllVideoData();
  }, []);

  const renewAllVideoData = () => {
    setAllVideoData([]);
  };

  return (
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoute
          exact
          path="/"
          render={() => (
            <>
              <VideoSelectionPage
                allVideoData={allVideoData}
                renewAllVideoData={renewAllVideoData}
              />
            </>
          )}
        />

        <PrivateRoute
          exact
          path={"/videoviewer/:id"}
          render={() => (
            <>
              <LectureViewer allVideoData={allVideoData} />
            </>
          )}
        />

        <PrivateRoute
          exact
          path={"/cms"}
          render={() =>
            adminUsers[0].find((user) => user.email === currentUser.email) ? (
              <>
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
