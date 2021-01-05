import React from "react";
import "./App.css";
// import "antd/dist/antd.css";
import { Layout } from "antd";
// import { Input } from "antd";
// import socLogo from "../../soc-logo.png";
import VideoSelectionPage from "../components/VideoSelectionPage";
import LectureViewer from "../components/LectureViewer";
import CoachCMS from "../components/CoachCMS";
import HeaderBar from "../components/HeaderBar";
import {Route} from "react-router-dom"

const gridStyle = {
  width: "25%",
  textAlign: "center",
};

const { Footer, Content } = Layout;

function App() {
  return (
    <div>
      <HeaderBar />
      <Route path="/" exact>
          <VideoSelectionPage />
      </Route>

      <Route path="/CoachCMS" exact>
          <CoachCMS />
      </Route>
      <Route path="/Viewer" exact>
          <LectureViewer />
      </Route>
      <Route path="/viewer/1" exact>
          <LectureViewer />
      </Route>
      <Layout>
        <Footer>
          <footer>Footer</footer>
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
