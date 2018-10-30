import React, { Component } from 'react';
import { Dropdown, Button } from 'semantic-ui-react'
import { searchFunction } from '../misc/functions'

class DropDownSkills extends Component {

    state = {
        options: [],
        selectedValues: []
    }

    componentDidMount() {
        fetch('http://localhost:3010/api/skills')
        .then(res => res.json())
        .then(data => {
                let tempState = this.state.options

                data.forEach((skill, keySkill) => {
                    
                skill.ranks.forEach((rank, key)=> {
                tempState.push(
                    {key: data[keySkill].ranks[key].slug,
                    text: data[keySkill].ranks[key].slug,
                    value: data[keySkill].ranks[key].skillName}
                    )
                })

                this.setState({
                    options: tempState
                })

                })
            })
    }

    handleChange = (e, {value}) => {

        this.setState({
            selectedValues: value
        })
    }



    render() {
        return (
            <div className='half'>
                <Dropdown placeholder='enter search' 
                fluid multiple search selection options={this.state.options}
                onChange={this.handleChange}
                value={this.state.selectedValues}
                />
                <Button onClick={(e) => searchFunction(this.state.selectedValues)}>Search</Button>
            </div>
        );
    }
}

export default DropDownSkills;