import React from 'react'



import './Video.scss'
function Video(props) {
    const src = props.src
    return (
        <video src={src} controls>
            Trình duyệt của bạn không hỗ trợ tag HTML Video. Cảm ơn bạn đã ghé thăm
        </video>
    )
}

export default Video
