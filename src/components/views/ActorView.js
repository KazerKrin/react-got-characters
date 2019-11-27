import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Header, Divider, Transition, List, Dropdown } from 'semantic-ui-react';

import MovieView from './MovieView';

const typeOptions = [
  { key: 'M', value: 'movie', text: 'Movie' },
  { key: 'T', value: 'tv', text: 'Tv Show' }
];

const genreOptions = [
  { key: 'Ac', value: 'Action', text: 'Action' },
  { key: 'Ad', value: 'Adventure', text: 'Adventure' },
  { key: 'An', value: 'Animation', text: 'Animation' },
  { key: 'Co', value: 'Comedy', text: 'Comedy' },
  { key: 'Cr', value: 'Crime', text: 'Crime' },
  { key: 'Do', value: 'Documentary', text: 'Documentary' },
  { key: 'Dr', value: 'Drama', text: 'Drama' },
  { key: 'Fa', value: 'Family', text: 'Family' },
  { key: 'Fan', value: 'Fantasy', text: 'Fantasy' },
  { key: 'Hi', value: 'History', text: 'History' },
  { key: 'Ho', value: 'Horror', text: 'Horror' },
  { key: 'Mu', value: 'Music', text: 'Music' },
  { key: 'My', value: 'Mystery', text: 'Mystery' },
  { key: 'Ro', value: 'Romance', text: 'Romance' },
  { key: 'Sc', value: 'Science Fiction', text: 'Science Fiction' },
  { key: 'Th', value: 'Thriller', text: 'Thriller' },
  { key: 'Wa', value: 'War', text: 'War' },
  { key: 'We', value: 'Western', text: 'Western' }
];

const filteringOptions = [
  { key: 'A', value: '', text: 'All' },
  { key: 'T', value: 'T', text: 'Type' },
  { key: 'G', value: 'G', text: 'Genre' },
  { key: 'Br', value: 'Br', text: 'Best Rates' },
  { key: 'Wr', value: 'Wr', text: 'Worst Rates' }
];

class ActorView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filterSelected: '',
      filterOption: ''
    }
  }

  onChangeFilter = (e, data) => this.setState({ filterSelected: data.value });

  onChangeOption = (e, data) => this.setState({ filterOption: data.value });

  isGenreExist = genreIds => {
    const { filterOption } = this.state;

    for (let j = 0; j < genreIds.length; j++) {
      for (let i = 0; i < this.props.genres.length; i++) {
        if (this.props.genres[ i ].id === genreIds[ j ]
          && this.props.genres[ i ].name === filterOption) {
          return true;
        }
      }
    }
    return false;
  };

  render() {

    const { data } = this.props;
    const { filterSelected, filterOption } = this.state;

    let filteredList = [];
    if (data.combined_credits) {
      filteredList = data.combined_credits.cast;
      if (filterSelected === 'Br') {
        filteredList = filteredList.sort(function(a, b) {
          if (a.vote_average > b.vote_average) { return -1; }
          if (a.vote_average < b.vote_average) { return 1; }
          return 0;
        });
      } else if (filterSelected === 'Wr') {
        filteredList = filteredList.sort(function(a, b) {
          if (a.vote_average < b.vote_average) { return -1; }
          if (a.vote_average > b.vote_average) { return 1; }
          return 0;
        });
      } else {
        filteredList = filteredList.filter(item => {
          return !filterSelected
              || (this.state.filterSelected === 'G' && this.isGenreExist(item.genre_ids))
              || (this.state.filterSelected === 'T' && item.media_type === filterOption);
        });
      }
    }

    return (

        <div>
            <Segment textAlign='center'>
                <Header as='h3'>Discover the actors of the Seven Kingdoms</Header>
                <Divider />
                <p>
                   Please select actors in the left panel to see their biography as well as the list of films they've been starring.
                </p>
            </Segment>
            {data.name &&
          (
          <Segment>
              <Header as='h3'>{data.name}</Header>
              <Divider />
              <p><strong>Date of birth : </strong>{data.birthday}</p>
              <p><strong>Place of birth : </strong>{data.place_of_birth}</p>
              <div style={ { overflow:'auto', height:'100px' } }>
                  <p>{data.biography}</p>
              </div>
              <Header as='h3'>Actor's credits</Header>
              <span>
                  <Dropdown
                  placeholder='filter by...'
                  search
                  selection
                  options={ filteringOptions }
                  onChange={ this.onChangeFilter }
                />
                  {filterSelected &&
                (
                <span>
                    {filterSelected === 'G' &&
                      (
                      <Dropdown
                          placeholder='filter by genre...'
                          search
                          selection
                          options={ genreOptions }
                          onChange={ this.onChangeOption }
                          style={ { marginLeft: '10px' } }
                        />
                      )
                    }
                    {filterSelected === 'T' &&
                      (
                      <Dropdown
                          placeholder='filter by type...'
                          search
                          selection
                          options={ typeOptions }
                          onChange={ this.onChangeOption }
                          style={ { marginLeft: '10px' } }
                        />
                      )
                    }
                </span>
                )
              }
              </span>
              <Transition.Group as={ List } duration={ 500 } style={ { overflow:'auto', height:'500px' } }>
                  {filteredList.map((item, id) => {
                  return (
                      <List.Item key={ item.name }>
                          <MovieView data={ item }/>
                      </List.Item>
                    );
                })}
              </Transition.Group>
          </Segment>
          )
        }
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    genres: state.genre
  }
}

ActorView.propTypes = {
  data: PropTypes.shape({
    biography: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    combined_credits: PropTypes.object.isRequired,
    place_of_birth: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  genres: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(ActorView);
