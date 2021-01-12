import React, { useContext } from "react";
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

function App() {
  const { currentUser } = useContext(AuthContext);
  const adminUsers = useContext(AdminUsersContext);

  return (
    <>
      <PrivateRoute
        path="/"
        render={() => (
          <>
            <HeaderBar />
          </>
        )}
      />
      <main>
        <Switch>
          <Route exact path="/login" component={Login} />

          <PrivateRoute
            exact
            path="/"
            render={() => (
              <>
                <VideoSelectionPage />
              </>
            )}
          />

          <PrivateRoute
            exact
            path={"/videoviewer/:id"}
            render={() => (
              <>
                <LectureViewer />
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
      </main>
      {/* <PrivateRoute
        path="/"
        render={() => (
          <>
            <footer>
              <div id="footer-content">
                <p>
                  &copy; Copyright 2021 School of Code. All Rights Reserved -
                  Privacy Policy - Terms of Use School of Code Ltd is registered
                  in England, Company No. 09793790 School of Code, Custard
                  Factory, Gibb Street, Birmingham, B9 4AA
                </p>
              </div>
            </footer>
          </>
        )}
      /> */}
    </>
  );
}

export default App;
