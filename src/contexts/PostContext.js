import React from 'react';

export default React.createContext({
    posts: [],
    users: [],
    addPost: () => {},
    editPost: () => {},
    deletePost: () => {},
});
