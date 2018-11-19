import React from 'react';
import { Form, TextArea } from 'semantic-ui-react';

const ArmorResults = ({ value }) => {
      return (
            <div>
                  <Form>
                        <TextArea
                              placeholder="Armor search results"
                              style={{ minHeight: 750 }}
                              value={value}
                        />
                  </Form>
            </div>
      );
};

export default ArmorResults;