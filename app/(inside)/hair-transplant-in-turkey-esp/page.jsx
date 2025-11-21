import data from '../../../data/es.json'          // en.json -> es.json
import phone from '../../../data/phone.json'
import lead from '../../../data/lead/es-lead.json' // en-lead.json -> es-lead.json
import HomeClient from '../../../components/HomeClient'

export default function Page() {
      return (
           <>
                <HomeClient
                     lang={data.lang}
                     
                     // HATA BURADAYDI: phone.es yerine phone.en yapın.
                     // (Numara aynı olduğu için en garantisi budur)
                     phone={phone.en}               
                     
                     wp_message={data.wp.wp_message}
                     form={data.form}
                     lead={lead}
                     
                     // Görünür metin için visible_en veya visible_es kullanabilirsiniz
                     visible_en={phone.visible_en} 
                     
                     variant={data.variant}
                     header={data.header}
                     about={data.about}
                     hero={data.hero}
                     // ... diğerleri aynı kalsın
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
