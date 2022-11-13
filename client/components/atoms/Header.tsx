import * as React from 'react'
const Fade: any = require('react-reveal/Fade')


export function Header() {
  return (
    <Fade top duration={1200}>
      <div className='bg-[url(../public/wavesOpacity.svg)] w-[100%] h-[100px] absolute top-0 left-0' />
    </Fade>
  )
}
