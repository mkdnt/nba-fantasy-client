import React from 'react';

export default React.createContext({
    posts: [],
    addPost: () => {},
    editPost: () => {},
    deletePost: () => {},
});
