import React from 'react';
import ProfileInfo from './ProfileInfo';
import MyPosts from '../MyPosts/MyPosts';


const Profile = (props) => {
   
    return (
       <div>
        <ProfileInfo profile={props.profile} 
                     status={props.status} 
                     updateProfileStatusThunk={props.updateProfileStatusThunk}
                     isOwner={props.isOwner} 
                     savePhotoThunk={props.savePhotoThunk}
                     saveProfileThunk={props.saveProfileThunk} />
        <MyPosts />
       </div>
    )
 }

 export default Profile;