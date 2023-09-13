import React, { useEffect, useState } from 'react'
import PlaylistView from '../Components/Shared/Playlist';
import LoginContaier from '../LoginContainer';
import { makeUnauthenticatedGETRequest } from '../Utils/helper';
import { Icon } from '@iconify/react';


export default function LoggedInHome() {
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(true)

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


    return (




        <LoginContaier ActiveScreen="home">
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


        </LoginContaier>



    )
}




