import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';

export default function ScroalToTop() {

const {pathname} = useLocation();

useEffect(()=> {
    window.scroll({
        top: 0,

    })
},[pathname])
  return (
    <div>
      
    </div>
  )
}
