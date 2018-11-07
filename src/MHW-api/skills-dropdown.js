import React, { Component } from 'react';
import {
   Dropdown,
   Button,
   Dimmer,
   Loader,
   Image,
   Segment,
} from 'semantic-ui-react';
import { searchFunction, fetchSkills, convertReadable } from '../misc/functions';
import simpleImage from '../misc/images/short-paragraph.png';
import ArmorResults from './armor-results'

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

   searchButtonClick = () => {

    if (this.state.selectedValues.length > 0) {
        
    this.setState({
        armorResultLoading: true
    })    
        const searchResults = searchFunction(this.state.selectedValues)
        searchResults.then(results=> {
            const readable = convertReadable(results)
            this.setState({
                armorResults: readable,
                armorResultLoading: false
            })
        })
    }
   } 

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
               <div className='drop'>
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
                        onClick={(e)=> this.searchButtonClick(e)}
                    >
                        Search
                    </Button>
               </div>
            )}

            {this.state.armorResultLoading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader content="Loading" size="medium" />
                    </Dimmer>
                    <Image src={simpleImage} />
                </Segment>
            ) : (
                <div style={{marginTop: '10px'}}>
                    <ArmorResults value={this.state.armorResults}/>
                </div>
            )}
         </div>
      );
   }
}

export default DropDownSkills;
