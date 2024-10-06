import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlide';
import userReducer from './userSlice';
import ClassReducer from './Lophoc';
import NganhReducer from './Nganh';
import KhoaReducer from './Khoa';
import HSLHReducer from './HSLH';
import DiemReducer from './Diem';
import dshsReducer from './DSHS';
import dslhReducer from './DSLH';
import giaovienReducer from './GiaoVien';
import monhocReducer from './MonHoc';
import phuhuynhReducer from './PhuHuynh';
import accountReducer from './Account';
import vienchucReducer from './VienChuc';
import lichhocReducer from './LichHoc';
import namhocReducer from './NamHoc';
import hockyReducer from './HocKy';
import loaidiemReducer from './LoaiDiem';
import hsmhReducer from './HSMH';
import loiviphamReducer from './LoiViPham';
import tmloiviphamReducer from './TMLVP';
import diemrenluyenReducer from './DRL';
import tmdiemrenluyenReducer from './TMDRL';
import tmdiemmanyReducer from './DiemMany';

import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    class: ClassReducer,
    nganh: NganhReducer,
    khoa: KhoaReducer,
    hslh: HSLHReducer,
    diem: DiemReducer,
    dshs: dshsReducer,
    dslh: dslhReducer,
    gv: giaovienReducer,
    monhoc: monhocReducer,
    phuhuynh: phuhuynhReducer,
    account: accountReducer,
    vienchuc: vienchucReducer,
    lichhoc: lichhocReducer,
    namhoc: namhocReducer,
    hocky: hockyReducer,
    loaidiem: loaidiemReducer,
    hsmh: hsmhReducer,
    loivipham: loiviphamReducer,
    tmloivipham: tmloiviphamReducer,
    diemrenluyen: diemrenluyenReducer,
    tmdrl: tmdiemrenluyenReducer,
    tmdmany: tmdiemmanyReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
