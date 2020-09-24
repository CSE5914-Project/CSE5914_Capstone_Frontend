import React from "react";
import "antd/dist/antd.css";
import ChatStreams from "./ChatStreams";
import "./ChatBotWindow.css";
import { Layout, Menu, Input, Button, Card } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from "@ant-design/icons";
const { Header, Sider, Content, Footer } = Layout;
const { TextArea } = Input;
const { Meta } = Card;

export default class ChatBotWindow extends React.Component {
  state = {
    inputConfig: { maxRows: 3, minRows: 3 },
    textAreaString: "",
    collapsed: false,
    botQuestionSequence: [
      "Are you over 18 yet?",
      "What language do you speak?",
      "What is the genre you would like to watch?",
    ],
    messageStreams: [],
    conversationOver: false,
  };

  mockRec = (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="example"
          src="https://lh3.googleusercontent.com/8iZjDOMW5B4Xuk1Qv8VtrAy-TYGRX9_YOcvoPeSLbO1Vs78SQN71aTpFH2jnFO8RQnU"
        />
      }
    >
      <Meta
        title="Harry Potter and the Sorcerer's Stone"
        description="Based on the first of J.K. Rowling's popular children's novels about Harry Potter."
      />
    </Card>
  );

  formatMessage = (message, isUser, children = null) => {
    const botMessageConfig = {
      author: "Film Assistant",
      avatar:
        "https://cdn.trendhunterstatic.com/phpthumbnails/323/323786/323786_1_600.jpeg",
      position: "left",
    };

    const userMessageConfig = {
      author: "You",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQHiJAafITCSR8_nkkMW3ES9Wv8d5iNkilHuA&usqp=CAU",
      position: "left",
    };

    if (isUser) {
      return Object.assign(userMessageConfig, {
        content: message,
      });
    } else {
      return Object.assign(botMessageConfig, {
        content: message,
        children: children,
      });
    }
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  onTextAreaChange = (e) => {
    this.setState({
      textAreaString: e.target.value,
    });
  };

  onEnterMessage = () => {
    let curStream = this.state.messageStreams;
    let curRes = this.formatMessage(this.state.textAreaString, true);
    curStream.push(curRes);
    this.setState({
      textAreaString: "",
      messageStreams: curStream,
    });
    if (!this.state.conversationOver) {
      this.nextQuestion();
    }
  };

  nextQuestion = () => {
    let remainingQuestions = this.state.botQuestionSequence;
    let curStream = this.state.messageStreams;
    if (!remainingQuestions.length) {
      // no more questions
      this.setState({
        conversationOver: true,
      });
      curStream.push(
        this.formatMessage(
          "Based on the feedback, here is my recommendation: ",
          false,
          this.mockRec
        )
      );
    } else {
      let initialQuestion = this.formatMessage(
        remainingQuestions.shift(),
        false
      );
      curStream.push(initialQuestion);
      this.setState({
        messageStreams: curStream,
        botQuestionSequence: remainingQuestions,
      });
    }
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    this.nextQuestion();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    return (
      <Layout className="outer-layout">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              FilmAssistant
            </Menu.Item>
          </Menu>
        </Sider>
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
              padding: 24,
              minHeight: 280,
              overflow: "scroll",
            }}
          >
            <ChatStreams userMessages={this.state.messageStreams} />
            <div
              style={{ float: "left", clear: "both" }}
              ref={(el) => {
                this.messagesEnd = el;
              }}
            ></div>
          </Content>
          <Footer>
            <Layout>
              <Content>
                <TextArea
                  rows={2}
                  allowClear
                  autoFocus
                  autoSize={this.state.inputConfig}
                  onChange={this.onTextAreaChange}
                  value={this.state.textAreaString}
                />
              </Content>
              <br></br>
              <Content>
                <Button type="primary" onClick={this.onEnterMessage}>
                  Input Message
                </Button>
              </Content>
            </Layout>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
