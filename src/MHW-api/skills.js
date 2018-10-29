import React, { Component } from 'react';
import DropSkills from './dropdown-skills'

class Skills extends Component {

    state = {
        data: []
    }

    componentDidMount(){
        fetch('http://localhost:3010/api/skills')
        .then(res => res.json())
        .then(data =>             
            {
                this.setState({
                    data: data
                })
            }
        
        )
    }

    render() {
        return (
            <div>
                <DropSkills items={this.state.data}/>
                <textarea rows="30" cols="50" value={JSON.stringify(this.state.data, null, 2)}>
                </textarea>
            </div>
        );
    }
}

export default Skills;
