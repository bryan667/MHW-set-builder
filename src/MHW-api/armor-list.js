import React, { Component } from 'react';
import { Form, TextArea, Dimmer, Loader, Image, Segment } from 'semantic-ui-react'
import simpleImage from '../misc/images/short-paragraph.png'

class ArmorList extends Component {

    state = {
        armor: [],
        isLoading: true
    }

    componentDidMount() {
        
        fetch('http://localhost:3010/api/armor')
        .then(res => res.json())
        .then(data => {
            let tempState = []
    
            data.forEach((armor, keyArmor) => {
            tempState.push(
                {name: armor.name}
            )
    
            tempState[keyArmor].skills = []
    
            armor.skills.forEach((skills, key)=> {
                tempState[keyArmor].skills.push(
                    {
                        slug: skills.slug,
                        level: skills.level,
                        description: skills.description,
                        skillName: skills.skillName
                    }
                )
            })
            })
    
            this.setState({
                armor: tempState,
                isLoading: false
            })
        })

    }


    render() {

        return (
            <div>
                { this.state.isLoading ? 
                    <Segment>
                        <Dimmer active inverted>
                            <Loader content='Loading' size='medium'/>
                        </Dimmer>
                        <Image src={simpleImage} />
                    </Segment>
                
                :
                    <Form>
                        <TextArea placeholder='Armor list'
                        style={{ minHeight: 700 }}
                        value={JSON.stringify(this.state.armor, null, 10)}
                        />
                    </Form>
                }
            </div>
        )
    }
};

export default ArmorList;