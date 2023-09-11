import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import IconText from './Components/Shared/IconText';
import TextWithHover from './Components/Shared/TextWithHover'
import Button from './Components/Shared/Button';
import { useCookies } from 'react-cookie';
import SidebarLogout from './Components/Shared/SidebarLogut';
import { useNavigate } from 'react-router-dom';
import Bottombar from './Components/Shared/Bottombar';



export default function LoginContaier({ children }) {
    const [sideOpen, setSideOpen] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate()

    const handleLoginClick = () => {
        navigate("/login")
    }

    const handleSignupClick = () => {
        navigate("/signup")
    }

    const openSideBar = () => {
        setSideOpen(true)
    }
    const closeSideBar = () => {
        setSideOpen(false)
    }

    return (<div className='w-full h-full '>


        <div className='flex w-full h-[90%] md:h-full'>
            <div className='flex-col justify-between hidden w-1/5 h-full bg-black md:flex '>
                <div>
                    <div className='flex items-center mt-5 space-x-1 h-fit' >
                        <Icon icon="logos:spotify-icon" width="50" />
                        <p className='text-3xl text-white'>Spotify</p>
                    </div>
                    <div className="py-5">
                        <IconText
                            iconName={"material-symbols:home"}
                            displayText={"Home"}
                            targetLink={"/"}
                            active
                        />
                        <IconText
                            iconName={"material-symbols:search-rounded"}
                            displayText={"Search"}
                        />

                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}

                        />
                        <IconText
                            iconName={
                                "material-symbols:library-music-sharp"
                            }
                            displayText={"My Music"}
                            targetLink="/myMusic"
                        />


                    </div>
                    <div className="pt-5">

                        <IconText
                            iconName={"material-symbols:upload"}
                            displayText={"Upload Song"}
                            targetLink={"/uploadSong"}
                        />

                        <IconText
                            iconName={"material-symbols:add-box"}
                            displayText={"Create Playlist"}
                        />
                        <IconText
                            iconName={"mdi:cards-heart"}
                            displayText={"Liked Songs"}
                        />



                    </div>
                </div>
                <div className="px-5 pb-10">
                    <div className="flex items-center justify-center w-2/5 px-2 py-1 text-white border border-gray-400 rounded-full cursor-pointer hover:border-white">
                        <Icon icon="carbon:earth-europe-africa" />
                        <div className="ml-2 text-sm font-semibold">
                            English
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-full md:w-4/5'>
                <div className='w-full bg-black  h-[10%] md:flex hidden bg-opacity-90 justify-end items-center '>
                    <div className='flex justify-around w-3/5'>
                        <TextWithHover displayText={"Premium"} />
                        <TextWithHover displayText={"Support"} />
                        <TextWithHover displayText={"Download"} />
                        <div className='border border-white'></div>
                        <button className='font-semibold text-gray-500 hover:text-white' onClick={handleSignupClick}>{"Sign up"}</button>
                        <Button bText={"Log In"} className={"px-6 py-2 font-semibold mt-2 bg-gray-200 hover:bg-white transition-transform transform hover:scale-105"} onClick={handleLoginClick} />
                    </div>
                </div>
                <div className='w-full md:h-[90%] h-full  overflow-y-scroll  bg-app-black'>


                    {sideOpen ? <SidebarLogout onClose={closeSideBar} handleLoginClick={handleLoginClick} handleSignupClick={handleSignupClick} /> : (
                        <>
                            <div className='w-full bg-black  h-[10%] md:hidden bg-opacity-30 justify-end items-center '>
                                <div className='flex justify-between px-4 py-3'>
                                    <Icon icon="logos:spotify" width="150" height="40" />
                                    <button onClick={openSideBar}>
                                        <Icon icon="ci:hamburger-md" width="50" height="40" color='white' />
                                    </button>


                                </div>

                            </div>
                            <div className="p-8 pt-0 overflow-auto content">
                                {children}
                            </div>
                        </>)}


                </div>

            </div>


        </div>


        <div className='w-full bg-black sticky bottom-0 h-[10%] md:hidden bg-opacity-100 items-center '>

            <Bottombar />

        </div>
    </div>

    )
}
