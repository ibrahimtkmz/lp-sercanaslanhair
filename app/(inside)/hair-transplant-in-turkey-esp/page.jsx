import data from '../../../data/es.json'           // İspanyolca içerik
import phone from '../../../data/phone.json'       // Telefon verisi (Bunu tekrar import etmelisiniz!)
import lead from '../../../data/lead/es-lead.json' // İspanyolca form
import HomeClient from '../../../components/HomeClient'

export default function Page() {
      return (
           <>
                <HomeClient
                     lang={data.lang}
                     
                     // DİKKAT: Çalışan kodda "phone.en" kullanılmış.
                     // Numara aynı olduğu için biz de maceraya girmeyip çalışan kaynağı kullanıyoruz.
                     phone={phone.en} 
                     
                     wp_message={data.wp.wp_message}
                     form={data.form}
                     lead={lead}
                     
                     // DİKKAT: Çalışan kodda görünür numara "phone.visible_en"den geliyor.
                     visible_en={phone.visible_en}
                     
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
