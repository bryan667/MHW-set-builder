import React, { Component } from 'react';
import {
   Dropdown,
   Button,
   Dimmer,
   Loader,
   Image,
   Segment,
} from 'semantic-ui-react';
import { searchFunction, fetchSkills } from '../misc/functions';
import simpleImage from '../misc/images/short-paragraph.png';

class DropDownSkills extends Component {
   state = {
      options: [],
      selectedValues: [],
      isLoading: true,
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

      const tempOptions = this.state.options
      const newOptions = []

      tempOptions.forEach((item, key)=> {
        for (let key of value) {
            if (key === item.value) {
                newOptions.push({
                    key: item.key,
                    name: item.name,
                    level: item.level
                })
            }
        }
      })

      this.setState({
         selectedValues: newOptions
      });
   };

   render() {
      return (
         <div>
            {this.state.isLoading ? (
               <Segment>
                  <Dimmer active inverted>
                     <Loader content="Loading" size="medium" />
                  </Dimmer>
                  <Image src={simpleImage} />
               </Segment>
            ) : (
               <div>
                  <Dropdown
                     placeholder="enter search"
                     fluid
                     multiple
                     search
                     selection
                     options={this.state.options}
                     onChange={this.handleChange}
                  />
                  <Button
                     onClick={e => searchFunction(this.state.selectedValues)}
                  >
                     Search
                  </Button>
               </div>
            )}
         </div>
      );
   }
}

export default DropDownSkills;
