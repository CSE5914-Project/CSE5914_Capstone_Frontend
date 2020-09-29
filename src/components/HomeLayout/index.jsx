import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Input, Button, Card } from "antd";
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
  get,
} from "../../api/base";
import { createChatBotMessage } from "react-chatbot-kit";

const { Header, Sider, Content, Footer } = Layout;
const { TextArea } = Input;
const { Meta } = Card;
export default class HomeLayout extends React.Component {
  state = {
    collapsed: false,
    movieList: [],
    botMessage: [],
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentDidMount() {
    Promise.all([
      get(IP_ADDRESS + GET_QUESTION),
      get(IP_ADDRESS + GET_INTIAL_MOVIE),
    ]).then(([questions, movies]) => {
      let curQuestions = this.state.botMessage;

      questions.forEach((q) => {
        curQuestions.push(
          createChatBotMessage(q["questionString"], {
            delay: 800,
          })
        );
      });

      this.setState({
        movieList: movies["movieList"],
        botMessage: curQuestions,
      });
    });
  }

  render() {
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
            <VideoList movies={this.state.movieList} />
            <ChatBot messages={this.state.botMessage} />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
