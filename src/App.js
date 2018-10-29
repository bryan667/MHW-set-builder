import React, { Component } from 'react';
// import Skills from './MHW-api/skills'
import DropDownSkills from './MHW-api/dropdown-skills2'

class App extends Component {

    state = {

    }

    render() {
        return (
            <div>
                {/* <Skills /> */}
                <DropDownSkills />
            </div>
        )
    }
}

export default App;
