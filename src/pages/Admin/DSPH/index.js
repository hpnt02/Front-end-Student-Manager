import classNames from 'classnames/bind';
import styles from './DSPH.module.scss';
import { useDispatch,useSelector } from 'react-redux';
import config from '~/config';
import { useEffect, useState} from 'react';
import { getPhuHuynh, DSHS, DSLH } from '~/redux/apiAdmin/apiAdmin';
import { Link, useNavigate } from 'react-router-dom';
import DataGridDemo from '~/components/Test';
import { Edit } from '@mui/icons-material';
const cx = classNames.bind(styles);





function DSPH() {


  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    {
      field: 'MaHocSinh',
      headerName: 'Mã học sinh',
      width: 100,
    
    },
    {
      field: 'TenHocSinh',
      headerName: 'Tên học sinh',
      width: 200,
    },
    {
      field: 'TenLop',
      headerName: 'Tên lớp',
      width: 200,
    },
    {
      field: 'HoTenMe',
      headerName: 'Họ và tên mẹ',
      width: 200,
    
    },
    {
      field: 'NgheNghiepMe',
      headerName: 'Nghề nghiệp mẹ',
      width: 200,
    },
    {
      field: 'SDTMe',
      headerName: 'Số điện thoại mẹ',
      width: 200,
    },
    {
      field: 'HoTenCha',
      headerName: 'Họ và tên cha',
      width: 200,
    
    },
    {
      field: 'NgheNghiepCha',
      headerName: 'Nghề nghiệp cha',
      width: 200,
    },
    {
      field: 'SDTCha',
      headerName: 'Số điện thoại cha',
      width: 200,
    },
    {
      field: 'ChinhSua',
      headerName: 'Chỉnh sửa thông tin',
      width: 200,
      renderCell: (params) => (
        <div style={{ display: 'flex',cursor: 'pointer', alignItems: 'center', justifyContent:'center' }}  onClick={() => handleCreatePH(params.row)}>
          <Edit
            style={{  color: 'blue' }}            
          />
          <span title="Chỉnh sửa" style={{ marginLeft: '8px' }}>
            Chỉnh sửa thông tin
          </span>
        </div>
      ),
    },
  ];
    const phuhuynh = useSelector((state) => state.phuhuynh?.phuhuynh?.phuhuynh)||""
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs)||[]
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const resultArray = [];
   hocsinh.forEach((hs,index) => {
      const PhuHuynh = phuhuynh?.find((ph) => hs._id === ph?.HocSinh);
      const lop = lophoc?.find((l) => l._id === hs?.LopHoc);
    const data = {
      id: index + 1,
      idHocSinh: hs._id,
      MaHocSinh: hs?.MaHS,
      TenHocSinh:  hs?.HoHS +" "+ hs?.TenHS,
      TenLop: lop?.TenLopHoc,
      HoTenMe:PhuHuynh?.HoTenMe,
      NgheNghiepMe: PhuHuynh?.NgheNghiepMe,
      SDTMe:PhuHuynh?.SDTMe,
      HoTenCha: PhuHuynh?.HoTenCha,
      NgheNghiepCha:PhuHuynh?.NgheNghiepCha,
      SDTCha:PhuHuynh?.SDTCha,
      
    };
    
    // Thêm vào mảng kết quả
    resultArray.push(data);
  });

  const handleCreatePH = (row) => {
    const id = row.idHocSinh
    navigate(config.routesAdmin.tmph, { state:{id} });
  };

  const [records, setRecords] = useState(resultArray)
  function handleFilter(event) {
   const searchValue = event.target.value.toLowerCase();
   const newData = resultArray.filter(row => {
     const tenHocSinh = row.TenHocSinh?.toLowerCase() || '';
     const maHS = row.MaHocSinh?.toLowerCase() || '';
     const HTC = row.HoTenCha?.toLowerCase() || '';
     const HTM = row.HoTenMe?.toLowerCase() || '';
     
     return (
       tenHocSinh.includes(searchValue) ||
       maHS.includes(searchValue)||
       HTC.includes(searchValue)||
       HTM.includes(searchValue)
     );
   });
 
   setRecords(newData);
 }

    useEffect(() => {
        getPhuHuynh(dispatch)
        DSHS(dispatch)
        DSLH(dispatch)
    }, [dispatch])

   
    return ( 
        <div className={cx('wrapperr')}>
            <div className={cx('innerr')}>
               <div className={cx('bgr-content')}>
                 <h2 className={cx('title')}>Danh sách phụ huynh</h2>
                 <div className={cx('tool')}>
                 <div className={cx('search')}><input type="text" onChange={handleFilter} placeholder="Nhập mã học sinh hoặc tên học sinh"/></div>               
                 <div className={cx('button-create')}>
                 <div>
             <Link to={config.routes.home}>
                          <button type="text" className={cx('come-back')}>Quay lại</button>
                      </Link>
     </div>
    
           
                </div>
                </div>
             <DataGridDemo columns={columns} rows={records} data={[]} />
               
        </div>
    
        </div>
        </div>
        
     );
}

export default DSPH;