import React from 'react'
import { BeatLoader } from 'react-spinners'

export default function Spinner() {
  return (
    <div className='d-flex justify-content-center my-5'>
      <BeatLoader
        height="80"
        width="80"
        color='#000'
        ariaLabel='bars-loading'
        visible={true}
      />
    </div>
  )
}
