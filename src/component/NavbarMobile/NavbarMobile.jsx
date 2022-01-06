import React,{useState} from 'react'


import { Link,useLocation } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


import InforUser from '../InforUser/InforUser';

import logo from '../../assets/img/logo.jpg';
import Button from '../Button/Button';


import './NavbarMobile.scss'
function NavbarMobile() {

    const [showMenu,setShowMenu] = useState(false)


    const [login, setLogin] = useState(false);
    const [data, setData] = useState({});
    const [picture, setPicture] = useState('');

    const responseFacebook = (response) => {
        console.log(response);
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
          setLogin(true);
        } else {
          setLogin(false);
        }
      }
    
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
            icon:'fas fa-compass',
            path:'/explore/song'
        },
        // {
        //     display:'BXH NCT',
        //     path:'/rank',
        //     icon:'fas fa-chart-bar'
        // }
    ];

    const { pathname } = useLocation();

    const active = headerNav.findIndex( e => e.path.split('/explore')[0] === pathname.split('/explore')[0] );

    return (
        <div className="navbar-mobile-container">
            <div className="navbar-mobile-wrapper">
                <div className="navbar-logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="navbar-btn-show"
                    onClick={()=>{setShowMenu(state=>state=!state)}}
                >
                    <i className="fas fa-bars"></i>
                </div>
            </div>
            <ul className={`navbar-menu ${showMenu&&'--active-menu'}`}>
                    <li className="navbar-menu__item">
                        {!login &&
                            <FacebookLogin
                                appId="1629097780767016"
                                autoLoad={false}
                                fields="name,email,picture"
                                scope="public_profile,user_friends"
                                callback={responseFacebook}
                                icon="fa-facebook" 
                                isMobile={false}
                                render={renderProps => (
                                    <Button className='btn-medium btn-default' onClick={renderProps.onClick}>ĐĂNG NHẬP FACEBOOK</Button>
                                )}
                            />
                            }
                            {login &&
                                <InforUser data={{src:picture,name:data.name}}/>
                            }
                    </li>
                    {
                        headerNav.map((e,i)=>{
                                return (
                                    <li className="navbar-menu__item" 
                                        key={i}
                                        onClick={()=>{setShowMenu(false)}}
                                    >
                                        <Link className={`navbar-menu__item__link representation ${i=== active ? 'active' : ''} `} to={e.path} key={i}>
                                            <i className={`navbar-menu__item__icon ${e.icon}`}></i>
                                            <span className="navbar-menu__item__title" >
                                                {e.display}
                                            </span>
                                        </Link>
                                    </li>
                                )
                    })}
                </ul>
        </div>
    )
}

export default NavbarMobile
