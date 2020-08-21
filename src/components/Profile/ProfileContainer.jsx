import React from 'react';
import {connect} from 'react-redux';
import { setProfileThunk, setProfileStatusThunk, 
         updateProfileStatusThunk, savePhotoThunk, saveProfileThunk} from'../../redux/profileReducer';
import Profile from './ProfileInfo/Profile'
import { withRouter } from 'react-router-dom';
import { WithAuthRedirect } from '../../hoc/WithAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component{

   refreshProfile(){
      let userId = this.props.match.params.userId;
      if (!userId) {
         userId = this.props.authUserId;
         if(!userId) {
            this.props.history.push("/login");
         }
      }
       this.props.setProfileThunk(userId);
       this.props.setProfileStatusThunk(userId);
   }

   componentDidMount(){
      this.refreshProfile();
   }
   
   componentDidUpdate(prevProps, prevState, snapshot){  //ayl profile-ic mer profile enq ancnum ev ejy tarmacnum
      if(this.props.match.params.userId != prevProps.match.params.userId )
      this.refreshProfile();
   }

   render() {    
      return (
          <Profile {...this.props} profile={this.props.profile}
                                   updateProfileStatusThunk={this.props.updateProfileStatusThunk}
                                   isOwner={!this.props.match.params.userId}
                                   savePhotoThunk={this.props.savePhotoThunk} />
      )
   }
 }

 let mapStateToProps = (state) => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status,
   authUserId: state.auth.id
});

 export default compose(                          
   connect(mapStateToProps, {setProfileThunk, setProfileStatusThunk, updateProfileStatusThunk, 
           savePhotoThunk, saveProfileThunk}),     
    withRouter,                                 
    WithAuthRedirect                                
 )(ProfileContainer);                        

