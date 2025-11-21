import data from '../../../data/es.json'          // en.json -> es.json
import phone from '../../../data/phone.json'
import lead from '../../../data/lead/es-lead.json' // en-lead.json -> es-lead.json
import HomeClient from '../../../components/HomeClient'

export default function Page() {
      return (
           <>
                <HomeClient
                     lang={data.lang}
                     
                     // --- KESİN ÇÖZÜM ---
                     // JSON'dan çekmek yerine numarayı tırnak içinde buraya yazıyoruz.
                     // Başında + olmadan, sadece rakamlar.
                     phone="905467372284"
                     
                     wp_message={data.wp.wp_message}
                     form={data.form}
                     lead={lead}
                     
                     // Ekranda görünecek yazı (+ işaretli hali)
                     visible_en="+90 (546) 737 22 84"
                     
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
