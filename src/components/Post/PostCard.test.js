import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import {BrowserRouter} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import PostCard from './PostCard';

describe('PostCard Component', () => {
  describe('Snapshot', () => {
    it('renders the UI as expected', () => {
      const update = renderer.create(<BrowserRouter><PostCard /></BrowserRouter>)
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
            <PostCard />
        </UserContext.Provider>
        </BrowserRouter>,
      div);
      ReactDOM.unmountComponentAtNode(div);
    })
  })

});