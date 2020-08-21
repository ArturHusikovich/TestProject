import React from 'react';
import classes from './ProfileInfo.module.css';
import Preloader from '../../../common/preloader/Preloader';
import Status from './Status';
import StatusWithHook from './StatusWithHook';
import userPhoto from '../../../assets/images/www.png';
import { useState } from 'react';
import ReduxProfileDataForm from './ProfileDataForm';

const ProfileInfo = (props) => {
   const [editMode, setEditMode] = useState(false);

   const onSubmit = (values) => {
      props.saveProfileThunk(values).then(() => {
         setEditMode(false);
      }) 
  }

   if (!props.profile){
      return <Preloader />
   }

   const onPhotoChange = (e) => {
      if(e.target.files.length) {
         props.savePhotoThunk(e.target.files[0]);
      }
   }

    return (
       <div className={classes.flex}>
           <div>
               <div className={classes.item}>
                  <img src={props.profile.photos.large || userPhoto} className={classes.mainPhoto}/>
               </div>
               <div>
                  {props.isOwner && <input type={"file"} onChange={onPhotoChange} />}
               </div>
               <div>
                  <b>Status:</b> <Status status={props.status}
                        updateProfileStatusThunk={props.updateProfileStatusThunk} />
               </div>
               <div>
                  <StatusWithHook status={props.status}
                                 updateProfileStatusThunk={props.updateProfileStatusThunk} />
               </div>
            </div>
            
            <div>

            { editMode 
               ? <ReduxProfileDataForm {...props} onSubmit={onSubmit} initialValues={props.profile} /> 
               : <ProfileData goToEditMode={() => {setEditMode(true)}} {...props}/>}
         
            </div>
            
       </div>
    )
 }

 const ProfileData = (props) => {
    return (
       <div>
          {props.isOwner && <div><button onClick={props.goToEditMode}>Edit</button></div>}

            <div>
                  <b>Full Name:</b> {props.profile.fullName}
               </div>
               <div>
                  <b>Looking For Job:</b> {props.profile.lookingForAJob ? "Yes" : "No"} 
               </div>
               <div>
                  <b>My Skills:</b> {props.profile.lookingForAJobDescription} 
               </div>
               <div>
                  <b>About me:</b> {props.profile.aboutMe} 
               </div>
               <div>
                  <b>Contacts:</b> {Object.keys(props.profile.contacts).map((key) => {
                  return <Contacts key={key} contactKey={key} contactValue={props.profile.contacts[key]} /> })}
               </div>
       </div>
    )
 }


 const Contacts = ({contactKey, contactValue}) => {
    return (
    <div className={classes.contact}><b>{contactKey}</b>: {contactValue}</div>
    )
 }

  export default ProfileInfo;