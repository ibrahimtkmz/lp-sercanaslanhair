import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import './styles.css'
import LottieComponent from '../lottie'
import animation from '@/public/animation/world.json'
import WpLink from '../wp'

const Videos = ({ videos, phone, wp_message }) => {
     return (
          <section className="videos">
               <div className="videos-inner">
                    <div className="video-animation">
                         <LottieComponent animation={animation} />
                         <h2 dangerouslySetInnerHTML={{ __html: videos.title }} />
                    </div>
                    <Swiper
                         id="videos-swiper"
                         spaceBetween={10}
                         slidesPerView={2}
                         initialSlide={1}
                         centeredSlides={true}
                         slideToClickedSlide={true}
                         pagination={{ el: '.swiper-pagination', type: 'bullets' }}
                         breakpoints={{
                              768: { loop: true, slidesPerView: 3, spaceBetween: 30 },
                         }}
                    >
                         <SwiperSlide className={`swiper-slide `}>
                              <div className="swiper-slide-overlay"></div>
                              <iframe
                                   src="https://www.youtube.com/embed/F6GN8G6Ovdg?si=fCop0lWaszQWWK4x"
                                   allow=" accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                   loading="lazy"
                              ></iframe>
                         </SwiperSlide>
                         <SwiperSlide className={`swiper-slide `}>
                              <div className="swiper-slide-overlay"></div>
                              <iframe
                                   src="https://www.youtube.com/embed/Nl_qjrbQPdw?si=8k8u4q_36LV8TR-C"
                                   allow=" accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                   loading="lazy"
                              ></iframe>
                         </SwiperSlide>
                         <SwiperSlide className={`swiper-slide `}>
                              <div className="swiper-slide-overlay"></div>
                              <iframe
                                   src="https://www.youtube.com/embed/tgnZanZgwJ0?si=MJWX0QgDpO5i-omg"
                                   allow=" accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                   loading="lazy"
                              ></iframe>
                         </SwiperSlide>
                         <SwiperSlide className={`swiper-slide `}>
                              <div className="swiper-slide-overlay"></div>
                              <iframe
                                   src="https://www.youtube.com/embed/iXEdbXtaYm4?si=VuA_cwBEQc6Oq_wt"
                                   allow=" accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                   loading="lazy"
                              ></iframe>
                         </SwiperSlide>
                         <SwiperSlide className={`swiper-slide`}>
                              <div className="swiper-slide-overlay"></div>
                              <iframe
                                   src="https://www.youtube.com/embed/PUPPTiSZImE?si=m0G0nDgGSdnqvy3h"
                                   allow=" accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                   loading="lazy"
                              ></iframe>
                         </SwiperSlide>
                         <SwiperSlide className={`swiper-slide `}>
                              <div className="swiper-slide-overlay"></div>
                              <iframe
                                   src="https://www.youtube.com/embed/4TaoD1cRLuk?si=zD_PyDV6Xv1xparR"
                                   allow=" accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                                   loading="lazy"
                              ></iframe>
                         </SwiperSlide>
                         <div className="swiper-pagination"></div>
                    </Swiper>
                    <WpLink
                         phone={phone}
                         wp_message={wp_message}
                         title={videos.button}
                    />
               </div>
          </section>
     )
}

export default Videos
