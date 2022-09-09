import React from 'react'

const Die = (props) => {

  return (
    <div>
       <button className='die-face' onClick={props.onClick} style={props.isHeld ? {backgroundColor:'#59E391'} : {backgroundColor:'white'}}>{props.value}</button>
    </div>
  )
}

export default Die
