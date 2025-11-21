import data from '../../../data/es.json'
import lead from '../../../data/lead/es-lead.json'
import HomeClient from '../../../components/HomeClient'

export default function Page() {
      // Telefon numarasını buraya sabitliyoruz, hata şansı kalmıyor.
      const phoneNumber = "905467372284"; 
      const visibleNumber = "+90 (546) 737 22 84";

      return (
           <>
                <HomeClient
                     lang={data.lang}
                     
                     // KESİN ÇÖZÜM: Numarayı doğrudan string olarak veriyoruz
                     phone={phoneNumber}               
                     
                     wp_message={data.wp.wp_message}
                     form={data.form}
                     lead={lead}
                     
                     // HomeClient kodunda 'phone_visible={props.visible_en}' yazdığı için
                     // prop ismini mecburen 'visible_en' olarak bırakıyoruz.
                     visible_en={visibleNumber}
                     
                     variant={data.variant}
                     header={data.header}
                     about={data.about}
                     hero={data.hero}
                     steps={data.steps}
                     reviews={data.reviews}
                     price={data.price}
                     services={data.services}
                     before_after={data.before_after}
                     certificates={data.certificates}
                     icons={data.iconsGroup}
                     hospital={data.hospital}
                     types={data.procedures}
                     faq={data.faq}
                     footer={data.footer}
                />
           </>
      )
}
