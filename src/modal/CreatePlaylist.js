import React, { useState } from 'react'
import { makeAuthenticatedPOSTRequest } from '../Utils/helper';
import LoginContainer from '../LoginContainer';
import { useNavigate } from 'react-router-dom';



export default function CreatePlaylist() {
    const [playlistName, setPlaylistName] = useState("");
    const [playlistImage, setPlaylistImage] = useState("");
    const navigate = useNavigate()

    const createPlaylist = async () => {
        const response = await makeAuthenticatedPOSTRequest(
            "/playlist/create",
            { name: playlistName, thumbnail: playlistImage, songs: [] }
        );
        if (response.err) {
            alert("Could not create Playlist");
            return;
        }
        else {
            setPlaylistImage('')
            setPlaylistName('')
            alert("Playlist Created 🤗")
            navigate('/myPlaylist')
        }
    };




    return (
        <LoginContainer ActiveScreen="playlist">

            <div className='flex items-center justify-center w-full h-full'>


                <div
                    className="w-full mt-20 pb-10 pt-5 bg-black rounded-md md:w-[60%] "
                >
                    <div className="mt-2 mb-5 ml-5 text-xl font-semibold text-center text-white md:text-left">
                        Create Playlist
                    </div>
                    <div className="flex flex-col items-center space-y-10">
                        <input
                            label="Name"
                            placeholder="Playlist Name"
                            value={playlistName}
                            onChange={(e) => { setPlaylistName(e.target.value) }}
                            className="py-3 w-[90%] text-center placeholder-gray-500 border border-gray-400 border-solid rounded hover:border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-200"
                        />
                        <input
                            label="Thumbnail"
                            value={playlistImage}
                            onChange={(e) => { setPlaylistImage(e.target.value) }}
                            className="py-3 w-[90%] text-center placeholder-gray-500 border border-gray-400 border-solid rounded hover:border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-200"
                            placeholder="Thumbnail"

                        />
                        <button
                            className="flex items-center justify-center w-1/2 py-3 mt-4 font-semibold bg-white rounded cursor-pointer disabled:bg-gray-500"
                            onClick={createPlaylist}
                            disabled={playlistName === "" || playlistImage === ""}
                        >
                            Create
                        </button>
                    </div>



                </div>
            </div>


        </LoginContainer>
    )
}
