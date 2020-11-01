import React from "react";
import "./index.css";
import { Row, Col, Divider } from "antd";
import { Layout, Typography } from "antd";
import { Statistic, notification } from "antd";
import { FireTwoTone, LikeOutlined } from "@ant-design/icons";
import ReactPlayer from "react-player";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const imageAddress = "https://image.tmdb.org/t/p/w220_and_h330_face/";

export default class ProfilePage extends React.Component {
  render() {
    return (
      <div className="page-box">
        <div className="movie-page">
          <Layout style={{ height: 700, backgroundColor: "white" }}>
            <Header style={{ height: 230, padding: 20 }}>
              <img
                style={{ float: "left", marginLeft: 150, marginTop: 20 }}
                alt={this.props.movie.title}
                width={160}
                height={230}
                src={imageAddress + this.props.movie.poster_path}
              />
              <div
                className="movie-title-box"
                style={{ width: 600, marginTop: 50, marginLeft: 370 }}
              >
                <Title level={1} style={{ color: "white", fontSize: 40 }}>
                  {this.props.movie.title}
                </Title>
              </div>
              <div className="rate">
                <Statistic
                  value={this.props.movie.vote_average}
                  prefix={<LikeOutlined />}
                  valueStyle={{ color: "white" }}
                />
              </div>
            </Header>
            <Content style={{ height: 900, margin: 80 }}>
              <div style={{ float: "left", marginTop: 50 }}>
                <Title level={3} style={{ float: "left" }}>
                  {this.props.movie.title}
                </Title>
                <br />
                <br />
                <p style={{ textAlign: "left" }}>
                  <p>
                    <div className="icons-list" style={{ fontSize: 16 }}>
                      <FireTwoTone /> {this.props.movie.popularity}
                    </div>
                    <b>Original Language:</b>{" "}
                    {this.props.movie.original_language} <br />
                    <b>Release Date:</b> {this.props.movie.release_date}
                  </p>
                  <Divider />
                  <div className="movie-overview-box">
                    <Title level={4}>Overview</Title>
                    {this.props.movie.overview}
                  </div>
                  <Divider />
                  <div className="movie-trailer-box">
                    <Title level={4}>Trailer</Title>
                    <ReactPlayer
                      url={this.props.movie.trailer}
                      controls={true}
                    />
                  </div>
                </p>
              </div>
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}
