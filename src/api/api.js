import * as axios from 'axios';
import Login from '../components/Login/Login';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "f3b8af25-2620-4a77-a44d-50e75da732c9"
    } 
})

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return  instance.get(`users?page=${currentPage}&count=${pageSize}`)
        .then (response => {
            return response.data;
        });
    },
    unfollowUser(userId) {
        return instance.delete(`follow/${userId}`)
        .then (response => {
            return response.data;
        })
    },
    followUser(userId) {
        return instance.post(`follow/${userId}`)
        .then (response => {
            return response.data;
        })
    }
}

export const headerAPI = {
    me() {
        return instance.get(`auth/me`)
        .then (response => {
            return response.data;
        })
    },
    login(email, password, rememberMe, captcha = null) {
        return instance.post(`auth/login`, {email, password, rememberMe, captcha})
        .then (response => {
            return response.data;
        })
    },
    logout() {
        return instance.delete(`auth/login`)
        .then (response => {
            return response.data;
        })
    }
}

export const profileAPI = {
    setProfileData(userId) {
        return instance.get(`profile/` + userId)
    },
    setProfileStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateProfileStatus(status) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(photoFile){
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            } }) 
    },
    saveProfile(profile){
        return instance.put(`profile`, profile)
    }
}

export const securityAPI = {
    getCaptchaURL(){
        return instance.get(`security/get-captcha-url`)
    }
}
