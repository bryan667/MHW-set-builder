import React, { Component } from 'react';
import {
      Form,
      TextArea,
      Dimmer,
      Loader,
      Image,
      Segment,
} from 'semantic-ui-react';
import { fetchArmor } from '../misc/functions';
import simpleImage from '../misc/images/short-paragraph.png';

class ArmorList extends Component {
      state = {
            armor: [],
            isLoading: true,
      };

      componentDidMount() {
            const tempState = fetchArmor();

            tempState.then(tempState => {
                  this.setState({
                        armor: tempState,
                        isLoading: false,
                  });
            });
      }

      render() {
            return (
                  <div>
                        {this.state.isLoading ? (
                              <Segment>
                                    <Dimmer active inverted>
                                          <Loader
                                                content="Loading"
                                                size="medium"
                                          />
                                    </Dimmer>
                                    <Image src={simpleImage} />
                              </Segment>
                        ) : (
                              <Form>
                                    <TextArea
                                          placeholder="Armor list"
                                          style={{
                                                minHeight: 700,
                                          }}
                                          value={JSON.stringify(
                                                this.state.armor,
                                                null,
                                                10
                                          )}
                                    />
                              </Form>
                        )}
                  </div>
            );
      }
}

export default ArmorList;
