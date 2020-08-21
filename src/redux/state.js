import profileReducer from './profileReducer'; //
import dialogsReducer from './dialogsReducer'; //
import navbarReducer from './navbarReducer'; //

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'Hello, how are u?', countlike: 10 },
                { id: 2, message: 'I am fine', countlike: 3 },
                { id: 4, message: 'will be fine', countlike: 100 }
            ],
            newPostText: ' '
        },
    
        dialogsPage: {
            dialogData: [
                { id: 1, name: 'Artur' },
                { id: 2, name: 'Arsen' },
                { id: 3, name: 'Marine' },
                { id: 4, name: 'Artak' },
                { id: 5, name: 'Irina' },
                { is: 6, name: 'Volod' }
            ],
            
            questionsData: [
                { id: 1, message: 'Hello' },
                { id: 2, message: 'How Are You?' },
                { id: 3, message: 'Yahoo' }
            ],
    
            newQuestionText: ' ',
    
            answersData: [
                { id: 1, message: 'Hi baby' },
                { id: 2, message: 'Fine and you?' },
                { id: 3, message: 'Thanks' }
            ],

            newAnswerText: ' '
        }, 
    
        navbarPage: {
            friends: [ 
                {id: 1, name: 'Andrey'},
                {id: 2, name: 'Yulia'},
                {id: 3, name: 'Jenia'},
                {id: 4, name: 'Aleks'}
            ]
        }
    },
    _rerenderEntireTree() {    
    },

    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._rerenderEntireTree = observer;
    },
    
    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.navbarPage = navbarReducer(this._state.navbarPage, action);

        this._rerenderEntireTree(this._state);


    }
}

export default store; //
window.store = store; //
