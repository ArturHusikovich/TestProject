import React  from "react";
import profileReducer, { addPostAC } from "./profileReducer";

it(`add post changes length of posts`, () => {
    let action = addPostAC("new post text");
    let state = {
        posts: [
            { id: 1, message: 'Hello, how are u?', countlike: 10 },
            { id: 2, message: 'I am fine', countlike: 3 },
            { id: 4, message: 'will be fine', countlike: 100 }
        ] 
    };

    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(4);
});

it(`change post message`, () => {
    let action = addPostAC("new text");
    let state = {
        posts: [
            { id: 1, message: 'Hello, how are u?', countlike: 10 },
            { id: 2, message: 'I am fine', countlike: 3 },
            { id: 4, message: 'will be fine', countlike: 100 }
        ] 
    };

    let newState = profileReducer(state, action);

    expect(newState.posts[3].message).toBe("new text");
});