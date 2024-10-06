import axios from 'axios';
import {
    getDSHSStart,
    getDSHSSuccess,
    getDSHSFailed,
    TMHSFailed,
    TMHSStart,
    TMHSSuccess,
    getNGANHStart,
    getNGANHSuccess,
    getNGANHFailed,
    getKhoaStart,
    getKhoaSuccess,
    getKhoaFailed,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
    UpdateStart,
    UpdateSuccess,
    UpdateFailed,
    UpdateNganhStart,
    UpdateNganhSuccess,
    UpdateNganhFailed,
    TMNStart,
    TMNSuccess,
    TMNFailed,
    deleteNganhStart,
    deleteNganhSuccess,
    deleteNganhFailed,
    TMKStart,
    TMKSuccess,
    TMKFailed,
    UpdateKhoaStart,
    UpdateKhoaSuccess,
    UpdateKhoaFailed,
    deleteKhoaStart,
    deleteKhoaSuccess,
    deleteKhoaFailed,
} from '../DSHS';

import {
    getGiaoVienStart,
    getGiaoVienSuccess,
    getGiaoVienFailed,
    TMGVStart,
    TMGVSuccess,
    TMGVFailed,
    deleteGiaoVienStart,
    deleteGiaoVienSuccess,
    deleteGiaoVienFailed,
    UpdateGiaoVienStart,
    UpdateGiaoVienSuccess,
    UpdateGiaoVienFailed,
} from '../GiaoVien';

import {
    getDSLHStart,
    getDSLHSuccess,
    getDSLHFailed,
    deleteCLassStart,
    deleteCLassSuccess,
    deleteCLassFailed,
    UpdateClassStart,
    UpdateClassSuccess,
    UpdateClassFailed,
} from '../DSLH';
import {
    getMonHocStart,
    getMonHocSuccess,
    getMonHocFailed,
    TMMHStart,
    TMMHSuccess,
    TMMHFailed,
    UpdateMonHocStart,
    UpdateMonHocSuccess,
    UpdateMonHocFailed,
    deleteMonHocStart,
    deleteMonHocSuccess,
    deleteMonHocFailed,
} from '../MonHoc';

import {
    getPhuHuynhStart,
    getPhuHuynhSuccess,
    getPhuHuynhFailed,
    TMPHStart,
    TMPHSuccess,
    TMPHFailed,
} from '../PhuHuynh';
import { TMLHFailed, TMLHStart, TMLHSuccess } from '../Lophoc';

import { getAccountStart, getAccountSuccess, getAccountFailed } from '../Account';

import { getVienChucFailed, getVienChucStart, getVienChucSuccess } from '../VienChuc';

import {
    getLichHocStart,
    getLichHocSuccess,
    getLichHocFailed,
    TMLichHocStart,
    TMLichHocSuccess,
    TMLichHocFailed,
    deleteLichHocStart,
    deleteLichHocSuccess,
    deleteLichHocFailed,
} from '../LichHoc';

import { getNamHocStart, getNamHocSuccess, getNamHocFailed } from '../NamHoc';

import { getHocKyStart, getHocKySuccess, getHocKyFailed } from '../HocKy';

import {
    getHSTLHStart,
    getHSTLHSuccess,
    getHSTLHFailed,
    TMLHHSStart,
    TMLHHSSuccess,
    TMLHHSFailed,
    deleteHSLHStart,
    deleteHSLHSuccess,
    deleteHSLHFailed,
} from '../HSLH';

import {
    getDiemTheoMonStart,
    getDiemTheoMonSuccess,
    getDiemTheoMonFailed,
    TMDiemStart,
    TMDiemSuccess,
    TMDiemFailed,
} from '../Diem';

import { getLoaiDiemStart, getLoaiDiemSuccess, getLoaiDiemFailed } from '../LoaiDiem';

import { getHSMHStart, getHSMHSuccess, getHSMHFailed, TMHSMHStart, TMHSMHSuccess, TMHSMHFailed } from '../HSMH';

import {
    getLoiViPhamStart,
    getLoiViPhamSuccess,
    getLoiViPhamFailed,
    deleteLoiViPhamStart,
    deleteLoiViPhamSuccess,
    deleteLoiViPhamFailed,
} from '../LoiViPham';

