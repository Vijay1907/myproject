import React from 'react'

const Alert = (props) => {
  return (
    
     props.visible && <div className={`alert alert-${props.color}`} role="alert" style={{position:"absolute", width:"100%",height:"45px", zIndex:"2",top:"0"}}>
        {props.message}
            </div>
  )
}

export default Alert
