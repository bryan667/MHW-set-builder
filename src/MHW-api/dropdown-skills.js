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
      this.setState({
         selectedValues: value,
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
                     value={this.state.selectedValues}
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