import { TMLVPStart, TMLVPSuccess, TMLVPFailed } from '../TMLVP';

import { getDiemRenLuyenFailed, getDiemRenLuyenStart, getDiemRenLuyenSuccess } from '../DRL';
import { TMDRLFailed, TMDRLStart, TMDRLSuccess } from '../TMDRL';
import { TMManyFailed, TMManyStart, TMManySuccess } from '../DiemMany';
export const DSHS = async (dispatch) => {
    dispatch(getDSHSStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/DSHS`);
        dispatch(getDSHSSuccess(res.data));
    } catch (err) {
        dispatch(getDSHSFailed());
    }
};

export const DSLH = async (dispatch) => {
    dispatch(getDSLHStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/getLop`);
        dispatch(getDSLHSuccess(res.data));
    } catch (err) {
        dispatch(getDSLHFailed());
    }
};

export const TMHS = async (user, dispatch) => {
    dispatch(TMHSStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/Students/create`, user);
        dispatch(TMHSSuccess());
        //    navigate("/quan-ly-hoc-sinh")
    } catch (err) {
        dispatch(TMHSFailed());
    }
};

export const TMHSMH = async (user, dispatch) => {
    dispatch(TMHSMHStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/HSMH/create`, user);
        dispatch(TMHSMHSuccess());
    } catch (err) {
        dispatch(TMHSMHFailed());
    }
};

export const TMHSLH = async (user, dispatch) => {
    dispatch(TMLHHSStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/HSLH/create`, user);
        dispatch(TMLHHSSuccess());
    } catch (err) {
        dispatch(TMLHHSFailed());
    }
};

export const TMLH = async (user, dispatch, navigate) => {
    dispatch(TMLHStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/LopHoc/create`, user);
        dispatch(TMLHSuccess());
        navigate('/quan-ly-khoa-vien');
    } catch (err) {
        dispatch(TMLHFailed());
    }
};

export const TMDiem = async (user, dispatch) => {
    dispatch(TMDiemStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/Diem/create`, user);
        dispatch(TMDiemSuccess());
    } catch (err) {
        dispatch(TMDiemFailed());
    }
};

export const TMMonHoc = async (user, dispatch, navigate) => {
    dispatch(TMMHStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/MonHoc/create`, user);
        dispatch(TMMHSuccess());
    } catch (err) {
        dispatch(TMMHFailed());
    }
};

export const TMN = async (user, dispatch, navigate) => {
    dispatch(TMNStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/Nganh/create`, user);
        dispatch(TMNSuccess());
        navigate('/quan-ly-khoa-vien');
    } catch (err) {
        dispatch(TMNFailed());
    }
};

export const TMLVP = async (user, dispatch) => {
    dispatch(TMLVPStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/loivipham/create`, user);
        dispatch(TMLVPSuccess());
    } catch (err) {
        dispatch(TMLVPFailed());
    }
};

export const TMDRL = async (user, dispatch) => {
    dispatch(TMDRLStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/diemrenluyen/create`, user);
        dispatch(TMDRLSuccess());
    } catch (err) {
        dispatch(TMDRLFailed());
    }
};

export const TMK = async (user, dispatch, navigate) => {
    dispatch(TMKStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/Khoa/create`, user);
        dispatch(TMKSuccess());
        navigate('/quan-ly-khoa-vien');
    } catch (err) {
        dispatch(TMKFailed());
    }
};

export const TMGVien = async (user, dispatch) => {
    dispatch(TMGVStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/Teachers/create`, user);
        dispatch(TMGVSuccess());
    } catch (err) {
        dispatch(TMGVFailed());
    }
};

export const ThemMoiPhuHuynh = async (user, dispatch) => {
    dispatch(TMPHStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/PhuHuynh/create`, user);
        dispatch(TMPHSuccess());
    } catch (err) {
        dispatch(TMPHFailed());
    }
};

export const TMLichHoc = async (user, dispatch, navigate) => {
    dispatch(TMLichHocStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/LichHoc/create`, user);
        dispatch(TMLichHocSuccess());
    } catch (err) {
        dispatch(TMLichHocFailed());
    }
};

export const getNGANH = async (dispatch) => {
    dispatch(getNGANHStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/getNganh`);
        dispatch(getNGANHSuccess(res.data));
    } catch (err) {
        dispatch(getNGANHFailed());
    }
};

