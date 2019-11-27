import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Grid, Header, Divider, Image, Button, Icon, Label, List } from 'semantic-ui-react';

class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    }
  }

  changeToggle = (isVisible) => {
    this.setState({ isVisible });
  };

  componentWillUnmount() {
    this.setState({ isVisible: false });
  }

  getGenreName = genreId => {
    for (let i = 0; i < this.props.genres.length; i++) {
      if (genreId === this.props.genres[ i ].id) {
        return this.props.genres[ i ].name;
      }
    }
  };

  render() {
    const { data } = this.props;
    const { isVisible } = this.state;
    const moviePoster = 'http://image.tmdb.org/t/p/w92' + data.poster_path;

    return (
        <Segment style={ data.media_type === 'movie' ? { backgroundColor:'#FAFAFA' } : { backgroundColor:'#E0F7FA' } }>
            <Label attached='bottom'>
                {data.media_type}
            </Label>
            <Header as='h3'>
                {data.media_type === 'movie' ? <p>{data.title}</p> : <p>{data.name}</p>}
            </Header>
            <div style={ { paddingTop:'5px' } }>
                <span>
              Vote average : <Label>{data.vote_average}</Label>
                </span>
            </div>
            {this.state.isVisible &&
          (
          <div style={ { paddingBottom:'10px' } }>
              <Divider />
              <Grid columns='equal'>
                  <Grid.Column width={ 12 }>
                      <p><strong>Character's name : </strong>{data.character}</p>
                      <div style={ { overflow:'auto', height:'80px' } }>
                          <p><strong>Overview : </strong>{data.overview}</p>
                      </div>
                      {data.media_type === 'movie' ?
                    (
                        <div>
                            <p><strong>Release date : </strong>{data.release_date}</p>
                            <strong>Genre(s) : </strong>
                            <List bulleted>
                                {data.genre_ids.map(id => (
                                    <List.Item key={ id }>
                                        {this.getGenreName(id)}
                                    </List.Item>
                                ))}
                            </List>
                        </div>
                    )
                    :
                    (
                        <p><strong>Number of episode : </strong>{data.episode_count}</p>
                    )
                  }
                  </Grid.Column>
                  <Grid.Column>
                      <Image src={ moviePoster } />
                  </Grid.Column>
              </Grid>
          </div>
          )
        }
            {isVisible ?
          (
              <div style={ { textAlign:'right' } }>
                  <Button
                basic
                icon
                size='mini'
                onClick={ () => this.changeToggle(false) }>
                      <Icon name='angle up' />
                Hide
                  </Button>
              </div>
          )
          :
          (
              <div style={ { textAlign:'right' } }>
                  <Button
                basic
                icon
                size='mini'
                onClick={ () => this.changeToggle(true) }>
                      <Icon name='angle down' />
                Show
                  </Button>
              </div>
          )
        }
        </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    genres: state.genre
  }
}

MovieView.propTypes = {
  data: PropTypes.object.isRequired,
  genres: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(MovieView);
