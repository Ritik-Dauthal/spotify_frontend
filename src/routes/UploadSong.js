import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import CloudinaryUpload from '../Components/Shared/CloudinaryUpload';
import CloudSongImage from '../Components/Shared/CloudSongImage';
import { makeAuthenticatedPOSTRequest } from '../Utils/helper';
import IconWithoutText from '../Components/Shared/IconWithoutText';
import LoginContainer from '../LoginContainer';



export default function UploadSong() {
    const [sideOpen, setSideOpen] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [SongUrl, setSongUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState();
    const [uploadedImageStatus, setUploadedImageStatus] = useState();
    const navigate = useNavigate()


    const submitSong = async () => {

        const data = { name, thumbnail, track: SongUrl };
        const response = await makeAuthenticatedPOSTRequest(
            "/song/create",
            data
        );
        console.log(response, "response")
        if (response.err) {
            alert("Could not create song");
            return;
        }
        alert("Song uploaded successfully ✅");
        navigate("/myMusic");
    };



    const resetAll = () => {
        setName("")
        setThumbnail("")
        setSongUrl("")
        setUploadedImageStatus(null)
        setUploadedSongFileName(null)
    }

    return (
        <LoginContainer ActiveScreen="uploadSong">

            <div >
                <div className='flex py-4 space-x-4 md:ml-0'>
                    <IconWithoutText iconName={"ep:back"} targetLink={"/"} size={30} />
                    <div className='text-2xl font-semibold text-white '>Upload Your Song</div>

                </div>


                <div className='flex flex-col items-center w-[80%] py-5 ml-10 md:ml-0 md:justify-around md:w-full md:flex-row'>

                    <div className='flex flex-col space-y-2'>
                        <label htmlFor="Song name" className='font-semibold text-white'>
                            Song name
                        </label>
                        <input
                            type="text"
                            placeholder="Song name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-3 placeholder-gray-500 border border-gray-400 border-solid rounded pl-28 hover:border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-200"
                            id="Song name"

                        />
                    </div>
                    <div className='flex flex-col my-4 space-y-2 md:my-0'>
                        <label htmlFor="Thumbnail" className='font-semibold text-white'>
                            Thumbnail
                        </label>

                        <div className="">
                            {uploadedImageStatus ? (
                                <div className="text-white">
                                    Uploaded {uploadedImageStatus}fully ✅
                                </div>
                            ) : (
                                <CloudSongImage setThumbnail={setThumbnail} setUploadedImageStatus={setUploadedImageStatus} />
                            )}
                        </div>

                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className="py-5">
                        {uploadedSongFileName ? (
                            <div className="p-3 bg-white rounded-full">
                                {uploadedSongFileName.substring(0, 35)}...
                            </div>
                        ) : (
                            <CloudinaryUpload
                                setUrl={setSongUrl}
                                setName={setUploadedSongFileName}
                            />
                        )}
                    </div>
                    <button
                        className="flex items-center justify-center w-40 p-4 font-semibold bg-white rounded-full cursor-pointer"
                        onClick={submitSong}
                    >
                        Submit Song
                    </button>
                    <button
                        className="flex items-center justify-center w-40 p-4 my-4 font-semibold bg-white rounded-full cursor-pointer"
                        onClick={resetAll}
                    >
                        Reset
                    </button>
                </div>



            </div>


        </LoginContainer>
    )
}
