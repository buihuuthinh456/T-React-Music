import React,{useState} from 'react'

import { Link,useLocation } from 'react-router-dom'


import logo from '../../assets/img/logoNhaccuatui.png';

import './Navbar.scss'

import Button from '../Button/Button';

function Navbar() {

    const [modalLogin,setModalLogin] = useState(false);
    const [modalRegister,setModalRegister] = useState(false);

    const headerNav = [
        {
            display:'Tìm Kiếm',
            path:'/search',
            icon:'fas fa-search'
        },
        {
            display:'Trang chủ',
            path:'/',
            icon:'fas fa-home'
        },
        {
            display:'Khám Phá',
            path:'/baihat',
            icon:'fas fa-compass'
        },
        {
            display:'BXH NCT',
            path:'/rank',
            icon:'fas fa-chart-bar'
        }
    ];

    const { pathname } = useLocation();

    const active = headerNav.findIndex( e => e.path === pathname );

    return (
        <div className="navbar-container">
            <div className="navbar-wrapper">
                <div className="navbar-item">
                    <div className="navbar-item__logo">
                        <Link to="/">
                            <img src={logo} alt='logo'/>
                        </Link>
                    </div>
                    <Button className='btn-medium'>NÂNG CẤP</Button>
                </div>

                <div className="navbar-item navbar-item-login">
                    <span onClick={()=>setModalLogin(true)}>Đăng Nhập</span>
                    |
                    <span  onClick={()=>setModalRegister(true)}>Đăng Ký</span>
                </div>
                {
                    headerNav.map((e,i)=>(
                        <Link className={`navbar-item ${i=== active ? 'active' : ''} `} to={e.path} key={i}>
                            <i className={`navbar-item__icon ${e.icon}`}></i>
                            <span className="navbar-item__title" >
                                {e.display}
                            </span>
                        </Link>
                    ))
                }
                
                
            </div>
        </div>
    )
}

export default Navbar
