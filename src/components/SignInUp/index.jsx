import React from "react";
import {
  Carousel,
  Row,
  Col,
  Image,
  Layout,
  Menu,
  Divider,
  Button,
  Select,
  Spin,
  Input,
  Modal,
} from "antd";
import {
  IP_ADDRESS,
  GET_QUESTION,
  GET_INTIAL_MOVIE,
  POST_ANSWER,
  MOVIE_REC,
  get,
  post,
  CREATE_SESSION,
  USER_LOGIN,
  USER_LOGOUT,
  RESET_SERVER,
  GET_USER,
} from "../../api/base";
import { CopyrightOutlined } from "@ant-design/icons";
import accessIcon from "../../assets/access.png";
import recIcon from "../../assets/rec.png";
import botIcon from "../../assets/bot.png";
import storageIcon from "../../assets/storage.png";
import comIcon from "../../assets/com.png";
import { Link, Redirect } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

function onChange(a, b, c) {}

const { Option } = Select;

const contentStyle = {
  height: "700x",
  color: "#fff",
  lineHeight: "40%",
  textAlign: "center",
};

const imageAdress = "https://image.tmdb.org/t/p/w600_and_h900_bestv2/";

export default class SignInUp extends React.Component {
  state = {
    posterLink: [],
    modalVisible: false,
    modalLoading: false,
    newSession: false,
    loggedIn: false,
    username: "",
    age: 17,
    lang: "en",
    signInLoading: false,
    invalidUsernameFlag: false,
  };

  componentDidMount() {
    get(IP_ADDRESS + GET_INTIAL_MOVIE + "?top_n=20&page=1").then((movies) => {
      this.setState({
        posterLink: movies["movieList"].map((m) => m["poster_path"]),
      });
    });
  }

  showModal = () => {
    this.setState({
      modalVisible: true,
    });
  };

  onUsernameChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onAgeChange = (e) => {
    this.setState({
      age: e,
    });
  };

  onLangChange = (e) => {
    this.setState({
      lang: e,
    });
  };

