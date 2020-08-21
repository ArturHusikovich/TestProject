import React from 'react';
import classes from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from 'redux-form';
import {required, maxLength} from '../../../common/validators/validators';
import {FormControl} from '../../../common/FormControl/FormControl';
import {connect} from "react-redux";
import {addPostAC} from '../../../redux/profileReducer';

let maxLength10 = maxLength(10);

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
        <div>
          <Field component={FormControl} name={"PostBody"} placeholder={"Type your post"}
                 validate={[required, maxLength10]} types={"textarea"}/>
        </div>

        <div>
          <button>Add Post</button>
        </div>
    </form>
  )
}

const ReduxAddPostForm = reduxForm({form: "AddPostForm"})(AddPostForm); 

const MyPosts = React.memo( (props) => {

  let postelem = props.posts.map( (elem) => <Post message={elem.message} countlike={elem.countlike} />);

  let AddNewPost = (values) => {
    props.addPostAC(values.PostBody);
  }

  return (
    <div className={classes.title}>
      My Posts {props.count}
      <div>
        <ReduxAddPostForm onSubmit={AddNewPost} />
      </div>
      <div className={classes.area}>
        {postelem} 
      </div>
    </div>
  );
} )

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts
  }
}

export default connect(mapStateToProps, {addPostAC})(MyPosts);
