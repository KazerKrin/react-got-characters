import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Image, Grid, Header, Divider, Checkbox } from 'semantic-ui-react';

class ActorSearchView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: ''
    }
  }

  selectActor = (e) => {
    this.setState({ selected: e.target.name });
    this.props.add(this.props.actors.find(item => {
      return item.name === e.target.name;
    }));
  };

  unselectActor = () => {
    this.setState({ selected: {} });
  };

  getCharacterName = (actor) => {
    const { cast } = actor.combined_credits;
    for (let i = 0; i < cast.length; i++) {
      if (cast[ i ].id === 1399) {
        return cast[ i ].character;
      }
    }
  };

  render() {
    const { selected } = this.state;
    const { actors, add, remove } = this.props;
    
    return (
        <Segment style={ { overflow:'auto', height:'930px' } }>
            {actors.map((item, id) => {
          const profilePath = 'http://image.tmdb.org/t/p/w92' + item.profile_path;
          return (
              <div key={ item.name }>
                  <Segment className='borderless'>
                      <Grid columns='equal'>
                          <Grid.Column width={ 5 }>
                              <Image src={ profilePath } circular/>
                          </Grid.Column>
                          <Grid.Column>
                              <div style={ { marginTop:'10px' } }>
                                  <Header as='h3'>
                                      {item.name}
                                  </Header>
                                  <Header as='h4' color='orange'>
                                      {this.getCharacterName(item)}
                                  </Header>
                              </div>
                          </Grid.Column>
                          <Grid.Column>
                              <Checkbox
                      toggle
                      type='checkbox'
                      id={ item.name }
                      name={ item.name }
                      checked={ selected === item.name }
                      onChange={ selected === item.name ? this.unselectActor : this.selectActor }
                    />
                          </Grid.Column>
                      </Grid>
                  </Segment>
                  {id < actors.length - 1 && <Divider />}
              </div>
          );
        })}
        </Segment>
    );
  }
}

ActorSearchView.propTypes = {
  actors: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  remove:PropTypes.func.isRequired
};

export default ActorSearchView;
