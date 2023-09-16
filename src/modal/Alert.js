import React, { useContext } from 'react'
import { alertContext } from '../App'

export default function AlertModal() {
    const { setAlert, AlertMessage } = useContext(alertContext)

    return (

        <div className="absolute flex items-center justify-center w-screen h-screen bg-black bg-opacity-70"
            style={{ zIndex: 1000 }}>
            <div className='p-8 rounded-lg md:w-1/4 w-[85%] bg-app-black'>
                <div className='flex flex-col items-center'>
                    <div className="mb-5 text-lg font-semibold text-white">
                        ESpotify Says:
                    </div>
                    <div className='text-green-600'>{AlertMessage}</div>
                    <button className='px-2 py-1 mt-2 text-white bg-green-600 rounded-md' onClick={() => setAlert(false)}>OK</button>
                </div>
            </div>
        </div>
    )
}



