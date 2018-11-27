import React from 'react';
import Header from './main-page/header'
import MainPage from './main-page/index';
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
                                    <MainPage />
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default App;
