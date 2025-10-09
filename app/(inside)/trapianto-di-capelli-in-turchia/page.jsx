import data from '../../../data/it.json'
import phone from '../../../data/phone.json'
import lead from '../../../data/lead/it-lead.json'
import HomeClient from '../../../components/HomeClient'

export default function Page() {
     return (
          <>
               <HomeClient
                    lang={data.lang}
                    phone={phone.en}
                    wp_message={data.wp.wp_message}
                    form={data.form}
                    lead={lead}
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
