import React, { Component } from 'react';

class DropSkills extends Component {

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
                {(this.state.data.length >= 1) ?
                    <div>
                        <select name={this.props.name} value={this.props.selected} onChange={(event) => this.props.change(event)}>
                            <option value='none'> -- select an option -- </option>
                                {this.state.data.map((data, datakey) => (
                                    data.ranks.map((ranks, rankskey) => (
                                        <option key={rankskey} value={ranks.slug}>
                                        {ranks.slug}                                 
                                        </option>
                                    ))
                                ))}
                        </select>
                        {/* <textarea rows="30" cols="50" value={JSON.stringify(this.state.data, null, 2)}>
                        </textarea> */}
                    </div>
                :
                ''
                }
            </div>
        );
    }
}

export default DropSkills;
