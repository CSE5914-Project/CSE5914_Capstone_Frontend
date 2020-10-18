import React from "react";
import "./index.css";
import { Row, Col, Divider } from 'antd';
import { Layout, Typography  } from 'antd';
import { Statistic, notification} from 'antd';
import {
    FireTwoTone,
    LikeOutlined,
} from '@ant-design/icons';
import {
  IP_ADDRESS,
  MOVIE_TRAILER_LINK,
  get,
} from "../../api/base";

const { Header, Footer, Sider, Content } = Layout;
const { Title } = Typography;
const imageAddress = "https://image.tmdb.org/t/p/w220_and_h330_face/";

export default class ProfilePage extends React.Component{
    constructor(props) {
    super(props);
    this.state = {
        title: null,
        release_date: null,
        overview: null,
        popularity: null,
        poster_path: null,
        id: null,
        vote_average: null,
        youtube_trailer:null,
        original_language:null,
    };
  }

    componentDidMount() {
     fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=d555832ef92f1a8c0c212f671e1f0c9a&language=en-US`)
            .then(res => res.json())
            .then(
                (movie) => {
                    this.setState({
                        title: movie.title,
                        release_date: movie.release_date,
                        overview: movie.overview,
                        popularity: movie.popularity,
                        poster_path: movie.poster_path,
                        genres: movie.genres,
                        id: movie.id,
                        vote_average: movie.vote_average,
                        original_language:movie.original_language,
                  });
                },
            )
}

    getMovieTrailer = () => {
        get(IP_ADDRESS + MOVIE_TRAILER_LINK + this.state.id).then((data) => {
            this.setState({
                youtube_trailer: data["trailer"],
            });
        });
    };


    render() {
        return(
             <div className="page-box">
                <div className="movie-page">

                <Layout style={{height:700,backgroundColor:'white'}}>
                    <Header style={{height:230,padding:20}}>
                        <img
                            style={{float:'left',marginLeft:150,marginTop:20}}
                            alt={this.state.title}
                            width={160}
                            height={230}
                            src={imageAddress + this.state.poster_path}
                        />
                        <div className='movie-title-box' style={{width:600,marginTop:50,marginLeft:370}}>
                        <Title level={1} style={{color:'white',fontSize:40}}>
                            {this.state.title}
                        </Title>
                        </div>
                        <div className="rate">
                          <Statistic
                            value={this.state.vote_average}
                            prefix={<LikeOutlined />}
                            valueStyle={{ color: 'white' }}
                          />
                        </div>

                    </Header>
                    <Content style={{height:900,margin:80}}>
                        <div style={{float:'left',marginTop:50}}>
                        <Title level={3} style={{float:'left'}}>
                                {this.state.title}
                            </Title><br /><br />
                        <p style={{textAlign: 'left'}}>
                            <p>
                            <div className="icons-list" style={{fontSize:16}}>
                                <FireTwoTone /> {this.state.popularity}
                            </div>
                                <b>Original Language:</b> {this.state.original_language} <br />
                                <b>Release Date:</b> {this.state.release_date}
                            </p>
                            <Divider />
                            <div className="movie-overview-box">
                                <Title level={4} >
                                    Overview
                                </Title>
                            {this.state.overview}
                            </div>
                            <Divider />
                            <div className="movie-trailer-box">
                                <Title level={4} >
                                    Media
                                </Title>
                                   {this.state.youtube_trailer}
                            </div>
                        </p>
                        </div>

                    </Content>
                </Layout>
            </div>
            </div>
        )
    }
}
