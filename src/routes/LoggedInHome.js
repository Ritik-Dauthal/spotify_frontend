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
                    titleText="Top mixes"
                    cardsData={songs.slice(7, 15)}
                />
                <PlaylistView
                    titleText="Today's Best"
                    cardsData={songs.slice(23, 30)}
                />
                <PlaylistView
                    titleText="Big Hits!"
                    cardsData={songs.slice(30, 40)}
                />
                <PlaylistView
                    titleText="Pahadi Songs"
                    cardsData={songs.slice(15, 23)}
                />

            </div>}


        </LoginContaier>



    )
}




