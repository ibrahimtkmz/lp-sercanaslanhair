import './styles.css'
import Image from 'next/image'
export default function Icons({ icons }) {
     return (
          <section className="icons">
               <div className="icons-inner">
                    {icons.all_icons.map((item, i) => {
                         return (
                              <div
                                   key={i}
                                   className="icon"
                              >
                                   <Image
                                        src={`/images/icon-${i + 1}.png`}
                                        width={62}
                                        height={40}
                                        unoptimized
                                        style={{ height: 'auto' }}
                                        alt={item}
                                   />
                                   <h3 dangerouslySetInnerHTML={{ __html: item }} />
                              </div>
                         )
                    })}
               </div>
          </section>
     )
}
