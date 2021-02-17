import React from 'react';

export default React.createContext({
    user: {},
    posts: [],
    users: [],
    players: [],
    searchResults: false,
    addPost: () => {},
    editPost: () => {},
    deletePost: () => {},
    addPlayer: () => {},
    deletePlayer: () => {},
});