export const getKhoa = async (dispatch) => {
    dispatch(getKhoaStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/getKhoa`);
        dispatch(getKhoaSuccess(res.data));
    } catch (err) {
        dispatch(getKhoaFailed());
    }
};

export const getHSTLH = async (dispatch) => {
    dispatch(getHSTLHStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/hstlh`);
        dispatch(getHSTLHSuccess(res.data));
    } catch (err) {
        dispatch(getHSTLHFailed());
    }
};

export const getNamHoc = async (dispatch) => {
    dispatch(getNamHocStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/namhoc`);
        dispatch(getNamHocSuccess(res.data));
    } catch (err) {
        dispatch(getNamHocFailed());
    }
};

export const getHocKy = async (dispatch) => {
    dispatch(getHocKyStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/hocky`);
        dispatch(getHocKySuccess(res.data));
    } catch (err) {
        dispatch(getHocKyFailed());
    }
};

export const getDiem = async (dispatch) => {
    dispatch(getDiemTheoMonStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/diem`);
        dispatch(getDiemTheoMonSuccess(res.data));
    } catch (err) {
        dispatch(getDiemTheoMonFailed());
    }
};

export const getMonHoc = async (dispatch) => {
    dispatch(getMonHocStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/monhoc`);
        dispatch(getMonHocSuccess(res.data));
    } catch (err) {
        dispatch(getMonHocFailed());
    }
};

export const getPhuHuynh = async (dispatch) => {
    dispatch(getPhuHuynhStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/phuhuynh`);
        dispatch(getPhuHuynhSuccess(res.data));
    } catch (err) {
        dispatch(getPhuHuynhFailed());
    }
};

export const getDRL = async (dispatch) => {
    dispatch(getDiemRenLuyenStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/diemrenluyen`);
        dispatch(getDiemRenLuyenSuccess(res.data));
    } catch (err) {
        dispatch(getDiemRenLuyenFailed());
    }
};

export const getAccount = async (dispatch) => {
    dispatch(getAccountStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/account`);
        dispatch(getAccountSuccess(res.data));
    } catch (err) {
        dispatch(getAccountFailed());
    }
};

export const getLichHoc = async (dispatch) => {
    dispatch(getLichHocStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/lichhoc`);
        dispatch(getLichHocSuccess(res.data));
    } catch (err) {
        dispatch(getLichHocFailed());
    }
};

export const getLoaiDiem = async (dispatch) => {
    dispatch(getLoaiDiemStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/loaidiem`);
        dispatch(getLoaiDiemSuccess(res.data));
    } catch (err) {
        dispatch(getLoaiDiemFailed());
    }
};

export const getVC = async (dispatch) => {
    dispatch(getVienChucStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/vienchuc`);
        dispatch(getVienChucSuccess(res.data));
    } catch (err) {
        dispatch(getVienChucFailed());
    }
};

export const getLoiViPham = async (dispatch) => {
    dispatch(getLoiViPhamStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/loivipham`);
        dispatch(getLoiViPhamSuccess(res.data));
    } catch (err) {
        dispatch(getLoiViPhamFailed());
    }
};

export const getHSMH = async (dispatch) => {
    dispatch(getHSMHStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/hsmh`);
        dispatch(getHSMHSuccess(res.data));
    } catch (err) {
        dispatch(getHSMHFailed());
    }
};

export const UpdateUser = async (user, dispatch, navigate, id) => {
    dispatch(UpdateStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/update', user);
        dispatch(UpdateSuccess(res.data));
        navigate('/quan-ly-hoc-sinh');
    } catch (err) {
        dispatch(UpdateFailed());
    }
};

export const UpdateLH = async (user, dispatch, navigate, id) => {
    dispatch(UpdateClassStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/updatelophoc', user);
        dispatch(UpdateClassSuccess(res.data));
        navigate('/quan-ly-khoa-vien');
    } catch (err) {
        dispatch(UpdateClassFailed());
    }
};

export const UpdateNganhHoc = async (user, dispatch, navigate, id) => {
    dispatch(UpdateNganhStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/updatenganh', user);
        dispatch(UpdateNganhSuccess(res.data));
        navigate('/quan-ly-nganh');
    } catch (err) {
        dispatch(UpdateNganhFailed());
    }
};

