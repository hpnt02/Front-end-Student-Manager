import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useNavigate } from 'react-router-dom';
// import config from '~/config';
import { useState } from 'react';
import { loginUser } from '~/redux/apiStudent/apiRequest';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            userName: userName,
            password: password,
        };
        loginUser(newUser, dispatch, navigate);
    };
    return (
        <div className={cx('login-container')}>
            <div className={cx('modal')}>
                <form onSubmit={handleSubmit} >
                    {/* <h2 className={cx('title')}>HỆ THỐNG QUẢN LÝ NHÀ TRƯỜNG </h2> */}
                    <div className={cx('login-title')}>Đăng nhập</div>
                    <label className={cx('label-input')}>Tên đăng nhập</label>
                    <input className={cx("input-username")}
                        type="text"
                        placeholder="Vui lòng nhập tên đăng nhập"
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <label className={cx('label-input')}>Mật khẩu</label>
                    <input
                    className={cx("input-password")}
                        type="password"
                        placeholder="Vui lòng nhập mật khẩu"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className={cx('login-button')} type="submit">
                        {' '}
                        Đăng nhập{' '}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
