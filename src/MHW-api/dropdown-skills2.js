import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'

class DropDownSkills extends Component {

    state = {
        options: [
            { key: 'angular', text: 'Angular', value: 'angular' },
        ]
    }

    componentDidMount(){
        fetch('http://localhost:3010/api/skills')
        .then(res => res.json())
        .then(data =>             
            {
                let tempState = this.state.options
                // data.forEach((skill, keySkill)=> {
                //     data.forEach((rank, key)=> {
                //     tempState[key].key = data[keySkill].ranks[key].slug
                // })

                this.setState({
                    options: tempState
                })
            }        
        )
    }

    render() {
        return (
            <div>
                {console.log(this.state)}
                <Dropdown placeholder='Skills' fluid multiple selection options={this.state.options} />
            </div>
        );
    }
}

export default DropDownSkills;