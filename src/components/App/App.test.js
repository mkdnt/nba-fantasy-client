import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import App from './App';

describe('App Component', () => {
  describe('Snapshot', () => {
    it('renders the UI as expected', () => {
      const update = renderer.create(<BrowserRouter><App /></BrowserRouter>)
        expect(update).toMatchSnapshot()
    })
  })
  
  describe('Smoke test', () => {
    it('Renders without crashing', () => {
      const div = document.createElement('div');
      
      const value = {
        user: {},
        posts: [],
        users: [],
        players: [],
        searchResults: false,
        error: null,
        addPost: () => {},
        editPost: () => {},
        deletePost: () => {},
        addPlayer: () => {},
        deletePlayer: () => {},
        setUser: () => {},
        processLogin: () => {},
        processLogout: () => {},
        handleLoginSuccess: () => {},
        handleRegistrationSuccess: () => {},
        }

      ReactDOM.render(
        <BrowserRouter>
          <UserContext.Provider value={value}>
            <App />
        </UserContext.Provider>
        </BrowserRouter>,
      div);
      ReactDOM.unmountComponentAtNode(div);
    })
  })

});