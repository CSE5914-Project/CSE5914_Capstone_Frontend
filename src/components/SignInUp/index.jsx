import React from "react";
import { Carousel, Row, Col, Image, Layout, Menu, Divider } from "antd";
import {
  IP_ADDRESS,
  GET_QUESTION,
  GET_INTIAL_MOVIE,
  POST_ANSWER,
  MOVIE_REC,
  get,
  post,
} from "../../api/base";
import { CopyrightOutlined } from "@ant-design/icons";
import accessIcon from "../../assets/access.png";
import recIcon from "../../assets/rec.png";
import botIcon from "../../assets/bot.png";
import storageIcon from "../../assets/storage.png";
import comIcon from "../../assets/com.png";

const { Header, Content, Footer, Sider } = Layout;

function onChange(a, b, c) {
  console.log(a, b, c);
}

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
  };

  componentDidMount() {
    get(IP_ADDRESS + GET_INTIAL_MOVIE + "?top_n=20&page=1").then((movies) => {
      this.setState({
        posterLink: movies["movieList"].map((m) => m["poster_path"]),
      });
    });
  }

  render() {
    return (
      <Layout
        className="layout"
        style={{ background: "linear-gradient(180deg, #000000, #2a2a2a	)" }}
      >
        <Header style={{ background: "black" }}>
          <h1 style={{ color: "white" }}>FilmPedia</h1>
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
        <Content>
          <Row gutter={[8, 16]}>
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

          <Row gutter={[40, 32]}>
            <Col span={12} offset={1}>
              <h2 style={{ color: "white" }}>24H Persistent Storage</h2>
              <Image src={storageIcon}></Image>
              <Divider style={{ background: "white" }} />
              <h3 style={{ color: "white" }}>
                FilmPedia will create a guest session for each user upon
                registration that stores all the preferences, browsing history,
                and favorites up to 24 hours.
              </h3>
            </Col>
            <Col span={12} offset={1}>
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
