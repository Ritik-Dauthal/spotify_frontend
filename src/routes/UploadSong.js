import React, { useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import CloudinaryUpload from '../Components/Shared/CloudinaryUpload';
import CloudSongImage from '../Components/Shared/CloudSongImage';
import { makeAuthenticatedPOSTRequest } from '../Utils/helper';
import IconWithoutText from '../Components/Shared/IconWithoutText';
import LoginContainer from '../LoginContainer';
import Loader from '../Components/Shared/Loader';



export default function UploadSong() {
    const [sideOpen, setSideOpen] = useState(false)
    const [cookie, setCookie, removeCookie] = useCookies(["token"]);
    const [name, setName] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [SongUrl, setSongUrl] = useState("");
    const [uploadedSongFileName, setUploadedSongFileName] = useState();
    const [uploadedImageStatus, setUploadedImageStatus] = useState();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const submitSong = async () => {

        const data = { name, thumbnail, track: SongUrl };
        const response = await makeAuthenticatedPOSTRequest(
            "/song/create",
            data
        );
        if (response.err) {
            alert("Could not create song");
            return;
        }
        setLoading(false)
        alert("Song uploaded successfully ✅");
        navigate("/myMusic")
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

            {loading ? <Loader /> :
                <div >
                    <div className='flex py-4'>
                        <div className='text-2xl font-semibold text-white '>Upload Your Song</div>

                    </div>

                    <div className='flex flex-col items-center w-[80%] py-5 ml-10 md:ml-0 md:justify-around md:w-full md:flex-row'>

                        <div className='flex flex-col space-y-2'>
                            <label htmlFor="Song name" className='font-semibold text-center text-white'>
                                Song name
                            </label>
                            <input
                                type="text"
                                placeholder="Song name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="p-3 placeholder-gray-500 border border-gray-400 border-solid rounded md:pl-20 hover:border-blue-500 hover:bg-blue-100 focus:outline-none focus:ring focus:ring-blue-200"
                                id="Song name"

                            />
                        </div>
                        <div className='flex flex-col my-4 space-y-2 md:my-0'>
                            <label htmlFor="Thumbnail" className='font-semibold text-center text-white'>
                                Thumbnail
                            </label>

                            <div className="">
                                {uploadedImageStatus ? (
                                    <div className="text-white">
                                        Uploaded {uploadedImageStatus}fully ✅
                                    </div>
                                ) : (<div className='flex flex-col items-center'>
                                    <CloudSongImage setThumbnail={setThumbnail} setUploadedImageStatus={setUploadedImageStatus} />
                                    <p className='mt-1 text-sm text-center text-white'>(Please upload in JPEG or AVIF format only.)</p>
                                </div>
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
                                <div className='flex flex-col items-center'>
                                    <CloudinaryUpload
                                        setUrl={setSongUrl}
                                        setName={setUploadedSongFileName}
                                    />
                                    <p className='mt-1 text-sm text-white'>(Please upload in MP3 format only.)</p>
                                </div>
                            )}
                        </div>
                        <div className='flex flex-row md:flex-col'>
                            <button
                                className="flex items-center justify-center py-3 font-semibold bg-white rounded-full cursor-pointer md:w-40 w-36 md:p-4 disabled:bg-gray-500"
                                onClick={() => { submitSong(); setLoading(true) }}
                                disabled={name === "" || thumbnail === "" || SongUrl === ""}
                            >
                                Submit Song
                            </button>
                            <button
                                className="flex items-center justify-center py-3 font-semibold bg-white rounded-full cursor-pointer md:w-40 w-36 md:p-4 md:my-4 disabled:bg-gray-500"
                                onClick={resetAll}
                                disabled={name === "" && thumbnail === "" && SongUrl === ""}
                            >
                                Reset
                            </button>
                        </div>

                    </div>



                </div>
            }

        </LoginContainer>
    )
}
