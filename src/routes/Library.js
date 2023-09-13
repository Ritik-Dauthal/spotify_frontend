import React, { useEffect, useState } from 'react'
import IconWithoutText from '../Components/Shared/IconWithoutText';
import LoginContainer from '../LoginContainer';
import Card from '../Components/Shared/Card';
import { makeAuthenticatedGetRequest } from '../Utils/helper';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';




export default function Library() {
    const [myPlaylists, setMyPlaylists] = useState([]);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGetRequest(
                "/playlist/get/me"
            );
            setMyPlaylists(response.data);
            setLoading(false)
        };
        getData();
    }, []);

    return (
        <LoginContainer ActiveScreen="library">

            <div>
                <div className='flex py-4 space-x-4'>
                    <IconWithoutText iconName={"ep:back"} targetLink={"/"} size={30} />
                    <div className='text-2xl font-semibold text-white '>My Playlist</div>

                </div>
                {loading ? <div className='flex justify-center animate-spin'> <Icon icon="teenyicons:loader-outline" width="30" height="30" color="white" />
                </div> : <div >
                    {myPlaylists.length === 0 &&
                        <div className='flex flex-col items-center space-y-2'>
                            <p className='text-lg text-white'>No Playlist Available </p>
                            <Link className='text-sm text-white underline' to="/playlistModal">Create Playlist</Link>
                        </div>

                    }

                    {<div className="grid grid-cols-2 gap-5 py-5 overflow-y-scroll md:grid-cols-3">
                        {myPlaylists.map((item, index) => {
                            return (
                                <Card
                                    key={index}
                                    title={item.name}
                                    imgUrl={item.thumbnail}
                                    playlistId={item._id}
                                />
                            );
                        })}
                    </div>}

                </div>}
            </div>


        </LoginContainer>
    )
}
