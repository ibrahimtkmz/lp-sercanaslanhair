import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Web Sitesi Formundan Gelen:", data);

    // Elementor Formları genelde "fields" objesi içinde gönderir veya düz gönderir.
    // Olası tüm ihtimalleri deneyerek veriyi yakalıyoruz:
    
    // Formdaki alan adlarını (Name, Email vb.) kontrol et.
    // Eğer Elementor "Advanced Data" kapalıysa genelde düz gelir.
    const name = data.fields?.name?.value || data.name || data.isim || data.Name || "Web Form";
    const email = data.fields?.email?.value || data.email || data.eposta || "";
    const phone = data.fields?.phone?.value || data.phone || data.telefon || "";
    const message = data.fields?.message?.value || data.message || data.mesaj || "";

    // CRM API Key
    const apiKey = "2e8c1fc41659382da0f23cb40c18b46ae993565a"; 

    // Doktor365 için Veri Paketi
    const payload = {
      "name": name,
      "surname": "Web Basvuru", // Soyad zorunluysa ayırt edici bir şey yazdık
      "email": email,
      "phone": phone,
      "description": `Form Mesajı: ${message}`,
      "title": "Website Form Lead", // Kaynak belli olsun
      
      // ID Ayarları
      "id_source": 1, 
      "id_country": 1,
      "id_treatment_group": 1,
      "id_referrer": 1,
      "id_staff_sales": 1,
      "sonitel_agent_id": 1,
      
      "utm_info": {
        "utm_source": "website",
        "utm_medium": "form",
        "utm_campaign": "contact_page"
      }
    };

    // Doktor365'e Gönder
    const crmResponse = await fetch("https://app.doktor365.com.tr/api/Lead/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const crmResult = await crmResponse.json();

    if (crmResponse.ok) {
      return NextResponse.json({ status: "success", crm_id: crmResult?.data?.id });
    } else {
      return NextResponse.json({ status: "crm_error", details: crmResult }, { status: 500 });
    }

  } catch (error) {
    console.error("Form Hatasi:", error);
    return NextResponse.json({ status: "server_error", error: error.message }, { status: 500 });
  }
}
