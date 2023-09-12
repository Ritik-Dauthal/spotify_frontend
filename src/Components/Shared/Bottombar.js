import React from 'react'
import IconWithoutText from './IconWithoutText'

export default function Bottombar({ }) {
    return (

        <div className='flex justify-around pt-4'>
            <IconWithoutText iconName={"material-symbols:home"} targetLink={"/"} size={40} />
            <IconWithoutText iconName={"material-symbols:search-rounded"} targetLink={"/search"} size={40} />
            <IconWithoutText iconName={"material-symbols:upload"} targetLink={"/uploadSong"} size={40} />
            <IconWithoutText iconName={"material-symbols:library-music-sharp"} targetLink={"/myMusic"} size={40}
            />
            <IconWithoutText iconName={"material-symbols:add-box"} size={40} />

        </div>

    )
}
