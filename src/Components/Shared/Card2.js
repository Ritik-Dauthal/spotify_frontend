import { Icon } from "@iconify/react";
import { useContext } from "react";
import songContext from "../../SongContext";

const Card2 = (item) => {
    console.log("item", item.item)
    const { currentSong, setCurrentSong } = useContext(songContext);
    return (
        <div className="flex flex-col w-full h-48 p-4 bg-black rounded-lg cursor-pointer">
            <div className="h-3/5">
                <img
                    className="object-cover w-full h-full rounded-md"
                    src={item.item.thumbnail}
                    alt="label"
                />
            </div>
            <div className="overflow-hidden font-semibold text-white">{item.item.name}</div>
            <Icon icon="octicon:play-24" width="30" height="30" color="white" onClick={() => setCurrentSong(item.item)} />

        </div>
    );
};

export default Card2;
