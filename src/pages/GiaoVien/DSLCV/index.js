import classNames from 'classnames/bind';
import styles from './DSLCV.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DSHS, DSLH, getKhoa } from '~/redux/apiAdmin/apiAdmin';

import { AccountBoxOutlined,  AutoStoriesRounded } from '@mui/icons-material'
import DataGridDemo from '~/components/Test';
import Button from '~/components/Button';
import config from '~/config';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function DSLCV() {

    const columns = [
        {
          field: 'id',
          headerName: 'STT',
          width: 80,
        },  
        {
            field: 'MaLop',
            headerName: ' Mã lớp',
            width: 154, 
          },
         {
          field: 'LopHocPhan',
          headerName: 'Tên lớp',
          width: 500, 
        },
        {
          field: 'SiSo',
          headerName: 'Sỉ số',
          width: 100,
        },      
        {
            field: 'XemDS',
            headerName: 'Danh sách học sinh',
            width: 250,
            renderCell: (params) => (
              <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleIconClick(params.row)}>
                <AccountBoxOutlined
                  style={{  color: 'blue' }} 
                  
                />
                <span title="Xem chương trình" style={{ marginLeft: '8px' }}>
                  Xem chi tiết
                </span>
              </div>
            ),
          },
          {
            field: 'DRL',
            headerName: 'Điểm rèn luyện',
            width: 250,
            renderCell: (params) => (
              <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleDRLClick(params.row)}>
                <AutoStoriesRounded
                  style={{  color: 'blue' }} 
                  
                />
                <span title="Chỉnh sửa" style={{ marginLeft: '8px' }}>
                  Xem điểm rèn luyện
                </span>
              </div>
            ),
          },
      ];


    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login?.currentUser?.GiaoVien?._id);
    const ChucVu = useSelector((state) => state.auth?.login?.currentUser?.ChucVu?.MaChucVu)||""
    const lop = useSelector((state) => state.dslh?.dslh?.dslh)||""
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs)||""

    // const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""

    const GiaoVienLopHoc = lop.filter((item) => item.GiaoVien === user)
  
    const handleIconClick = (row) => {
        const id = row._id
        navigate(config.routesAdmin.dshstl, { state:{id} });
      };

      const handleDRLClick = (row) => {
        const id = row._id
        navigate(config.routesAdmin.diemrenluyen, { state:{id} });
      };
      const resultArray = [];
      GiaoVienLopHoc.forEach((gvlh, index) => {    
        let count=0
                     hocsinh.forEach((hs) =>{
                         if(hs.LopHoc === gvlh._id){
                             count+=1
                         }
                     })
        
        // Tạo đối tượng mới với dữ liệu đã lọc
        const data = {
          id: index + 1,
          _id: gvlh._id,
          MaLop: gvlh.MaLopHoc,
          LopHocPhan: gvlh.TenLopHoc,
          SiSo: count,  
          
        };
        
        // Thêm vào mảng kết quả
        resultArray.push(data);
      });


    useEffect(() =>{
        
        getKhoa(dispatch)
        DSHS( dispatch)
        DSLH(dispatch)
    },[dispatch])
    
    return ( 
        <div className={cx('wrapperr')}>
        <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                <h2 className={cx('title')}>Danh sách lớp cố vấn</h2>
                <div className={cx('tool')}>             
                          <Button type="text" primary to={config.routes.home}>Quay lại</Button>           
              </div>

        <div>

                <DataGridDemo columns={columns} rows={resultArray} data={[]} check={ChucVu === '2' ? true : false} />
        </div>
                </div>
            </div>
        </div>
       
     );
}

export default DSLCV;