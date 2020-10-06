import React from "react";
import "antd/dist/antd.css";
import BotAvatar from "../MovieChatBot/BotAvatar";
import "./index.css";
import { Layout, Menu, Input, Button, Card, notification } from "antd";
import ChatBot from "../MovieChatBot/ChatBot";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
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
    // move the question queue
    // if (this.state.botMessage.length) {
    //   this.state.botMessage.shift();
    // }

    // get the updated list and resopnse
    get(IP_ADDRESS + POST_ANSWER + "?questionCode=2&answerText=" + text).then(
      (data) => {
        // update the set state
        this.state.botActionProvider(data.robotResponse);

        if (data["movieList"]["results"].length > 0) {
          openNotificationWithIcon("success");
          this.setState({
            botMessage: data.robotResponse,
            movieList:
              data["movieList"]["results"].length >= 10
                ? data["movieList"]["results"].slice(10)
                : data["movieList"]["results"],
            failedImages: [],
          });
        } else {
          openNotificationWithIcon("info");
        }
      }
    );
  };

  onUserClick = (index) => {
    let movie = this.state.movieList[index];
    get(IP_ADDRESS + MOVIE_REC + movie["id"]).then((data) => {
      if (data["movieList"]["results"].length > 0) {
        openNotificationWithIcon("success");
        this.setState({
          movieList:
            data["movieList"]["results"].length >= 10
              ? data["movieList"]["results"].slice(10)
              : data["movieList"]["results"],
          failedImages: [],
        });
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

  componentDidMount() {
    Promise.all([
      get(IP_ADDRESS + GET_QUESTION),
      get(IP_ADDRESS + GET_INTIAL_MOVIE),
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
            <ChatBot
              displayMessage={this.state.botMessage}
              onEnter={this.onUserEnterText}
              setActionProvider={this.setActionProvider}
            />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
