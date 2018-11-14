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
      fetchArmor,
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
            armorResultLoading: true,
            armorList: []
      };

      async componentDidMount() {
            const  skillState = await fetchSkills()
            const armorState = await fetchArmor()

            this.setState({
                  options: skillState,
                  isLoading: false,
                  armorList: armorState,
                  armorResultLoading: false
            });
      }

      handleChange = (e, { value }) => {
            this.setState({
                  selectedValues: value,
            });
      };

      searchButtonClick() {                 
            this.setState({
                  armorResultLoading: true,
            });

            setTimeout(()=>{
                  const result = searchFunction(this.state.selectedValues,this.state.options,this.state.armorList)
                  const readable = convertReadable(result)

                  this.setState({
                        armorResults: readable,
                        armorResultLoading: false,
                  })
            }, 0)
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
                                          placeholder="Type the skills to search"
                                          fluid
                                          multiple
                                          search
                                          selection
                                          options={this.state.options}
                                          onChange={this.handleChange}
                                    />
                                    <Button
                                          onClick={this.searchButtonClick.bind(this)}
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
