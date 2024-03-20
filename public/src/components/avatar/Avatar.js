import React from 'react'
import avatar from'../../images/avad.png'
function Avatar({src,width,height}) {
 
  return (
    <>
    
     <img src={src?src:avatar} alt="" class="rounded-full overflow-hidden" width={width} height={height} />
    </>
  )
}

export default Avatar