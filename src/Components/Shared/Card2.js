import { Icon } from "@iconify/react";

const Card2 = ({ title, imgUrl }) => {
    return (
        <div className="w-full h-48 p-4 transition-transform transform bg-black rounded-lg cursor-pointer bg-opacity-40 hover:scale-105">
            <div className="h-3/5">
                <img
                    className="object-cover w-full h-full rounded-md"
                    src={imgUrl}
                    alt="label"
                />
            </div>
            <div className="overflow-hidden font-semibold text-white">{title}</div>
            <div>
                <Icon icon="octicon:play-24" width="30" height="30" color="white" />
            </div>
        </div>
    );
};

export default Card2;
