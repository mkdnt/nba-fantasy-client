import React from 'react';

export default React.createContext({
    posts: [],
    users: [],
    players: [],
    addPost: () => {},
    editPost: () => {},
    deletePost: () => {},
    addPlayer: () => {},
});