  handleOk = () => {
    let re = /^[a-zA-Z\-0-9]+$/;
    if (!re.test(this.state.username)) {
      this.setState({
        invalidUsernameFlag: true,
      });
    } else {
      this.setState({
        modalLoading: true,
        invalidUsernameFlag: false,
      });

      get(IP_ADDRESS + USER_LOGIN + this.state["username"])
        .then(() => {
          this.setState({
            loggedIn: true,
            modalLoading: false,
          });
        })
        .catch((err) => {
          if (this.state.newSession) {
            get(
              IP_ADDRESS +
                CREATE_SESSION +
                `username=${this.state.username}&age=${this.state.age}&language=${this.state.lang}`
            ).then(() => {
              this.setState({
                loggedIn: true,
                modalLoading: false,
              });
            });
          } else {
            this.setState({
              modalLoading: false,
              newSession: true,
            });
          }
        });
    }
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
      username: "",
      age: 17,
      lang: "en",
      newSession: false,
      modalLoading: false,
      invalidUsernameFlag: false,
    });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home"></Redirect>;
    }
    return (
      <Spin tip="Signing in..." spinning={this.state.modalLoading} size="large">
        <Layout
          className="layout"
          style={{ background: "linear-gradient(180deg, #000000, #2a2a2a	)" }}
        >
          <Header style={{ background: "black", padding: "0" }}>
            <Layout>
              <Content
                style={{
                  background: "black",
                }}
              >
                <h1
                  style={{
                    color: "white",
                    left: "10%",
                    position: "relative",
                    fontSize: "x-large",
                  }}
                >
                  FilmPedia
                </h1>
              </Content>
              <Sider>
                <Button
                  type="primary"
                  shape="round"
                  onClick={this.showModal}
                  style={{ width: "auto", margin: "auto" }}
                >
                  Access Now!
                </Button>
                <Modal
                  visible={this.state.modalVisible}
                  title="Quick Login"
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  bodyStyle={{ paddingLeft: "10%" }}
                  footer={[
                    <Button key="back" onClick={this.handleCancel}>
                      Return
                    </Button>,
                    <Button
                      key="submit"
                      type="primary"
                      // loading={this.state.modalLoading}
                      onClick={this.handleOk}
                    >
                      Submit
                    </Button>,
                  ]}
                >
                  <div>
                    Username&nbsp; &nbsp; &nbsp; &nbsp;
                    <Input
                      placeholder="user123"
                      style={{ width: "50%" }}
                      onChange={this.onUsernameChange}
                      value={this.state.username}
                    />
                  </div>

                  {this.state.newSession ? (
                    <div>
                      <br />
                      Age over 18 &nbsp; &nbsp;
                      <Select defaultValue={17} onChange={this.onAgeChange}>
                        <Option value={17}>No</Option>
                        <Option value={21}>Yes</Option>
                      </Select>
                    </div>
                  ) : null}
                  {this.state.newSession ? (
                    <div>
                      <br />
                      Language &nbsp; &nbsp; &nbsp; &nbsp;
                      <Select defaultValue="en" onChange={this.onLangChange}>
                        <Option value="en">English</Option>
                        <Option value="es">Spanish</Option>
                        <Option value="ru">Russian</Option>
                        <Option value="fr">French</Option>
                        <Option value="ko">Korean</Option>
                        <Option value="zh">Chinese</Option>
                      </Select>
                    </div>
                  ) : null}

                  {this.state.newSession ? (
                    <div style={{ color: "red" }}>
                      <br />
                      Please create a new user account.
                    </div>
                  ) : null}

                  {this.state.invalidUsernameFlag ? (
                    <div style={{ color: "red" }}>
                      <br />
                      Please enter a valid user name.
                    </div>
                  ) : null}
                </Modal>
              </Sider>
            </Layout>
          </Header>
          <Carousel afterChange={onChange} autoplay>
            <div>
              <Row gutter={[8, 8]} style={contentStyle}>
                {[...Array(4).keys()].map((i) => {
                  return (
                    <Col span={6} height={"250px"}>
                      <Image
                        src={`${imageAdress}${this.state.posterLink[i]}`}
                        preview={false}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div>
              <Row gutter={[8, 8]} style={contentStyle}>
                {[...Array(4).keys()].map((i) => {
                  return (
                    <Col span={6} height={"250px"}>
                      <Image
                        src={`${imageAdress}${
                          this.state.posterLink[i + 4 * 1]
                        }`}
                        preview={false}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div>
              <Row gutter={[8, 8]} style={contentStyle}>
                {[...Array(4).keys()].map((i) => {
                  return (
                    <Col span={6} height={"250px"}>
                      <Image
                        src={`${imageAdress}${
                          this.state.posterLink[i + 4 * 2]
                        }`}
                        preview={false}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div>
              <Row gutter={[8, 8]} style={contentStyle}>
                {[...Array(4).keys()].map((i) => {
                  return (
                    <Col span={6} height={"250px"}>
                      <Image
                        src={`${imageAdress}${
                          this.state.posterLink[i + 4 * 3]
                        }`}
                        preview={false}
                      />
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Carousel>
          <br />
          <Content
            style={{
              margin: "5%",
            }}
          >
            <Row gutter={[16, 32]}>
              <Col span={8}>
                <h2 style={{ color: "white" }}>30s Registration</h2>
                <Image src={accessIcon}></Image>
                <Divider style={{ background: "white" }} />
                <h3 style={{ color: "white" }}>
                  Get access to our content within 30 seconds of registration,
                  no password required. Or try entering a random user name to
                  find out what others are tracking.
                </h3>
              </Col>
              <Col span={8}>
                <h2 style={{ color: "white" }}>Free Recommendations</h2>
                <Image src={recIcon}></Image>
                <Divider style={{ background: "white" }} />
                <h3 style={{ color: "white" }}>
                  FilmPedia is powered by TMDB with its personalized
                  recommendation system. You can freely explore 100,000+ movies
                  without getting lost.
                </h3>
              </Col>
              <Col span={8}>
                <h2 style={{ color: "white" }}>Personalized Assistant</h2>
                <Image src={botIcon}></Image>
                <Divider style={{ background: "white" }} />
                <h3 style={{ color: "white" }}>
                  FilmPedia is equipped with a film assistant, powered by IBM
                  Watson Assistant service, that could respond to your
                  preference anytime.
                </h3>
              </Col>
            </Row>

            <Row gutter={[16, 32]}>
              <Col span={8} offset={3}>
                <h2 style={{ color: "white" }}>24H Persistent Storage</h2>
                <Image src={storageIcon}></Image>
                <Divider style={{ background: "white" }} />
                <h3 style={{ color: "white" }}>
                  FilmPedia will create a guest session for each user upon
                  registration that stores all the preferences, browsing
                  history, and favorites up to 24 hours.
                </h3>
              </Col>
              <Col span={8} offset={1}>
                <h2 style={{ color: "white" }}>Film Community</h2>
                <Image src={comIcon}></Image>
                <Divider style={{ background: "white" }} />
                <h3 style={{ color: "white" }}>
                  Stay updated on what is trending effortlessly by browsing our
                  latest recommendations.
                </h3>
              </Col>
            </Row>
          </Content>
          <Footer>
            <CopyrightOutlined /> 2040 FilmPedia
          </Footer>
        </Layout>
      </Spin>
    );
  }
}
