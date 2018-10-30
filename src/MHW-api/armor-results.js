import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';

class ArmorResults extends Component {
   render() {
      return (
         <div>
            <Form>
               <TextArea
                  placeholder="Armor search results here"
                  style={{ minHeight: 800 }}
               />
            </Form>
         </div>
      );
   }
}

export default ArmorResults;
