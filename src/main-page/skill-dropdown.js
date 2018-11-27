import React from 'react';
import { Dropdown } from 'semantic-ui-react';

const DropdownSkills = ({options, onChange}) => {
    return (
        <Dropdown
            placeholder="Type the skills to search"
            fluid
            multiple
            search
            selection
            options={options}
            onChange={onChange}
        />
    )

}

export default DropdownSkills