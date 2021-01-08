import React, { useContext, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Button } from "antd";
import "./App.less";

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

// const api = `/`;

function App() {
  // const { currentUser } = useContext(AuthContext);
  // const adminUsers = useContext(AdminUsersContext);
  // const [allVideoData, setAllVideoData] = useState([]);
  // console.log(allVideoData);
  // useEffect(() => {
  //   async function getAllVideoData() {
  //     const response = await fetch(process.env.REACT_APP_BACKEND_URL + api);
  //     const data = await response.json();
  //     setAllVideoData(data);
  //   }
  //   getAllVideoData();
  // }, []);

  return (
    <div>
      <Button type="primary">Blah</Button>
      {/* <Switch>
        <Route exact path="/login" component={Login} />

        <PrivateRoute
          exact
          path="/"
          render={() => (
            <>
              <HeaderBar />
              <VideoSelectionPage allVideoData={allVideoData} />
            </>
          )}
        />

        <PrivateRoute
          exact
          path={"/videoviewer/:id"}
          render={() => (
            <>
              <HeaderBar />
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
                <HeaderBar />
                <CoachCMS />
              </>
            ) : (
              <Restricted />
            )
          }
        />
      </Switch> */}
    </div>
  );
}

export default App;
