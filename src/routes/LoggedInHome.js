import React, { useContext, useEffect, useState } from 'react'
import PlaylistView from '../Components/Shared/Playlist';
import LoginContaier from '../LoginContainer';
import { makeUnauthenticatedGETRequest } from '../Utils/helper';
import Loader from '../Components/Shared/Loader';
import { userContext } from '../App';


export default function LoggedInHome() {
    const [songs, setSongs] = useState([])
    const { user, setUser } = useContext(userContext)
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
            {loading ? <Loader /> : <div>
                <PlaylistView
                    titleText={`Made For ${user.firstName}`}
                    cardsData={songs.slice(0, 7)}
                />
                <PlaylistView
                    titleText="Big Hits!"
                    cardsData={songs.slice(7, 14)}
                />
                <PlaylistView
                    titleText="Today's Best"
                    cardsData={songs.slice(14, 21)}
                />
                <PlaylistView
                    titleText="Hustle"
                    cardsData={songs.slice(21, 28)}
                />
                <PlaylistView
                    titleText="Top mixes"
                    cardsData={songs.slice(28, 35)}
                />
            </div>}


        </LoginContaier>



    )
}




