import React,{useEffect} from 'react'

import './Rank.scss'

function Rank() {


    useEffect( ()=>{
        window.scrollTo(0,0);
    },[])

    return (
        <div className="container container--fix">
            Hiện tại chưa hỗ trợ chức năng này. Xin chân thành cảm ơn bạn đã ghé thăm, tôi sẽ hoàn thiện nó trong tương lai. Thân!
        </div>
    )
}

export default Rank
