import classNames from 'classnames/bind';
import styles from './DSL.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function DSL() {
    const lophoc = useSelector((state) => state.dslh?.dslh?.dslh)||""
    return ( 
        <ul className={cx('group-class')}>
            {lophoc.map(lop => 
                <Link> 
                    <li className={cx('items-class')}>{lop.TenLopHoc}</li>
                </Link>
        )
            }
        </ul>
     );
}

export default DSL;