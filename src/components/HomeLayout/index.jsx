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
  LogoutOutlined,
  AudioOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  HistoryOutlined,
  FireOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import BottomScrollListener from "react-bottom-scroll-listener";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import VideoList from "../VideoList/";
import {
  IP_ADDRESS,
  GET_QUESTION,
  GET_INTIAL_MOVIE,
  GET_FAVO_LIST,
  POST_ANSWER,
  USER_LOGOUT,
  ADD_FAVO_LIST,
  REMOVE_FAVO_LIST,
  GET_USER,
  MOVIE_REC,
  get,
  post,
} from "../../api/base";
import { createChatBotMessage } from "react-chatbot-kit";
import MovieProfile from "../MovieProfile/";
import UserProfile from "../UserProfile/";
import strings from "./lang.js";

const { Header, Sider, Content, Footer } = Layout;
const { TextArea } = Input;
const { Search } = Input;
const { Meta } = Card;
const openNotificationWithIcon = (type, title = null) => {
  if (title) {
    notification[type]({
      message:
        type === "success"
          ? `${title} added to the list`
          : `${title} removed from the list`,
      duration: 2,
    });
  } else {
    notification[type]({
      message: type === "success" ? "List Updated." : "No More Movies.",
      duration: 2,
    });
  }
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
    tabKey: "1",
    favoList: [],
    user: {},
    logoutLoading: false,
    genreLoading: false,
    stateChangeMovies: [],
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
    this.setState({
      genreLoading: true,
    });
    // get the updated list and resopnse
    get(
      IP_ADDRESS +
        POST_ANSWER +
        "?questionCode=2&answerText=" +
        text +
        "&page=1"
    )
      .then((data) => {
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
      })
      .finally(() => {
        this.setState({
          genreLoading: false,
        });
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

  addToFavorite = (movie) => {
    this.setState({
      stateChangeMovies: this.state.stateChangeMovies.concat(movie["id"]),
    });

    if (movie["id"] in this.state.favoList) {
      // remove
      get(IP_ADDRESS + REMOVE_FAVO_LIST + `movie_id=${movie["id"]}`).then(
        (d) => {
          this.setState({
            favoList: d["Current favorite_list"],
            stateChangeMovies: this.state.stateChangeMovies.filter(
              (i) => i !== movie["id"]
            ),
          });
          openNotificationWithIcon("info", movie["title"]);
        }
      );
    } else {
      // add
      get(IP_ADDRESS + ADD_FAVO_LIST + `movie_id=${movie["id"]}`).then((d) => {
        this.setState({
          favoList: d["Current favorite_list"],
          stateChangeMovies: this.state.stateChangeMovies.filter(
            (i) => i !== movie["id"]
          ),
        });
        openNotificationWithIcon("success", movie["title"]);
      });
    }
  };

  setActionProvider = (func) => {
    this.setState({
      botActionProvider: func,
    });
  };

  handleMenuClick = (e) => {
    if (e.key === "5") {
      this.setState({
        logoutLoading: true,
      });
      get(IP_ADDRESS + USER_LOGOUT).then(() => {
        this.setState({
          tabKey: e.key,
        });
      });
    } else {
      this.setState({
        tabKey: e.key,
      });
    }
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
      get(IP_ADDRESS + GET_INTIAL_MOVIE + "?top_n=20&page=1"),
      get(IP_ADDRESS + GET_USER),
    ]).then(([movies, user]) => {
      setTimeout(() => {
        get(IP_ADDRESS + GET_QUESTION).then((questions) => {
          let curQuestions = [];
          questions.forEach((q) => {
            curQuestions.push(q["questionString"]);
          });

          document.getElementsByClassName(
            "react-chatbot-kit-chat-input"
          )[0].placeholder =
            strings[user.language ? user.language : "en"]["ph"];

          this.setState({
            movieList: movies["movieList"],
            // only the genre question for the demo2
            botMessage: curQuestions[1],
            user: user,
          });
          window.scrollTo(0, 0);
        });

        //fetch user info
        get(IP_ADDRESS + GET_FAVO_LIST).then((d) => {
          this.setState({
            favoList: d["favorite_list"],
          });
        });
      }, 0);
    });

    document.getElementsByClassName("chatbot-button-icon")[0].onclick = () => {
      let ele = document.getElementsByClassName(
        "react-chatbot-kit-chat-container"
      )[0];
      if (ele.style.display === "none") {
        ele.style.display = "";
      } else {
        ele.style.display = "none";
      }
    };
  }

  render() {
    if (this.state.user.language) {
      var questionText = strings[this.state.user.language]["qp"];
    } else {
      var questionText = null;
    }

    if (this.state.tabKey === "5") {
      this.setState({
        logoutLoading: false,
      });
      return <Redirect to="/"></Redirect>;
    }

    // console.log("rednered" + this.state.botMessage);
    return (
      <Spin
        tip="Signing Out..."
        spinning={this.state.logoutLoading}
        size="large"
      >
        <Layout className="outer-layout">
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
            }}
          >
            {this.state.collapsed ? (
              <h1
                style={{
                  color: "white",
                  marginTop: "5%",
                  fontSize: "x-large",
                }}
              >
                FP
              </h1>
            ) : (
              <h1
                style={{
                  color: "white",
                  marginTop: "5%",
                  fontSize: "x-large",
                }}
              >
                FilmPedia
              </h1>
            )}

            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                // position: "-webkit-sticky" /* Safari */,
                position: "sticky",
              }}
            >
              <Menu.Item
                key="1"
                icon={<FireOutlined />}
                onClick={this.handleMenuClick}
              >
                {
                  strings[
                    this.state.user.language ? this.state.user.language : "en"
                  ]["rl"]
                }
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<HeartOutlined />}
                onClick={this.handleMenuClick}
              >
                {
                  strings[
                    this.state.user.language ? this.state.user.language : "en"
                  ]["f"]
                }
              </Menu.Item>
              {/* <Menu.Item
              key="3"
              icon={<HistoryOutlined />}
              onClick={this.handleMenuClick}
            >
              History
            </Menu.Item> */}
              <Menu.Item
                key="4"
                icon={<UserOutlined />}
                onClick={this.handleMenuClick}
              >
                {
                  strings[
                    this.state.user.language ? this.state.user.language : "en"
                  ]["pf"]
                }
              </Menu.Item>

              <Menu.Item
                key="5"
                icon={<LogoutOutlined />}
                onClick={this.handleMenuClick}
              >
                {
                  strings[
                    this.state.user.language ? this.state.user.language : "en"
                  ]["so"]
                }
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout
            className="site-layout"
            style={{ marginLeft: this.state.collapsed ? 80 : 200 }}
          >
            <Header
              className="site-layout-background"
              style={{
                position: "fixed",
                zIndex: 1,
                width: "100%",
                paddingLeft: "0",
              }}
            >
              {React.createElement(
                this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: this.toggle,
                }
              )}
              <Search
                placeholder="input search text"
                // onSearch={onSearch}
                enterButton
                size={"large"}
                style={{ width: "50%", marginTop: "15px" }}
              />
            </Header>
            <div
              style={{
                padding: 30,
                minHeight: 3,
                // overflow: "scroll",
              }}
            ></div>
            <Content
              className="site-layout-background-2"
              style={{
                margin: "24px 16px",
                padding: 48,
                minHeight: 280,
                // overflow: "scroll",
              }}
            >
              {this.state.tabKey === "1" ? (
                <React.Fragment>
                  {this.state.genreLoading ? (
                    <React.Fragment>
                      <Spin
                        spinning={this.state.genreLoading}
                        size="large"
                      ></Spin>
                      <br />
                      <br />
                    </React.Fragment>
                  ) : null}
                  <VideoList
                    movies={this.state.movieList}
                    onUserClick={this.onUserClick}
                    addFailedImage={this.addFailedImage}
                    failedImages={this.state.failedImages}
                    favoList={this.state.favoList}
                    addFavorite={this.addToFavorite}
                    stateChanges={this.state.stateChangeMovies}
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
                    username={this.state.user.username}
                    headerText={
                      strings[
                        this.state.user.language
                          ? this.state.user.language
                          : "en"
                      ]["mh"]
                    }
                    question={questionText}
                  />
                </React.Fragment>
              ) : null}

              {this.state.tabKey === "2" ? (
                <React.Fragment>
                  <VideoList
                    movies={Object.keys(this.state.favoList).map((id) => {
                      return {
                        id: this.state.favoList[id]["id"],
                        overview: this.state.favoList[id]["overview"],
                        title: this.state.favoList[id]["title"],
                        poster_path: this.state.favoList[id]["poster_path"],
                      };
                    })}
                    onUserClick={this.onUserClick}
                    addFailedImage={this.addFailedImage}
                    failedImages={this.state.failedImages}
                    favoList={this.state.favoList}
                    addFavorite={this.addToFavorite}
                    stateChanges={this.state.stateChangeMovies}
                    isFavoPage={true}
                  />
                </React.Fragment>
              ) : null}

              {this.state.tabKey === "4" ? (
                <UserProfile user={this.state.user} />
              ) : null}
            </Content>
            <BottomScrollListener onBottom={this.handleScrollToBottom}>
              <footer>
                <p>The Footer. Filmpedia </p>
              </footer>
            </BottomScrollListener>
          </Layout>
        </Layout>
      </Spin>
    );
  }
}
