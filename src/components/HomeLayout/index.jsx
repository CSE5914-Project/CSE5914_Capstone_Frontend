import React from "react";
import "antd/dist/antd.css";
import BotAvatar from "../MovieChatBot/BotAvatar";
import "./index.css";
import {
  Layout,
  Menu,
  Input,
  Button,
  Card,
  notification,
  Spin,
  Divider,
} from "antd";
import ChatBot from "../MovieChatBot/ChatBot";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import BottomScrollListener from "react-bottom-scroll-listener";

import VideoList from "../VideoList/";
import {
  IP_ADDRESS,
  GET_QUESTION,
  GET_INTIAL_MOVIE,
  POST_ANSWER,
  MOVIE_REC,
  get,
  post,
} from "../../api/base";
import { createChatBotMessage } from "react-chatbot-kit";

const { Header, Sider, Content, Footer } = Layout;
const { TextArea } = Input;
const { Meta } = Card;
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: type === "success" ? "List Updated." : "No More Movies.",
    duration: 2,
  });
};

export default class HomeLayout extends React.Component {
  state = {
    collapsed: false,
    movieList: [],
    botMessage: "",
    botActionProvider: () => {},
    failedImages: [],
    movieLoadingMore: false,
    /*
     *  one of the three enums: ["popular", "byId", "byGenere"]
     */
    movieSourceState: "popular",
    pageNumber: 1,
    reachedEnd: false,
    lastRecMovieId: -1,
    lastUserText: "",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  addFailedImage = (index) => {
    this.state.failedImages.push(index);
    this.setState({
      failedImages: this.state.failedImages,
    });
  };

  onUserEnterText = (text) => {
    // get the updated list and resopnse
    get(
      IP_ADDRESS +
        POST_ANSWER +
        "?questionCode=2&answerText=" +
        text +
        "&page=1"
    ).then((data) => {
      // update the set state
      this.state.botActionProvider(data.robotResponse);
      if (data["movieList"]["results"].length > 0) {
        openNotificationWithIcon("success");
        this.setState({
          botMessage: data.robotResponse,
          movieList: data["movieList"]["results"],
          failedImages: [],
          movieSourceState: "byGenre",
          pageNumber: 1,
          reachedEnd: false,
          lastUserText: text,
        });
        window.scrollTo(0, 0);
      } else {
        openNotificationWithIcon("info");
      }
    });
  };

  onUserClick = (index) => {
    let movie = this.state.movieList[index];
    let firstClick = this.state.movieSourceState !== "byId";

    get(IP_ADDRESS + MOVIE_REC + movie["id"] + "&page=1").then((data) => {
      if (data["movieList"]["results"].length > 0) {
        openNotificationWithIcon("success");
        data["movieList"]["results"].unshift(this.state.movieList[index]);
        this.setState({
          movieList: data["movieList"]["results"],
          failedImages: [],
          movieSourceState: "byId",
          pageNumber: 1,
          reachedEnd: false,
          lastRecMovieId: movie["id"],
        });
        window.scrollTo(0, 0);
      } else {
        openNotificationWithIcon("info");
      }
    });
  };

  setActionProvider = (func) => {
    this.setState({
      botActionProvider: func,
    });
  };

  handleScrollToBottom = () => {
    if (!this.state.reachedEnd) {
      this.setState({
        movieLoadingMore: true,
      });

      if (this.state.movieSourceState === "popular") {
        get(
          IP_ADDRESS +
            GET_INTIAL_MOVIE +
            `?top_n=20&page=${this.state.pageNumber + 1}`
        ).then((data) => {
          if (data["movieList"].length > 0) {
            this.setState({
              pageNumber: this.state.pageNumber + 1,
              movieList: this.state.movieList.concat(data["movieList"]),
              loadingMore: false,
            });
          } else {
            this.setState({
              loadingMore: false,
              reachedEnd: true,
            });
          }
        });
      } else if (this.state.movieSourceState === "byId") {
        get(
          IP_ADDRESS +
            MOVIE_REC +
            this.state.lastRecMovieId +
            `&page=${this.state.pageNumber + 1}`
        ).then((data) => {
          if (data["movieList"]["results"].length > 20) {
            this.setState({
              pageNumber: this.state.pageNumber + 1,
              movieList: this.state.movieList.concat(
                data["movieList"]["results"]
              ),
              loadingMore: false,
            });
          } else if (data["movieList"]["results"].length > 0) {
            this.setState({
              pageNumber: this.state.pageNumber + 1,
              movieList: this.state.movieList.concat(
                data["movieList"]["results"]
              ),
              loadingMore: false,
              reachedEnd: true,
            });
          } else {
            this.setState({
              loadingMore: false,
              reachedEnd: true,
            });
          }
        });
      } else {
        get(
          IP_ADDRESS +
            POST_ANSWER +
            "?questionCode=2&answerText=" +
            this.state.lastUserText +
            `&page=${this.state.pageNumber + 1}`
        ).then((data) => {
          if (data["movieList"]["results"].length > 0) {
            this.setState({
              pageNumber: this.state.pageNumber + 1,
              movieList: this.state.movieList.concat(
                data["movieList"]["results"]
              ),
              loadingMore: false,
            });
          } else {
            this.setState({
              loadingMore: false,
              reachedEnd: true,
            });
          }
        });
      }
    }
  };

  componentDidMount() {
    Promise.all([
      get(IP_ADDRESS + GET_QUESTION),
      get(IP_ADDRESS + GET_INTIAL_MOVIE + "?top_n=20&page=1"),
    ]).then(([questions, movies]) => {
      let curQuestions = [];
      questions.forEach((q) => {
        curQuestions.push(q["questionString"]);
      });

      this.setState({
        movieList: movies["movieList"],
        // only the genre question for the demo2
        botMessage: curQuestions[1],
      });
    });
  }

  render() {
    // console.log("rednered" + this.state.botMessage);
    return (
      <Layout className="outer-layout">
        {/* <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              Film Assistant
            </Menu.Item>
          </Menu>
        </Sider> */}
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: this.toggle,
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 48,
              minHeight: 280,
              overflow: "scroll",
            }}
          >
            <VideoList
              movies={this.state.movieList}
              onUserClick={this.onUserClick}
              addFailedImage={this.addFailedImage}
              failedImages={this.state.failedImages}
            />
            {this.state.movieLoadingMore && !this.state.reachedEnd ? (
              <Spin tip={"Fetching more movies..."} />
            ) : (
              <div></div>
            )}

            {this.state.reachedEnd ? (
              <Divider dashed>The End of the World</Divider>
            ) : null}
            <ChatBot
              displayMessage={this.state.botMessage}
              onEnter={this.onUserEnterText}
              setActionProvider={this.setActionProvider}
            />
          </Content>
          <BottomScrollListener onBottom={this.handleScrollToBottom}>
            <footer>
              <p>The Footer. Filmpedia </p>
            </footer>
          </BottomScrollListener>
        </Layout>
      </Layout>
    );
  }
}
