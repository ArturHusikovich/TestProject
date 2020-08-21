import React from 'react';
import classes from './Users.module.css';
import userPhoto from '../../assets/images/www.png';
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';
import { usersAPI } from '../../api/api';
import Paginator from '../../common/Paginator/Paginator';


const Users = (props) => {
    
    return (
            <div>
                <div>
                   <Paginator currentPage={props.currentPage} totalUsers={props.totalUsers}
                              pageSize={props.pageSize} onCurrentPageChange={props.onCurrentPageChange} />
                </div> 

                {
                props.users.map((u) => 

                    <div className={classes.item}>
                       
                        <div>
                            {u.followed 
                            ? <button disabled={props.isProgressingArr.some(id => id === u.id)} 
                                      onClick={() => { props.unfollowThunk(u.id) }}> Unfollow </button> 

                            :<button disabled={props.isProgressingArr.some(id => id === u.id)} 
                                     onClick={() => { props.followThunk(u.id) }}>Follow</button>}
                        </div>

                        <div>
                            <div>
                                <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} />
                                </NavLink>
                            </div>
                            {u.name}
                        </div>
                    
                    </div>)
                }
            </div>

            )
        }

        

export default Users;