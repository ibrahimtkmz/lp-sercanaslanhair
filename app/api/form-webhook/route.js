import { NextResponse } from 'next/server';

function setCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(response);
}

export async function POST(request) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let data = {};

    // 1. Veriyi Oku (JSON veya Form Data)
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    console.log("Elementor Gelen Ham Veri:", data);

    // 2. Elementor ID'lerini Eşleştir (Loglardan aldığımız ID'ler buraya girildi)
    // İsim: 'fields[name][value]'
    // Telefon: 'fields[field_eae3750][value]'
    // Email: 'fields[field_555e498][value]'
    // Mesaj: 'fields[message][value]'

    const name = data['fields[name][value]'] || data.name || "Web Form";
    
    // Loglarda görülen özel ID'yi buraya ekledik:
    const rawEmail = data['fields[field_555e498][value]'] || data.email || data['fields[email][value]'] || "";
    const email = rawEmail.toString().trim();

    // Loglarda görülen özel ID'yi buraya ekledik:
    const rawPhone = data['fields[field_eae3750][value]'] || data.phone || data['fields[phone][value]'] || "";
    // Telefon temizliği
    const phone = rawPhone.toString().replace(/[^0-9+]/g, "").trim();
    
    const message = data['fields[message][value]'] || data.message || "Mesaj yok";

    const apiKey = "2e8c1fc41659382da0f23cb40c18b46ae993565a";

    // Eğer telefon boşsa hata dönmesin ama log düşsün
    if (!phone) {
       console.log("HATA: Telefon numarası bulunamadı. Gelen veriyi kontrol et.");
    }

    // Doktor365 Payload
    const payload = {
      "name": name,
      "surname": phone || "NoPhone", // Soyad boş gitmesin
      "email": email,
      "phone": phone,
      "description": `Web Form Mesajı: ${message}`,
      "title": "Website Form Lead",
      "id_source": 1,
      "id_country": 1,
      "id_treatment_group": 1,
      "id_referrer": 1,
      "id_staff_sales": 1,
      "sonitel_agent_id": 1
    };

    console.log("CRM'e Giden Paket:", payload);

    // CRM'e Gönder
    const crmResponse = await fetch("https://app.doktor365.com.tr/api/Lead/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    // CRM yanıtını metin olarak alıp kontrol edelim (HTML hatası gelirse parse edemeyiz)
    const responseText = await crmResponse.text();
    let crmResult;
    try {
        crmResult = JSON.parse(responseText);
    } catch (e) {
        console.error("CRM JSON döndürmedi. HTML Hatası olabilir:", responseText);
        crmResult = { error: "CRM HTML döndürdü", raw: responseText };
    }

    console.log("CRM Sonuç:", crmResult);

    const response = NextResponse.json({ 
      message: 'Processed', 
      crm_id: crmResult?.data?.id 
    }, { status: 200 });

    return setCorsHeaders(response);

  } catch (error) {
    console.error("Genel Hata:", error);
    const errorResponse = NextResponse.json({ status: "error", message: error.message }, { status: 200 });
    return setCorsHeaders(errorResponse);
  }
}
