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
import ArmorResults from './armor-results'
import ArmorList from './armor-list';

class DropDownSkills extends Component {
   state = {
      options: [],
      selectedValues: [],
      isLoading: true,
      ArmorResults:''
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

    const searchResults = searchFunction(this.state.selectedValues)
    
    searchResults.then((awyis)=> {

        let text = `Total Results: ${awyis.length} \n ${(JSON.stringify(awyis, null, 8))}`

        this.setState({
            ArmorResults: text
        })
    })

   } 

   render() {
      return (
         <div className='flex'>
            {this.state.isLoading ? (
                <Segment>
                    <Dimmer active inverted>
                        <Loader content="Loading" size="medium" />
                    </Dimmer>
                    <Image src={simpleImage} />
                </Segment>
            ) : (
               <div className='side margin'>
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
                        onClick={(e)=> this.searchButtonClick(e)}
                    >
                        Search
                    </Button>
                    <div style={{ marginTop: '10px' }}>
                        <ArmorList />
                    </div>
               </div>
            )}
            <div className='side margin'>
                <ArmorResults value={this.state.ArmorResults}/>
            </div>
         </div>
      );
   }
}

export default DropDownSkills;
