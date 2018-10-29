import React, { Component } from 'react';

class DropSkills extends Component {

    state = {
        currentlySelected: 'none'
    }

    handleSelectOption = (event) => {
        
        this.setState({
            currentlySelected: event.target.value
        })
    }

    render() {
        return (
            <div>
                {(this.props.items.length >= 1) ?
                    <div>
                        {console.log(this.props.items)}
                        <select value={this.state.currentlySelected} onChange={(event) => this.handleSelectOption(event)}>
                            <option selected value='none'> -- select an option -- </option>
                                {this.props.items.map((data, datakey) => (
                                    data.ranks.map((ranks, rankskey) => (
                                        <option key={rankskey} value={ranks.slug}>
                                        {ranks.slug}                                 
                                        </option>
                                    ))
                                ))}
                        </select>
                        <div>{JSON.stringify(this.state)}</div>
                    </div>
                :
                ''
                }
            </div>
        );
    }
}

export default DropSkills;
