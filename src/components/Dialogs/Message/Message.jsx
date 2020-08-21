import React from 'react';
import classes from './Message.module.css';
import Question from './Question/Question';
import Dialog from './Dialog/Dialog';
import {reduxForm, Field} from 'redux-form';
import {required, maxLength} from '../../../common/validators/validators';
import {FormControl} from '../../../common/FormControl/FormControl';

let maxLength20 = maxLength(20);

const NewMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div><Field component={FormControl} name={'MessageBody'} placeholder={'Type your message'} 
                  validate={[required, maxLength20]} types="textarea"/></div>
      <div><button>Send</button></div>
    </form>
  )
}
const ReduxNewMessageForm = reduxForm({form: 'newMessageForm'})(NewMessageForm)

const Message = (props) => {

  let DialogElements =
    props.dialogData.map((elem) => (<Dialog name={elem.name} />));

  let QuestionsElements =
    props.questionsData.map((elem) => (<Question question={elem.message} />))
    
  const addMessage = (values) => {
      props.addMessageAC(values.MessageBody);
    }

  return (
    <div className={classes.title}>
      <div className={classes.dialogsItems}>
        <div className={classes.title}>Dialogs</div>{DialogElements} 
      </div>
      <div>
        <div>{QuestionsElements}</div>
        <div><ReduxNewMessageForm onSubmit={addMessage} /></div> 
      </div>                                                    
    </div>
  )
}

export default Message;
