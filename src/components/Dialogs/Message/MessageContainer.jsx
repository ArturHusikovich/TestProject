import React from 'react';
import { addMessageAC } from '../../../redux/dialogsReducer';
import Message from './Message';
import {connect} from 'react-redux';
import { WithAuthRedirect } from '../../../hoc/WithAuthRedirect';
import {compose} from 'redux';

let mapStateToProps = (state) => {
  return {
    questionsData: state.dialogsPage.questionsData,
    newQuestionText: state.dialogsPage.newQuestionText,
    dialogData: state.dialogsPage.dialogData
  }
}


export default compose(
  connect(mapStateToProps, {addMessageAC}),
  WithAuthRedirect
)(Message);


