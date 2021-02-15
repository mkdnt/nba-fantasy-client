import React from 'react';

export default React.createContext({
    posts: [],
    users: [],
    players: [],
    allPlayers: [],
    searchResults: false,
    addPost: () => {},
    editPost: () => {},
    deletePost: () => {},
    addPlayer: () => {},
});