export const UpdateKhoa = async (user, dispatch, navigate, id) => {
    dispatch(UpdateKhoaStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/updatekhoa', user);
        dispatch(UpdateKhoaSuccess(res.data));
        navigate('/quan-ly-khoa');
    } catch (err) {
        dispatch(UpdateKhoaFailed());
    }
};

export const UpdateMonHoc = async (user, dispatch, navigate, id) => {
    dispatch(UpdateMonHocStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/updatemonhoc', user);
        dispatch(UpdateMonHocSuccess(res.data));
        navigate('/thong-tin-mon-hoc');
    } catch (err) {
        dispatch(UpdateMonHocFailed());
    }
};

export const deleteUser = async (accessToken, dispatch, id) => {
    dispatch(deleteUserStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/${id}/delete`, {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteUserSuccess(res.data));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteUserFailed(errorMessage));
    }
};

export const deleteLopHoc = async (accessToken, dispatch, id) => {
    dispatch(deleteCLassStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/deleteLopHoc', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteCLassSuccess(res.data));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteCLassFailed(errorMessage));
    }
};

export const deleteHSLH = async (accessToken, dispatch, id) => {
    dispatch(deleteHSLHStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/deletehslh', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteHSLHSuccess(res.data));
    } catch (err) {
        dispatch(deleteHSLHFailed(err.response.data));
    }
};

export const deleteNganh = async (accessToken, dispatch, id) => {
    dispatch(deleteNganhStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/deletenganh', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteNganhSuccess(res.data));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteNganhFailed(errorMessage));
    }
};

export const deleteLoiViPham = async (accessToken, dispatch, id) => {
    dispatch(deleteLoiViPhamStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/deleteloivipham', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        dispatch(deleteLoiViPhamSuccess(res.data));
    } catch (err) {
        dispatch(deleteLoiViPhamFailed());
    }
};

export const deleteKhoa = async (accessToken, dispatch, id) => {
    dispatch(deleteKhoaStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/deletekhoa', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteKhoaSuccess(res.data));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteKhoaFailed(errorMessage));
    }
};

export const GiaoVien = async (dispatch) => {
    dispatch(getGiaoVienStart());
    try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/v1/admin/giaovien`);
        dispatch(getGiaoVienSuccess(res.data));
    } catch (err) {
        dispatch(getGiaoVienFailed());
    }
};

export const deleteGiaoVien = async (accessToken, dispatch, id) => {
    dispatch(deleteGiaoVienStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/deletegiaovien', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteGiaoVienSuccess(res.data));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteGiaoVienFailed(errorMessage));
    }
};

export const deleteMonHoc = async (accessToken, dispatch, id) => {
    dispatch(deleteMonHocStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/deletemonhoc', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        // Kiểm tra mã trạng thái
        if (res.status === 200) {
            dispatch(deleteMonHocSuccess(res.data));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteMonHocFailed(errorMessage));
    }
};

export const deleteLichHoc = async (accessToken, dispatch, id) => {
    dispatch(deleteLichHocStart());
    try {
        const res = await axios.delete(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/deletelichhoc', {
            headers: {
                token: `Bearer ${accessToken}`,
            },
        });
        if (res.status === 200) {
            dispatch(deleteLichHocSuccess(res.data));
        } else {
            throw new Error('Unexpected response code: ' + res.status);
        }
    } catch (err) {
        // Kiểm tra err.response
        const errorMessage = err.response ? err.response.data : 'An unexpected error occurred';
        dispatch(deleteLichHocFailed(errorMessage));
    }
};

export const UpdateGiaoVien = async (user, dispatch, navigate, id) => {
    dispatch(UpdateGiaoVienStart());
    try {
        const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/v1/user/` + id + '/updategiaovien', user);
        dispatch(UpdateGiaoVienSuccess(res.data));
        navigate('/quan-ly-giao-vien');
    } catch (err) {
        dispatch(UpdateGiaoVienFailed());
    }
};
//

export const TMDMANY = async (diemMany, dispatch) => {
    dispatch(TMManyStart());
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/diemmany/create`, diemMany);
        dispatch(TMManySuccess());
    } catch (err) {
        dispatch(TMManyFailed());
    }
};
