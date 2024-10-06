import Home from '~/pages/Home';
import Profile from '~/pages/Profile';
import Login from '~/pages/Login';
import routesConfig from '~/config/routes';
import routesAdmin from '~/config/routesAdmin'
import Register from '~/pages/Register';
import KQHT from '~/pages/KQHT';
import InforStudent from '~/pages/InforStudent';
import QLHS from '~/pages/Admin/QLHS';
import ThemMoiHS from '~/pages/Admin/QLHS/ThemMoiHS';
import QLGV from '~/pages/Admin/QLGV';
import Update from '../pages/Admin/QLHS/Update';
import QLKV from '~/pages/Admin/QLKV';
import UpdateLopHoc from '~/pages/UpdateLopHoc';
import QLN from '~/pages/QLKN/QLN/';
import TMKhoaVien from '~/pages/TMKhoaVien';
import UpdateNganh from '~/pages/QLKN/QLN/UpdateNganh';
import ThemMoiNganh from '~/pages/QLKN/QLN/ThemMoiNganh';
import QLK from '~/pages/QLKN/QLK';
import ThemMoiKhoa from '~/pages/QLKN/QLK/ThemMoiKhoa';
import UpdateKhoa from '~/pages/QLKN/QLK/UpdateKhoa';
import ThemMoiGV from '~/pages/Admin/QLGV/ThemMoiGV';
import QLMH from '~/pages/Admin/QLMH';
import ThemMoiMH from '~/pages/Admin/QLMH/ThemMoiMH';
import UpdateMH from '~/pages/Admin/QLMH/UpdateMonHoc';
import QLTK from '~/pages/Admin/QLTK'
import DSPH from '~/pages/Admin/DSPH';
import ThemMoiPH from '~/pages/Admin/DSPH/ThemMoiPH';
import QLKQHT from '~/pages/Admin/QLKQ';
import ThemMoiLichHoc from '~/pages/Admin/QLKQ/ThemMoiLichHoc';
import DSHSTM from '~/pages/Admin/QLKQ/DSHSTM';
import BDHS from '~/pages/Admin/QLKQ/BangDiemHocSinh';
import UpdateGiaoVien from '~/pages/Admin/QLGV/UpdateGiaoVien';
import DSLCV from '~/pages/GiaoVien/DSLCV';
import DSHSTL from '~/pages/Admin/DSHSTL';
import UpdateDiem from '~/pages/Admin/QLKQ/DSHSTM/UpdateDiem';
import CTDT from '~/pages/Admin/QLMH/CTDT';
import KHHT from '~/pages/Admin/QLMH/KHHT';
import KHHTHS from '~/pages/Admin/QLMH/KHHTHS';
import KHHTCHS from '~/pages/Student/KHHTCHS';
import DKHP from '~/pages/Student/DKHP';
import LichHocHS from '~/pages/Admin/QLKQ/LichHocHS';
import DSN from '~/pages/GiaoVien/DSN';
import HSDRL from '~/pages/Admin/HSDRL';
import CTLVP from '~/pages/Admin/HSDRL/CTLVP';
import TKBGV from '~/pages/Admin/TKBGV/indedx';
import LichGiangDayGV from '~/pages/GiaoVien/LichGiangDayGV';
import LopGiangDay from '~/pages/GiaoVien/LopGiangDay';
import LoiViPham from '~/pages/Admin/HSDRL/LoiViPham';
import Print from '~/pages/Admin/In';
import UpdateThongTin from '~/pages/InforStudent/UpdateThongTin';
import DRLHS from '~/pages/Student/DRLHS';


const publicRoutes = [
    { path: routesConfig.home, component: Home },
    { path: routesConfig.profile, component: Profile },
    { path: routesConfig.login, component: Login, layout: null },
    { path: routesConfig.register, component: Register},
 
    { path: routesConfig.kqht, component: KQHT },
    { path: routesConfig.tths, component: InforStudent },
   
    { path: routesConfig.khhtchs, component: KHHTCHS},
    { path: routesConfig.dkhp, component: DKHP},
    { path: routesConfig.updatett, component: UpdateThongTin},
    { path: routesConfig.drl, component: DRLHS},
];

const privateRoutes = [
    { path: routesAdmin.qlhs, component: QLHS },
    { path: routesAdmin.tmhs, component: ThemMoiHS },
    { path: routesAdmin.qlgv, component: QLGV },
    { path: routesAdmin.edit, component: Update },
    { path: routesAdmin.qlkv, component: QLKV },
    { path: routesAdmin.tm, component: TMKhoaVien },
    { path: routesAdmin.editlh, component: UpdateLopHoc},
    { path: routesAdmin.qln, component: QLN},
    { path: routesAdmin.editkv, component: UpdateNganh},
    { path: routesAdmin.tmn, component: ThemMoiNganh},
    { path: routesAdmin.qlk, component: QLK},
    { path: routesAdmin.tmk, component: ThemMoiKhoa},
    { path: routesAdmin.editkhoa, component: UpdateKhoa},
    { path: routesAdmin.tmgv, component: ThemMoiGV},
    { path: routesAdmin.ttmh, component: QLMH},
    { path: routesAdmin.tmmh, component: ThemMoiMH},
    { path: routesAdmin.editmonhoc, component: UpdateMH},
    { path: routesAdmin.dsph, component: DSPH},
    { path: routesAdmin.tmph, component: ThemMoiPH},
    { path: routesAdmin.dstk, component: QLTK},
    { path: routesAdmin.qlkhht, component: QLKQHT},
    { path: routesAdmin.tmlh, component: ThemMoiLichHoc},
    { path: routesAdmin.dshstm, component: DSHSTM},
    { path: routesAdmin.bdhs, component: BDHS},
    { path: routesAdmin.editgv, component: UpdateGiaoVien},
    { path: routesAdmin.dslcv, component: DSLCV},
    { path: routesAdmin.dshstl, component: DSHSTL},
    { path: routesAdmin.ndhs, component: UpdateDiem},
    { path: routesAdmin.ctdt, component:CTDT},
    { path: routesAdmin.khht, component:KHHT},
    { path: routesAdmin.khhths, component:KHHTHS},
    { path: routesAdmin.lhhs, component:LichHocHS},
    { path: routesAdmin.dsn, component:DSN},
    { path: routesAdmin.diemrenluyen, component:HSDRL},
    { path: routesAdmin.ctlvp, component:CTLVP},
    { path: routesAdmin.tkbgv, component:TKBGV},
    { path: routesAdmin.lgdgv, component:LichGiangDayGV},
    { path: routesAdmin.dslgd, component:LopGiangDay},
    { path: routesAdmin.lvp, component:LoiViPham},
    { path: routesAdmin.in, component:Print},
  




   
];

export { publicRoutes, privateRoutes };
