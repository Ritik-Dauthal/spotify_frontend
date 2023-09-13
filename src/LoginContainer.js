import React, { useContext, useState, useLayoutEffect, useRef } from 'react'
import { Icon } from '@iconify/react';
import IconText from './Components/Shared/IconText';
import TextWithHover from './Components/Shared/TextWithHover'
import Button from './Components/Shared/Button';
import { useCookies } from 'react-cookie';
import SidebarLogin from './Components/Shared/SidebarLogIn';
import { useNavigate } from 'react-router-dom';
import Bottombar from './Components/Shared/Bottombar';
import { Howl, Howler } from "howler";
import songContext from "./SongContext"
import { userContext } from './App';
import CreatePlaylist from './modal/CreatePlaylist';



export default function LoginContaier({ children, ActiveScreen }) {
    const [sideOpen, setSideOpen] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const navigate = useNavigate()

    const { user } = useContext(userContext)

    const { firstName, lastName } = user

    const f = firstName.substring(0, 1).toUpperCase();
    const l = lastName.substring(0, 1).toUpperCase();




    const handleLoginClick = () => {
        removeCookie("token")
        alert("Logged Out Successfully 🔒")

    }
    const handleProfileClick = () => {
        navigate('/myProfile')
    }

    const openSideBar = () => {
        setSideOpen(true)
    }
    const closeSideBar = () => {
        setSideOpen(false)
    }

    const {
        currentSong,
        setCurrentSong,
        soundPlayed,
        setSoundPlayed,
        isPaused,
        setIsPaused,
    } = useContext(songContext);

    const firstUpdate = useRef(true);

    useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }

        if (!currentSong) {
            return;
        }
        changeSong(currentSong.track);
    }, [currentSong && currentSong.track]);



    const playSound = () => {
        if (!soundPlayed) {
            return;
        }
        soundPlayed.play();
    };


    const changeSong = (songSrc) => {
        if (soundPlayed) {
            soundPlayed.stop();
        }
        let sound = new Howl({
            src: [songSrc],
            html5: true,
        });
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    };

    const pauseSound = () => {
        soundPlayed.pause();
    };

    const togglePlayPause = () => {
        if (isPaused) {
            playSound();
            setIsPaused(false);
        } else {
            pauseSound();
            setIsPaused(true);
        }
    };


    return (<div className='w-screen h-screen'>

        <div className={`${currentSong ? "h-[90%]" : "h-full"} hidden  w-full md:flex`}>
            <div className={`flex-col justify-between w-1/5 bg-black flex h-full `}>
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
                            active={ActiveScreen === "home"}

                        />
                        <IconText
                            iconName={"healthicons:ui-user-profile"}
                            displayText={"My Profile"}
                            targetLink={"/myProfile"}
                            active={ActiveScreen === "profile"}

                        />

                        <IconText
                            iconName={"material-symbols:search-rounded"}
                            displayText={"Search"}
                            targetLink={"/search"}
                            active={ActiveScreen === "search"}
                        />

                        <IconText
                            iconName={"icomoon-free:books"}
                            displayText={"Library"}
                            targetLink={"/myPlaylist"}
                            active={ActiveScreen === "library"}

                        />
                        <IconText
                            iconName={
                                "material-symbols:library-music-sharp"
                            }
                            displayText={"My Music"}
                            targetLink={"/myMusic"}
                            active={ActiveScreen === "myMusic"}
                        />


                    </div>
                    <div className="pt-5">

                        <IconText
                            iconName={"material-symbols:upload"}
                            displayText={"Upload Song"}
                            targetLink={"/uploadSong"}
                            active={ActiveScreen === "uploadSong"}
                        />

                        <IconText
                            iconName={"material-symbols:add-box"}
                            displayText={"Create Playlist"}
                            active={ActiveScreen === "playlist"}
                            targetLink={"/playlistModal"}
                        />
                        <IconText
                            iconName={"mdi:cards-heart"}
                            displayText={"Liked Songs"}
                            active={ActiveScreen === "likedSongs"}
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
            <div className='w-full h-full md:w-4/5 bg-app-black'>
                <div className='w-full bg-black  h-[10%] md:flex hidden bg-opacity-30 justify-end items-center '>
                    <div className='flex justify-around w-3/5'>
                        <TextWithHover displayText={"Premium"} />
                        <TextWithHover displayText={"Support"} />
                        <TextWithHover displayText={"Download"} />
                        <div className='border border-white'></div>
                        <Button bText={"Log Out"} className={"px-6 py-2 font-semibold mt-2 bg-gray-200 hover:bg-white transition-transform transform hover:scale-105"} onClick={handleLoginClick} />
                        <TextWithHover displayText={`${f}${l}`} className={"px-2 py-2 rounded-full font-semibold mt-2 bg-white hover:bg-white transition-transform transform hover:scale-105"} />

                    </div>
                </div>
                <div className='w-full h-[90%] overflow-y-scroll bg-app-black'>

                    <div className="p-8 pt-0">
                        {children}
                    </div>


                </div>

            </div>


        </div>

        {currentSong && (

            <div className=" md:flex hidden w-full h-[10%] bg-black bg-opacity-95 text-white  items-center px-4">
                <div className="flex items-center w-1/4">
                    <img
                        src={currentSong?.thumbnail}
                        alt="currentSongThumbail"
                        className="rounded h-14 w-14"
                    />
                    <div className="pl-4">
                        <div className="text-sm cursor-pointer hover:underline">
                            {currentSong?.name}
                        </div>
                        <div className="text-xs text-gray-500 cursor-pointer hover:underline">
                            {currentSong.artist.firstName +
                                " " +
                                currentSong?.artist.lastName}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center w-1/2 h-full">
                    <div className="flex items-center justify-between w-1/3">
                        <Icon
                            icon="ph:shuffle-fill"
                            fontSize={30}
                            className="text-gray-500 cursor-pointer hover:text-white"
                        />
                        <Icon
                            icon="mdi:skip-previous-outline"
                            fontSize={30}
                            className="text-gray-500 cursor-pointer hover:text-white"
                        />
                        <Icon
                            icon={
                                isPaused
                                    ? "ic:baseline-play-circle"
                                    : "ic:baseline-pause-circle"
                            }
                            onClick={togglePlayPause}
                            fontSize={50}
                            className="text-gray-500 cursor-pointer hover:text-white"

                        />
                        <Icon
                            icon="mdi:skip-next-outline"
                            fontSize={30}
                            className="text-gray-500 cursor-pointer hover:text-white"
                        />
                        <Icon
                            icon="ic:twotone-repeat"
                            fontSize={30}
                            className="text-gray-500 cursor-pointer hover:text-white"
                        />
                    </div>
                    {/* progress bar here */}
                </div>
                <div className="flex items-center justify-end w-1/4 pr-4 space-x-4">
                    <Icon
                        icon="ic:round-playlist-add"
                        fontSize={30}
                        className="text-gray-500 cursor-pointer hover:text-white"

                    />
                    <Icon
                        icon="ph:heart-bold"
                        fontSize={25}
                        className="text-gray-500 cursor-pointer hover:text-white"
                    />
                </div>
            </div>

        )}

        {sideOpen ? <SidebarLogin onClose={closeSideBar} handleLoginClick={handleLoginClick} handleProfileClick={handleProfileClick} /> : (
            <>
                <div className='w-full bg-black h-[10%] md:hidden bg-opacity-100 '>
                    <div className='flex justify-between px-4 py-3'>
                        <Icon icon="logos:spotify" width="150" height="40" />
                        <button onClick={openSideBar}>
                            <Icon icon="ci:hamburger-md" width="50" height="40" color='white' />
                        </button>


                    </div>

                </div>
                <div className={`${currentSong ? "h-[70%]" : "h-[80%]"} md:hidden`}>

                    <div className="h-full p-8 pt-0 overflow-y-scroll bg-app-black">
                        {children}
                    </div>


                </div>
            </>)}
        {!sideOpen && currentSong && <div className="md:hidden flex justify-between w-full h-[10%] bg-black bg-opacity-100 text-white  items-center px-4">
            <div className="flex items-center">
                <img
                    src={currentSong?.thumbnail}
                    alt="currentSongThumbail"
                    className="w-10 h-10 rounded"
                />
                <div className="flex flex-col pl-4 space-y-1">
                    <div className="text-sm cursor-pointer hover:underline">
                        {currentSong?.name}
                    </div>
                    <div className="flex text-xs text-gray-500 cursor-pointer hover:underline">
                        {currentSong?.artist.firstName +
                            " " +
                            currentSong?.artist.lastName}
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end w-1/4 pr-4 space-x-2">

                <Icon
                    icon={
                        isPaused
                            ? "ic:baseline-play-circle"
                            : "ic:baseline-pause-circle"
                    }
                    onClick={togglePlayPause}
                    fontSize={40}
                    className="text-gray-500 cursor-pointer hover:text-white"

                />

                <Icon
                    icon="ph:heart-bold"
                    fontSize={25}
                    className="text-gray-500 cursor-pointer hover:text-white"
                />
            </div>
        </div>}


        {!sideOpen && <div className='w-full bg-black bottom-0 h-[10%] md:hidden bg-opacity-100 items-center '>

            <Bottombar />

        </div>}
    </div>



    )
}
