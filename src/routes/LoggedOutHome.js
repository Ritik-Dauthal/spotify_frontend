import React, { useEffect, useState } from 'react'
import PlaylistView from '../Components/Shared/Playlist';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import LogoutContainer from '../LogoutContainer';
import { makeUnauthenticatedGETRequest } from '../Utils/helper';
import { Icon } from '@iconify/react';


export default function Home() {
    const [sideOpen, setSideOpen] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        const getData = async () => {
            const response = await makeUnauthenticatedGETRequest(
                "/song/get/allsongs"
            );
            setSongs(response.data);
            setLoading(false)
        };
        getData();
    }, []);


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

    return (
        <LogoutContainer>
            {loading ? <div className='flex items-center justify-center animate-spin'> <Icon icon="teenyicons:loader-outline" width="30" height="30" color="white" /></div> : <div>
                <PlaylistView
                    titleText="Today's biggest hits"
                    cardsData={songs.slice(0, 7)}
                />
                <PlaylistView
                    titleText="India ki Awaaj"
                    cardsData={songs.slice(2, 10)}
                />
                <PlaylistView
                    titleText="India's Best"
                    cardsData={songs.slice(1, 8)}
                />
                <PlaylistView
                    titleText="Hustle"
                    cardsData={songs.slice(2, 9)}
                />
                <PlaylistView
                    titleText="Sound of India"
                    cardsData={songs.slice(0, 6)}
                />
            </div>}

        </LogoutContainer>
    )
}
