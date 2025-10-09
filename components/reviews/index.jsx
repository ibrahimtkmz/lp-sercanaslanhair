import Image from 'next/image'
import React from 'react'
import Slider from 'react-slick'
import './styles.css'
import WpLink from '../wp'

export default function Reviews({ reviews, wp_message, phone,lang }) {
     var settings = {
          dots: true,
          lazyLoad: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          rtl: lang == "ar" ? true  : false,
          responsive: [
               {
                    breakpoint: 600,
                    settings: {
                         slidesToShow: 1,
                         slidesToScroll: 1,
                    },
               },
          ],
     }
     return (
          <section
               className="reviews"
               id="reviews"
          >
               <div className="reviews-inner">
                    <header>
                         <h2 dangerouslySetInnerHTML={{ __html: reviews.title }} />
                         <span dangerouslySetInnerHTML={{ __html: reviews.description }} />
                    </header>
                    <Slider {...settings}>
                         {reviews.all_reviews.map((review, i) => {
                              return (
                                   <div
                                        className="review-slider-card"
                                        key={i}
                                   >
                                        <article>
                                             <h3
                                                  dangerouslySetInnerHTML={{
                                                       __html: review.name,
                                                  }}
                                             />
                                             <Image
                                                  src={'/images/star.png'}
                                                  width={140}
                                                  height={19}
                                                  style={{ height: 'auto' }}
                                                  alt="star"
                                             />
                                             <p
                                                  dangerouslySetInnerHTML={{
                                                       __html: review.review,
                                                  }}
                                             />
                                             <span>{review.date}</span>
                                             <WpLink
                                                  wp_message={wp_message}
                                                  phone={phone}
                                                  title={reviews.button}
                                             />
                                        </article>
                                   </div>
                              )
                         })}
                    </Slider>
               </div>
          </section>
     )
}
