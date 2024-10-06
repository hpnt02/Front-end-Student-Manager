import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { Link } from 'react-router-dom';
import {useSelector} from 'react-redux'
import config from '~/config';
const cx = classNames.bind(styles);

function Navbar() {
     const user = useSelector((state) => state.auth.login.currentUser)
    return (
        <nav className={cx('navbar-container')}>
            <Link to={config.routes.home} className={cx('navbar-home')}>
                Home
            </Link>
            {user ? (
                <>
                    <p className={cx('navbar-user')}>
                        Hi, <span> {user.userName} </span>
                    </p>
                    <Link to="/logout" className={cx('navbar-logout')}>
                        Log out
                    </Link>
                </>
            ) : (
            <>
                <Link to={config.routes.login} className={cx('navbar-login')}>
                    Login
                </Link>
                <Link to={config.routes.register} className={cx('navbar-register')}>
                    Register
                </Link>
            </>
             )} 
        </nav>
    );
}

export default Navbar;
