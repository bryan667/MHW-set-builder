import React, { Component } from 'react';
import DropSkills from './dropdown-skills'

class Skills extends Component {

    state = {
        allDropDowns: {
            drop1: {
                currentlySelected: 'none'
            },
            drop2: {
                currentlySelected: 'none'
            },
            drop3: {
                currentlySelected: 'none'
            },
            drop4: {
                currentlySelected: 'none'
            },
            drop5: {
                currentlySelected: 'none'
            }
        }
    }

    handleSelectOption = (event) => {
        
        let tempState = this.state.allDropDowns
        tempState[event.target.name].currentlySelected = event.target.value

        this.setState({
            allDropDowns: tempState
        })
    }

    render() {
        return (
            <div>
                <DropSkills name='drop1' selected={this.state.allDropDowns.drop1.currentlySelected} change={(event) => this.handleSelectOption(event)}/>
                <DropSkills name='drop2' selected={this.state.allDropDowns.drop2.currentlySelected} change={(event) => this.handleSelectOption(event)}/>
                <DropSkills name='drop3' selected={this.state.allDropDowns.drop3.currentlySelected} change={(event) => this.handleSelectOption(event)}/>
                <DropSkills name='drop4' selected={this.state.allDropDowns.drop4.currentlySelected} change={(event) => this.handleSelectOption(event)}/>
                <DropSkills name='drop5' selected={this.state.allDropDowns.drop5.currentlySelected} change={(event) => this.handleSelectOption(event)}/>
                <div>{JSON.stringify(this.state.allDropDowns, null, 2)}</div>
            </div>
        );
    }
}

export default Skills;
