import classNames from 'classnames/bind';
import styles from './QLKV.module.scss';

import config from '~/config';
import { useDispatch,useSelector } from 'react-redux';
import { GiaoVien } from '~/redux/apiAdmin/apiAdmin';
import {  DSHS,  DSLH, getKhoa, getNGANH} from '~/redux/apiAdmin/apiAdmin';
import { useEffect, useState} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { AccountBoxOutlined, AutoStoriesRounded, Edit } from '@mui/icons-material';

import DataGridDemo from '~/components/Test';
import DeleteLopHoc from './DeleteLopHoc';
import Button from '~/components/Button';
const cx = classNames.bind(styles);



function QLKV() {

  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'MaLopHoc',
      headerName: 'Mã lớp học',
      width: 100,
    
    },
    {
      field: 'TenLop',
      headerName: 'Tên lớp học',
      width: 250,
    },
    {
      field: 'SiSo',
      headerName: 'Sỉ số',
      width: 100,
    
    },
    {
      field: 'GVCV',
      headerName: 'Giảng viên cố vấn',
      width: 200,
    },
    {
      field: 'TenNganh',
      headerName: 'Tên ngành',
      width: 250,
    },
    {
      field: 'TenKhoa',
      headerName: 'Tên khoa',
      width: 200,
    },
    {
      field: 'ChucNang',
      headerName: 'Chức năng',
      width: 200,
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
      field: 'ChinhSua',
      headerName: 'Chỉnh sửa thông tin',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleEditClick(params.row)}>
          <Edit
            style={{  color: 'blue' }} 
            
          />
          <span title="Chỉnh sửa" style={{ marginLeft: '8px' }}>
            Chỉnh sửa thông tin
          </span>
        </div>
      ),
    },
    {
      field: 'DRL',
      headerName: 'Điểm rèn luyện',
      width: 200,
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
 
  const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs)||""
  const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
  const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
  const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien)||""
  const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)||""

  const navigate = useNavigate()

  const handleEditClick = (row) => {
    const id = row._id
    navigate(config.routesAdmin.editlh, { state:{id} });
  };

  const handleDRLClick = (row) => {
    const id = row._id
    navigate(config.routesAdmin.diemrenluyen, { state:{id} });
  };

  const [onCancel, setOncancel] = useState(false)

  
    function handleUpdateDiemCancel() {
      setOncancel(false);
    }
    const  handleClickCancel = () => {
      setOncancel(true);
    }

    const [selectedIDs, setSelectedIDs] = useState([]); // Mảng để lưu các ID đã chọn
    const handleIDChange = (value) => {
      // Kiểm tra xem ID đã có trong mảng chưa
      if (selectedIDs.includes(value)) {
          // Nếu có, xóa ID khỏi mảng
          setSelectedIDs(prevIDs => prevIDs.filter(id => id !== value));
      } else {
          // Nếu chưa có, thêm ID vào mảng
          setSelectedIDs(prevIDs => [...prevIDs, value]);
      }
  };
  const handleIconClick = (row) => {
      const id = row._id
    navigate(config.routesAdmin.dshstl, { state:{id} }); // Gửi id đến trang B
  };




  const dispatch = useDispatch()
  const resultArray = [];
lophoc.forEach((lop,index) => {
    const nganh = Allnganh?.find((nganh) => nganh._id === lop?.Nganh);
    const giaoVien = giaovien?.find((gv) => gv._id === lop?.GiaoVien);
    const khoa = Allkhoa?.find((khoa) => khoa._id === nganh?.Khoa);


    let siso = 0; 
            hocsinh.forEach((hs)=>{
              if(hs.LopHoc === lop._id)
                  siso +=1
    })
          
    // Tạo đối tượng mới với dữ liệu đã lọc
    const data = {
      id: index + 1,
      _id:lop._id,
      MaLopHoc: lop.MaLopHoc,
      SiSo: siso,
      TenLop: lop?.TenLopHoc, // hoặc thuộc tính bạn cần
      GVCV: giaoVien.HoGV+" "+giaoVien.TenGV,
      TenNganh: nganh?.TenNganh, // hoặc thuộc tính bạn cần
      TenKhoa: khoa?.TenKhoa, // hoặc thuộc tính bạn cần

    };
  
    // Thêm vào mảng kết quả
    resultArray.push(data);
  });
  
  useEffect(() => {
    DSHS(dispatch)
    DSLH(dispatch)
    getKhoa(dispatch)
    GiaoVien(dispatch)
    getNGANH(dispatch)
}, [dispatch])
  return (  
    
           <div>
           { window.location.pathname === '/danh-sach-lop-hoc' ? "":
            <div className={cx('header-kv')}>
                <div className={cx('innerrr')}>
                      <div className={cx('qlkv')}>
                        <Link to={config.routesAdmin.qlkv}>
                              Quản lý lớp học
                        </Link>
                      </div>
                      <div className={cx('qln')}>
                        <Link to={config.routesAdmin.qln}>
                              Quản lý ngành
                        </Link>
                      </div>
                      <div className={cx('qlk')}>
                        <Link to={config.routesAdmin.qlk}>
                              Quản lý khoa
                        </Link>
                      </div>
                </div>
            </div>
}
<div className={cx('wrapperr')}>               
<div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                  <h2 className={cx('title')}>Danh sách lớp học</h2>
                  <div className={cx('button-create')}>
            <div>
          
                  
                  <Button type="text" primary to={config.routesAdmin.tm}>Thêm mới lớp học</Button>
        
        <Button type="text" disabled={selectedIDs.length === 0} primary onClick={handleClickCancel}>
                                                    Xóa lớp học
                          </Button>  
                        

              <Button type="text" primary to={config.routes.home}>Quay lại</Button>
                    
      </div>
     
            </div>
            {onCancel ?                
                  <DeleteLopHoc onCancel={handleUpdateDiemCancel} LopHocId={ selectedIDs}/>:""
                }
  <DataGridDemo columns={columns} rows={resultArray} data={[]} onClick={handleIDChange}/>

    </div></div>

    </div>
   </div>
  );
}

export default QLKV;
