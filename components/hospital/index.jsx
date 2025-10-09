import './styles.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'

export default function Hospital({ hospital ,lang}) {
     var settings = {
          dots: true,
          lazyLoad: true,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 2,
          rtl: lang == "ar" ? true  : false,
          responsive: [
               {
                    breakpoint: 1100,
                    settings: {
                         slidesToShow: 3,
                         slidesToScroll: 1,
                    },
               },
               {
                    breakpoint: 800,
                    settings: {
                         slidesToShow: 2,
                         slidesToScroll: 1,
                    },
               },
               {
                    breakpoint: 500,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1,
                    },
               },
          ],
     }
     return (
          <section className="hospital">
               <h2>{hospital.title}</h2>
               <Slider {...settings}>
                    {[1, 2, 3, 4,5,6,7,8,9,10].map((_, index) => {
                         return (
                              <div
                                   key={index}
                                   className="hospital-card"
                              >
                                   <Image
                                        src={`/images/c-${index + 1}.jpeg`}
                                        width={300}
                                        height={300}
                                        alt="hospital"
                                        quality={100}
                                   />
                              </div>
                         )
                    })}
               </Slider>
          </section>
     )
}
