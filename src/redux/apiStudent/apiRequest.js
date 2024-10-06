import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from '../authSlide';
import {
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
    getUserFailed,
    getUserStart,
    getUserSuccess,
} from '../userSlice';
import { getClassFailed, getClassStart, getClassSuccess } from '../Lophoc';
import { getNganhFailed, getNganhStart, getNganhSuccess } from '../Nganh';
import { getKhoaFailed, getKhoaStart, getKhoaSuccess } from '../Khoa';
import { getDiemFailed, getDiemStart, getDiemSuccess } from '../Diem';
export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/auth/login`, user);
        dispatch(loginSuccess(res.data));
        navigate('/');
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const logOut = async (dispatch, navigate, id, accessToken, axiosJWT) => {
    dispatch(logoutStart());
    try {
        await axiosJWT.post(`${process.env.REACT_APP_BASE_URL}/v1/auth/logout`, id, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(logoutSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(logoutFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/auth/register`, user);
        dispatch(registerSuccess());
        navigate('/login');
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (accessToken, dispatch, id) => {
    dispatch(getUserStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/getuser', {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailed);
    }
};

export const getLopHoc = async (accessToken, dispatch, id) => {
    dispatch(getClassStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/getLop', {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getClassSuccess(res.data));
    } catch (err) {
        dispatch(getClassFailed);
    }
};

export const getNganh = async (accessToken, dispatch, id) => {
    dispatch(getNganhStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/getnganh', {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getNganhSuccess(res.data));
    } catch (err) {
        dispatch(getNganhFailed());
    }
};

export const getKhoa = async (accessToken, dispatch, id) => {
    dispatch(getKhoaStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/getkhoa', {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getKhoaSuccess(res.data));
    } catch (err) {
        dispatch(getKhoaFailed());
    }
};

//Lấy điểm
export const getDiem = async (accessToken, dispatch, id) => {
    dispatch(getDiemStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/getdiem', {
            headers: {
                Token: `Bearer ${accessToken}`,
            },
        });
        dispatch(getDiemSuccess(res.data));
    } catch (err) {
        dispatch(getDiemFailed());
    }
};

export const deleteUser = async (accessToken, dispatch, id) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/delete', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Gọi lại hàm getAllUsers để lấy danh sách người dùng cập nhật
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailed());
    }
};
