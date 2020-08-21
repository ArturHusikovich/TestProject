const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_QUESTION_TEXT = 'UPDATE_QUESTION_TEXT';

let initial = {
    dialogData: [
        { id: 1, name: 'Artur' },
        { id: 2, name: 'Arsen' },
        { id: 3, name: 'Marine' }
    ],
    
    questionsData: [
        { id: 1, message: 'Hello' },
        { id: 2, message: 'How Are You?' },
        { id: 3, message: 'Yahoo' }
    ]
}

const dialogsReducer = (state = initial, action) => {
    switch(action.type) {
        case ADD_MESSAGE:
            let newMessage = { 
                id: 4, 
                message: action.MessageBody
               };
               return {
                   ...state,
                   questionsData: [...state.questionsData, newMessage]
               }          
        default:
            return state;
    }
}

export const addMessageAC = (MessageBody) => {
    return {type: ADD_MESSAGE, MessageBody}
}

export default dialogsReducer;