import React from 'react';
import PropTypes from 'prop-types';
import { Segment, Image, Grid, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getActor } from '../../actions/actors';
import { getGenres } from '../../actions/genres';
import logo from '../../public/images/got_title.png';

import ActorSearchView from '../views/ActorSearchView';
import ActorView from '../views/ActorView';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      actor: {},
      errorMessage: ''
    }
  }

  componentDidUpdate(prevProps) {
    const { actors, error } = this.props;

    if (actors != prevProps.actors && this.props.actors.length === 10) {
      this.setState({ loading: false });
    }

    if (error != prevProps.error) {
      this.setState({ error });
    }
  }

  addActor = (actor) => {
    this.setState({ actor });
  };

  removeActor = () => {
    this.setState({ actor: {} });
  };

  componentDidMount() {
    const { getActor, getGenres } = this.props;

    getActor('48');
    getActor('1223786');
    getActor('239019');
    getActor('1001657');
    getActor('22970');
    getActor('1181313');
    getActor('17286');
    getActor('12795');
    getActor('239020');
    getActor('117642');
    getGenres();
  }

  render() {

    const { actor, errorMessage } = this.state;
    
    return (
        <div className='ui container'>
            <Segment>
                <div className='title'>
                    <Image src={ logo } size='large' centered/>
                </div>
            </Segment>
            {errorMessage ?
          (
              <Segment className='borderless' textAlign='center' style={ { height:'800px' } }>
                  <Header as='h1' color='grey'>
                      {errorMessage}
                  </Header>
              </Segment>
          )
          :
          (
              <div>
                  {this.state.loading ?
                      (
                          <Segment className='borderless' textAlign='center' style={ { height:'800px' } }>
                              <Header as='h1' color='grey'>
                          Loading...
                              </Header>
                          </Segment>
                )
                :
                (
                    <Grid columns='equal'>
                        <Grid.Column width={ 6 }>
                            <ActorSearchView actors={ this.props.actors } add={ this.addActor } remove={ this.removeActor }/>
                        </Grid.Column>
                        <Grid.Column>
                            {actor && <ActorView data={ actor } />}
                        </Grid.Column>
                    </Grid>
                )
              }
              </div>
          )
        }
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    actors: state.actor,
    error: state.error
  }
}

HomePage.propTypes = {
  actors: PropTypes.array,
  error: PropTypes.string,
  getActor: PropTypes.func.isRequired,
  getGenres: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  error: undefined,
};

export default connect(mapStateToProps, { getActor, getGenres })(HomePage);
