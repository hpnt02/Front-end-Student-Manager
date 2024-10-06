import { useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { getAccount, getVC} from '~/redux/apiAdmin/apiAdmin';
import classNames from 'classnames/bind';
import styles from './QLTK.module.scss';
import { Link } from 'react-router-dom';
import config from '~/config';
import { EditIcon, TrashIcon } from '~/components/Icons/icons';
import HeaderAccount from '~/components/HeaderAccount';

const cx = classNames.bind(styles);
function QLTK() {
    const account = useSelector((state) => state.account?.account?.account)||""
    const hocsinh = useSelector((state) => state.dshs?.dshs?.dshs?.items)||""
    const giaovien = useSelector((state) => state.gv?.giaovien?.giaovien?.items)||[]
    const vienchuc = useSelector((state) => state.vienchuc?.vienchuc?.vienchuc)||""

    console.log(account)
    const dispatch = useDispatch()

   


    useEffect(() => {
        getVC(dispatch)
        getAccount(dispatch)
    }, [dispatch])
    return ( 
        <div>
              <HeaderAccount/>
              
        <div className={cx('wrapper')}>
        <div className={cx('inner')}>
           <div className={cx('bgr-content')}>
             <h2 className={cx('title')}>Danh sách phụ huynh</h2>
             <div className={cx('button-create')}>
             <div>
         <Link to={config.routesAdmin.tmph}>        
   <button
     type="text"
     className={cx('new-create')}
   >
     Thêm mới tài khoản
   </button>
         </Link>
 </div>

       </div>
           <table className={cx('table-tkb')}> 
           <thead>
               <tr>
                   <th>STT</th>
                   <th>Mã người dùng</th>
                   <th>Họ tên người dùng</th>
                   <th>Tên đăng nhập</th>          
                   <th>Mật khẩu</th>
                   <th>Chức năng</th>
               </tr>
           </thead>
       <tbody>          
       {account.map((acc, index) => {
        const hs = hocsinh?.find((hs) => hs._id === acc.HocSinh);
        const gv = giaovien?.find((gv) => gv._id === acc.GiaoVien);
        const vc = vienchuc?.find((vc) => vc._id === acc.VienChuc);
        
return (
<tr key={index}>
 <td>{index + 1}</td>
 <td>{hs? hs.MaHS : gv? gv.MaGV : vc? vc.MaVC :"" }</td>
 <td>{hs? hs.HoHS : gv? gv.HoGV :vc? vc.HoVC:""} {hs? hs.TenHS : gv? gv.TenGV :vc? vc.TenVC :""}</td>
 <td>{acc.userName}</td>
 <td>{acc.password}</td>
<td> 
 <div className={cx('icon')}>
<Link >
 <EditIcon className={cx('edit-icon')} />
</Link>
 <div >
 <TrashIcon className={cx('trash-icon')} />
</div> 
 </div> 
 </td>
</tr>
);
})} 
  
  </tbody>
            </table> 
            {/* <div className={cx('button-panigate')}>
            <button className={cx('button-panigate-next-prev')}
              disabled={currentPage <=1}
                onClick={handlePrev}
              >Prev</button>
            <button className={cx('button-panigate-next-prev')}
            disabled={currentPage >=NextPage}
              onClick={handleNext}
            >Next</button>
            </div> */}
    </div>

    </div>
    </div>
        </div>
    
 );
}

export default QLTK;