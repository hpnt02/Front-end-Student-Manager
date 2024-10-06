import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import HomeStudent from './HomeStudent';
import HomeAdmin from './HomeAdmin';
import HomeTeacher from './HomeTeacher';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser)||""
    const navigate = useNavigate();

   

 

     

      useEffect(() => {
        if (!user) {
          navigate("/login");
        }
      }, [navigate, user,  ])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('infor-home')}>      
                {user?.ChucVu?.TenChucVu === "Học sinh" ? <HomeStudent /> : (user?.ChucVu?.TenChucVu === "Giáo viên" ? <HomeTeacher /> : <HomeAdmin />)}

                </div>   
            </div>
        </div>
    );
}

export default Home;
