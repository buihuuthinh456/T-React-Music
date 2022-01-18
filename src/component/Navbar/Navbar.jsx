import React,{useState} from 'react'

import { Link,useLocation } from 'react-router-dom'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';


import InforUser from '../InforUser/InforUser';
import logo from '../../assets/img/logo.jpg';



import './Navbar.scss'

import Button from '../Button/Button';

function Navbar() {

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
        <div className="navbar-container">
            <div className="navbar-wrapper">
                <div className="navbar-item">
                    <div className="navbar-item__logo">
                        <Link to="/">
                            <img src={logo} alt='logo'/>
                        </Link>
                    </div>
                </div>

                <div className="navbar-item navbar-item-login">
                    {!login &&
                        <FacebookLogin
                        appId="1629097780767016"
                        autoLoad={false}
                        fields="name,email,picture"
                        scope="public_profile,user_friends"
                        callback={responseFacebook}
                        icon="fa-facebook" 
                        render={renderProps => (
                            <Button className='btn-medium' onClick={renderProps.onClick}>ĐĂNG NHẬP FACEBOOK</Button>
                        )}
                    />
                    }
                    {login &&
                        <InforUser data={{src:picture,name:data.name}}/>
                    }
                </div>
                {
                    headerNav.map((e,i)=>{
                            return (
                                <Link className={`navbar-item representation ${i=== active ? 'active' : ''} `} to={e.path} key={i}>
                                    <i className={`navbar-item__icon ${e.icon}`}></i>
                                    <span className="navbar-item__title" >
                                        {e.display}
                                    </span>
                                </Link>
                            )
                })}
            </div>
        </div>
    )
}

export default Navbar
