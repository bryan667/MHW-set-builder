import React from 'react';
import DropDownSkills from './MHW-api/dropdown-skills'
import ArmorList from './MHW-api/armor-list'
import ArmorResults from './MHW-api/armor-results'

const App = () => {
    return (
        <div>
            <div className='flex'>
                <div className='side margin'>
                    <DropDownSkills />
                    <div style={{marginTop: '10px'}}>
                        <ArmorList/>
                    </div>
                </div>
                <div className='side margin'>
                    <ArmorResults />
                </div>
            </div>
        </div>
    );
};

export default App;