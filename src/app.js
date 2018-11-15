import React from 'react';
import Header from './main-page/header'
import DropDownSkills from './main-page/skills-dropdown';
import CollapseMenu from './components/collapse-menu'

const App = () => {
      return (
            <div className='flex'>
                  <div className='nav'>
                        <div className='collapse'>
                              <CollapseMenu />
                        </div>
                  </div>
                  <div className='right'>
                        <div className='drop'>
                              <div style={{marginRight: 20}}>
                                    <Header />
                                    <DropDownSkills />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default App;
