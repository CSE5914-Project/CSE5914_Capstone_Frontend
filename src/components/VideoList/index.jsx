import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Row, Col, Card } from "antd";
const { Meta } = Card;

function repeat(item, times) {
  let rslt = [];
  for (let i = 0; i < times; i++) {
    rslt.push(item);
  }
  return rslt;
}
const dummyMovies = repeat(
  {
    avatar:
      "https://lh3.googleusercontent.com/8iZjDOMW5B4Xuk1Qv8VtrAy-TYGRX9_YOcvoPeSLbO1Vs78SQN71aTpFH2jnFO8RQnU",
    title: "Harry Potter and the Sorcerer's Stone",
    description:
      "Based on the first of J.K. Rowling's popular children's novels about Harry Potter.",
    link: "https://www.imdb.com/title/tt0241527/",
  },
  10
);

/**
 * Component that renders a list of videos for recommendtaions
 * props: {
 *  movies: Array[
 *  {
 *      avatar : "LINK_TO_AVATAR",
 *      title : "TITLE" ,
 *      description : "SHORT_DESCRIIPTION",
 *      link : "TRAILER_LINK"
 *  },
 *  ...
 * ]
 * }
 */
const VideoList = (props) => {
  //   let movies = props.movies;
  let movies = dummyMovies;
  const colCounts = 3;
  const lgColCounts = 4;
  const smColCounts = 2;
  const hGutter = 48;
  const vGutter = 48;
  let rows = [];
  // render movie cards based on the movieInfo
  let movieCols = movies.map((movieInfo, i) => {
    return (
      <Col
        key={i.toString()}
        span={24 / colCounts}
        style={{ height: "max-content", width: "80%" }}
        lg={24 / lgColCounts}
      >
        <Card
          hoverable
          cover={<img alt={movieInfo.title} src={movieInfo.avatar} />}
        >
          <Meta
            title={movieInfo.title}
            description="Based on the first of J.K. Rowling's popular children's novels about Harry Potter."
          />
        </Card>
      </Col>
    );
  });
  // clean the last row that might be less than colCounts
  rows = <Row gutter={[vGutter, hGutter]}>{movieCols}</Row>;

  return <React.Fragment>{rows}</React.Fragment>;
};

export default VideoList;
