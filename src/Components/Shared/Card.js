const Card = ({ title, imgUrl }) => {
    return (
        <div className="w-full h-48 p-4 transition-transform transform bg-black rounded-lg cursor-pointer bg-opacity-40 hover:scale-105">
            <div className="h-3/5">
                <img className="object-cover rounded-md " src={imgUrl} alt="label" />
            </div>
            <div className="py-1 font-semibold text-white">{title}</div>
        </div>
    );
}

export default Card