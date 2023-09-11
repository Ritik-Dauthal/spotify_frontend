import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { makeAuthenticatedGetRequest } from '../Utils/helper';
import IconWithoutText from '../Components/Shared/IconWithoutText';
import SingleSongCard from '../Components/Shared/SingleSongCard';
import LoginContainer from '../../src/LoginContainer';



export default function UploadSong() {
    const [songData, setSongData] = useState([])
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);



    useEffect(() => {
        const getSongs = async () => {
            const response = await makeAuthenticatedGetRequest('/song/get/mysongs')
            setSongData(response.data)
        }
        getSongs()
    }, [])




    return (
        <LoginContainer ActiveScreen="myMusic">
            <div>
                <div className='flex py-4 space-x-4 md:ml-0'>
                    <IconWithoutText iconName={"ep:back"} targetLink={"/"} size={30} />
                    <div className='text-2xl font-semibold text-white '>My Music</div>

                </div>
                {songData.length === 0 ? <div className='flex justify-center'>
                    <p className='text-lg text-white'>You haven't uploaded any songs yet, Please upload songs first.</p>
                </div> : <div >
                    {songData?.map((song, index) => {
                        return <SingleSongCard key={index} info={song} />
                    })}
                </div>}



            </div>
        </LoginContainer>
    )
}
