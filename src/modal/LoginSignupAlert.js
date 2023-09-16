import { useContext } from "react"
import { alertContext } from "../App"

export default function LoginSignupAlert() {
    const { setLoginSignupalert, LoginSignupalertMessage } = useContext(alertContext)

    return (

        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-300 bg-opacity-70"
            style={{ zIndex: 1000 }}>
            <div className='p-8 rounded-lg md:w-1/4 w-[90%] bg-white'>
                <div className='flex flex-col items-center'>
                    <div className="mb-5 text-lg font-semibold text-black">
                        ESpotify Says:
                    </div>
                    <div className='text-green-600'>{LoginSignupalertMessage}</div>
                    <button className='px-2 py-1 mt-2 text-black bg-green-600 rounded-md' onClick={() => setLoginSignupalert(false)}>OK</button>
                </div>
            </div>
        </div>
    )
}