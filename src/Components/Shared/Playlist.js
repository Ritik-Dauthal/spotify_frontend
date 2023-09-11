import Card from '../Shared/Card'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const PlaylistView = ({ titleText, cardsData }) => {

    return (
        <div className="w-full mt-8">
            <div className="mb-5 text-2xl font-semibold text-white">{titleText}</div>
            <Swiper

                slidesPerView={3}
                spaceBetween={30}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
            >
                {cardsData.map((item, index) => {
                    return <SwiperSlide key={index}>
                        <Card
                            title={item.title}
                            imgUrl={item.imgUrl}
                        />
                    </SwiperSlide>
                }
                )}
            </Swiper>

        </div>
    );
};

export default PlaylistView