import React, { useEffect, useState } from 'react'
import PlaylistView from '../Components/Shared/Playlist';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import LogoutContainer from '../LogoutContainer';
import { makeUnauthenticatedGETRequest } from '../Utils/helper';
import Loader from '../Components/Shared/Loader';


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
            {loading ? <Loader /> : <div>
                <PlaylistView
                    titleText="Today's biggest hits"
                    cardsData={songs.slice(0, 7)}
                />
                <PlaylistView
                    titleText="Big Hits!"
                    cardsData={songs.slice(7, 14)}
                />
                <PlaylistView
                    titleText="Top Choices"
                    cardsData={songs.slice(14, 21)}
                />
                <PlaylistView
                    titleText="Hustle"
                    cardsData={songs.slice(21, 28)}
                />
                <PlaylistView
                    titleText="Relaxed"
                    cardsData={songs.slice(28, 35)}
                />
            </div>}

        </LogoutContainer>
    )
}
