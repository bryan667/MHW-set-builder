import React, { Component } from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const ArmorResults =({value})=> {
      return (
         <div>
            <Form>
               <TextArea
                  placeholder="Armor search results here"
                  style={{ minHeight: 800 }}
                  value={value}
               />
            </Form>
         </div>
      );
}

export default ArmorResults;