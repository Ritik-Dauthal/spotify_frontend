import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoginContainer from '../LoginContainer'
import IconWithoutText from '../Components/Shared/IconWithoutText'
import { makeAuthenticatedGetRequest } from '../Utils/helper'
import { Icon } from '@iconify/react'
import SingleSongCard from '../Components/Shared/SingleSongCard'

export default function MyPlaylist() {
    const { playlistId } = useParams()
    const [playlistDetails, setPlaylistDetais] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGetRequest('/playlist/get/playlist/' + playlistId)
            console.log(response, "res")
            setPlaylistDetais(response)
            setLoading(false)
        }
        getData()
    }, [])
    return (
        <LoginContainer ActiveScreen="library">
            {loading ? <div className='flex items-center justify-center animate-spin'> <Icon icon="teenyicons:loader-outline" width="30" height="30" color="white" /></div> :

                <>{
                    playlistDetails._id && <>
                        <div>
                            <div className='flex py-4 space-x-4'>
                                <IconWithoutText iconName={"ep:back"} targetLink={"/"} size={30} />
                                <div className='text-2xl font-semibold text-white '>{playlistDetails.name}</div>
                            </div>
                            <div className='flex flex-col overflow-y-scroll'>
                                {playlistDetails.songs.length === 0 &&
                                    <div className='flex justify-center'>
                                        <p className='text-lg text-white'>No songs in this playlist</p>

                                    </div>}

                                {playlistDetails.songs?.map((song, index) => {
                                    return <SingleSongCard key={index} info={song} />
                                })}
                            </div>


                        </div></>
                }</>
            }




        </LoginContainer>
    )
}