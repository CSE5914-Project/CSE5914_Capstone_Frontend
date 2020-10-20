import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Link } from "react-router-dom";
import { Row, Col, Card, Skeleton, Tooltip } from "antd";
import { HeartOutlined, RedoOutlined, HeartTwoTone } from "@ant-design/icons";
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

const imageAdress = "https://image.tmdb.org/t/p/w220_and_h330_face/";

const coverImagePH =
  "https://php7.joblo.com/assets/images/movie-database/placeholder.jpg";

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
  let movies = props.movies;
  const colCounts = 3;
  const lgColCounts = 4;
  const smColCounts = 2;
  const hGutter = 48;
  const vGutter = 48;
  let rows = [];
  let movieCols = movies.map((movieInfo, i) => {
    let isFavo = movieInfo.id in props.favoList;
    let heartButton = (
      <HeartOutlined key="favorite" onClick={() => props.addFavorite(i)} />
    );
    if (isFavo) {
      heartButton = (
        <HeartTwoTone
          key="favorite"
          twoToneColor="#eb2f96"
          onClick={() => props.addFavorite(i)}
        />
      );
    }
    return (
      <Col
        key={i.toString()}
        span={24 / colCounts}
        style={{ height: "auto", width: "80%" }}
        lg={24 / lgColCounts}
      >
        <div>
          <Card
            onError={() => {
              console.log(`unfound image for ${movieInfo.title}`);
              props.addFailedImage(i);
            }}
            hoverable
            cover={
              <Link to={`../movie/${movieInfo.id}`}>
                <img
                  alt={movieInfo.title}
                  src={
                    props.failedImages.includes(i)
                      ? coverImagePH
                      : imageAdress + movieInfo["poster_path"]
                  }
                />
              </Link>
            }
            actions={[
              heartButton,
              <Tooltip
                title="Refresh the page with the recommendated movies"
                mouseEnterDelay={0.5}
              >
                <RedoOutlined
                  key="shuffle"
                  onClick={() => props.onUserClick(i)}
                />
                ,
              </Tooltip>,
            ]}
          >
            <Meta
              title={movieInfo.title}
              description={
                movieInfo.overview.length > 200
                  ? movieInfo.overview.substring(0, 200) + "..."
                  : movieInfo.overview
              }
            />
          </Card>
        </div>
      </Col>
    );
  });
  // clean the last row that might be less than colCounts
  rows = <Row gutter={[vGutter, hGutter]}>{movieCols}</Row>;
  return <React.Fragment>{rows}</React.Fragment>;
};

export default VideoList;
