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
    age: "no",
    lang: "en",
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
    this.setState({
      modalLoading: true,
    });

    // see if there is already a session for this user
    get(IP_ADDRESS + GET_USER).then((user) => {
      if (user["username"] === this.state.username) {
        // found exsting session
        this.props.setUser({
          username: user["username"],
          age: user["age"],
          lang: user["language"],
        });

        this.setState({
          loggedIn: true,
          modalLoading: false,
        });
      } else if (this.state.newSession) {
        get(IP_ADDRESS + RESET_SERVER).then(() => {
          get(
            IP_ADDRESS +
              CREATE_SESSION +
              `username=${this.state.username}&age=${this.state.age}&language=${this.state.lang}`
          ).then((data) => {
            this.setState({
              loggedIn: true,
              modalLoading: false,
            });
          });
        });
      } else {
        this.setState({
          modalLoading: false,
          newSession: true,
        });
      }
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
      username: "",
      age: "no",
      lang: "en",
      newSession: false,
      modalLoading: false,
    });
  };

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/home"></Redirect>;
    }
    return (
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
                    <Select defaultValue="no" onChange={this.onAgeChange}>
                      <Option value="no">No</Option>
                      <Option value="yes">Yes</Option>
                    </Select>
                  </div>
                ) : null}
                {this.state.newSession ? (
                  <div>
                    <br />
                    Language &nbsp; &nbsp; &nbsp; &nbsp;
                    <Select defaultValue="en" onChange={this.onLangChange}>
                      <Option value="en">English</Option>
                      <Option value="zh">Chinese</Option>
                    </Select>
                  </div>
                ) : null}

                {this.state.newSession ? (
                  <div>
                    <br />
                    No user session found for the given username. Please start a
                    new session.
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
                    <Image src={`${imageAdress}${this.state.posterLink[i]}`} />
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
                      src={`${imageAdress}${this.state.posterLink[i + 4 * 1]}`}
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
                      src={`${imageAdress}${this.state.posterLink[i + 4 * 2]}`}
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
                      src={`${imageAdress}${this.state.posterLink[i + 4 * 3]}`}
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
                Get access to our content within 30 seconds of registration, no
                password required. Or try entering a random user name to find
                out what others are tracking.
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
                Watson Assistant service, that could respond to your preference
                anytime.
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
                registration that stores all the preferences, browsing history,
                and favorites up to 24 hours.
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
    );
  }
}
