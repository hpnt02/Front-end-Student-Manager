import classNames from 'classnames/bind';
import styles from './DSN.module.scss';

import {useSelector } from 'react-redux';

import DataGridDemo from '~/components/Test';
import { AccountBoxOutlined} from '@mui/icons-material';
import Button from '~/components/Button';
import config from '~/config';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function DSN() {

    
  const columns = [
    { field: 'id', headerName: 'STT', width: 100 },
    {
      field: 'MaNganh',
      headerName: 'Mã ngành',
      width: 294,
    
    },
    {
      field: 'TenNganh',
      headerName: 'Tên ngành',
      width: 340,
    },
    {
      field: 'Khoa',
      headerName: 'Khoa',
      width: 300,
    
    },

    {
      field: 'ThongTin',
      headerName: 'Thông tin chi tiết',
      width: 300,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleIconClick(params.row)}>
          <AccountBoxOutlined
            style={{  color: 'blue' }} 
            
          />
          <span title="Xem chương trình DT" style={{ marginLeft: '8px' }}>
            Xem chương trình đào tạo
          </span>
        </div>
      ),
    },
  
  ]

  const navigate = useNavigate()
    const user = useSelector((state) => state.auth.login?.currentUser?.GiaoVien?.Khoa);
    const Allkhoa = useSelector((state) => state.dshs?.AllKhoa?.AllKhoa)||""
    const Allnganh = useSelector((state) => state.dshs?.AllNganh?.AllNganh)
    const GVK = Allkhoa.filter((item) => item._id === user)[0]._id
   const nganh = Allnganh.filter((item) => item.Khoa === GVK)
     const ChucVu = useSelector((state) => state.auth?.login?.currentUser?.ChucVu?.MaChucVu)||""
   const handleIconClick = (row) => {
    const id = row._id
    navigate(config.routesAdmin.ctdt ,{ state:{id} })
  };
   
 
  const resultArray = [];
  nganh.forEach((nganh, index) => {      
    const Khoa =  Allkhoa?.find((khoa) => khoa._id === nganh.Khoa)        
    // Tạo đối tượng mới với dữ liệu đã lọc
    const data = {
      id: index + 1,
      _id: nganh._id,
      MaNganh: nganh.MaNganh,
      TenNganh: nganh.TenNganh,
      Khoa: Khoa.TenKhoa,
    };
    
    // Thêm vào mảng kết quả
    resultArray.push(data);
  });
  

   return ( 

        <div className={cx('wrapperr')}>
        <div className={cx('innerr')}>
                <div className={cx('bgr-content')}>
                    <h2 className={cx('title')}>DANH SÁCH NGÀNH NGHỀ</h2>
                    <div className={cx('tool')}>             
                          <Button type="text" primary to={config.routes.home}>Quay lại</Button>           
              </div>
            <div>
              <DataGridDemo columns={columns} rows={resultArray} data={[]} check={ChucVu ==="2" ? true : false}/>
            </div>
                    </div>
                    </div>
                    </div>
     );
}

export default DSN;