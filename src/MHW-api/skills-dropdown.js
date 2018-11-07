import React, { Component } from 'react';
import {
      Dropdown,
      Button,
      Dimmer,
      Loader,
      Image,
      Segment,
} from 'semantic-ui-react';
import {
      searchFunction,
      fetchSkills,
      convertReadable,
} from '../misc/functions';
import simpleImage from '../misc/images/short-paragraph.png';
import ArmorResults from './armor-results';

class DropDownSkills extends Component {
      state = {
            options: [],
            selectedValues: [],
            isLoading: true,
            armorResults: '',
            arrmorResultLoading: false,
      };

      componentDidMount() {
            const tempState = fetchSkills();

            tempState.then(tempState => {
                  this.setState({
                        options: tempState,
                        isLoading: false,
                  });
            });
      }

      handleChange = (e, { value }) => {
            this.setState({
                  selectedValues: value,
            });
      };

      searchButtonClick = () => {
            if (this.state.selectedValues.length > 0) {
                  this.setState({
                        armorResultLoading: true,
                  });
                  const searchResults = searchFunction(
                        this.state.selectedValues,
                        this.state.options
                  );
                  searchResults.then(results => {
                        const readable = convertReadable(results);
                        this.setState({
                              armorResults: readable,
                              armorResultLoading: false,
                        });
                  });
            }
      };

      render() {
            return (
                  <div>
                        {this.state.isLoading ? (
                              <div className="drop">
                                    <Segment>
                                          <Dimmer active inverted>
                                                <Loader
                                                      content="Loading"
                                                      size="medium"
                                                />
                                          </Dimmer>
                                          <Image src={simpleImage} />
                                    </Segment>
                              </div>
                        ) : (
                              <div className="drop flex">
                                    <Dropdown
                                          placeholder="Type the skills you would like to search"
                                          fluid
                                          multiple
                                          search
                                          selection
                                          options={this.state.options}
                                          onChange={this.handleChange}
                                    />
                                    <Button
                                          onClick={e =>
                                                this.searchButtonClick(e)
                                          }
                                    >
                                          Search
                                    </Button>
                              </div>
                        )}

                        {this.state.armorResultLoading ? (
                              <div className="drop">
                                    <Segment>
                                          <Dimmer active inverted>
                                                <Loader
                                                      content="Loading"
                                                      size="medium"
                                                />
                                          </Dimmer>
                                          <Image src={simpleImage} />
                                    </Segment>
                              </div>
                        ) : (
                              <div
                                    style={{ marginTop: '10px' }}
                                    className="drop"
                              >
                                    <ArmorResults
                                          value={this.state.armorResults}
                                    />
                              </div>
                        )}
                  </div>
            );
      }
}

export default DropDownSkills;
