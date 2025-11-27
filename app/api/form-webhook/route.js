import { NextResponse } from 'next/server';

// 1. CORS Ayarları (WordPress'in erişmesine izin ver)
function setCorsHeaders(response) {
  response.headers.set('Access-Control-Allow-Origin', '*'); // Her yerden gelen isteğe izin ver
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

// 2. Preflight İsteği (Tarayıcı kontrolü için)
export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  return setCorsHeaders(response);
}

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("Web Sitesi Form Gelen:", data);

    // Form verilerini güvenli şekilde al
    // Elementor bazen düz, bazen 'fields' içinde gönderir.
    const name = data.name || data.fields?.name?.value || data.isim || "Isimsiz";
    const email = data.email || data.fields?.email?.value || "";
    const phone = data.phone || data.fields?.phone?.value || data.telefon || "";
    const message = data.message || data.fields?.message?.value || "Mesaj yok";

    const apiKey = "2e8c1fc41659382da0f23cb40c18b46ae993565a";

    // Doktor365 Payload
    const payload = {
      "name": name,
      "surname": phone, // Soyad zorunluysa telefon numarasını yazıyoruz
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

    // CRM'e Gönder
    const crmResponse = await fetch("https://app.doktor365.com.tr/api/Lead/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    const crmResult = await crmResponse.json();

    // Başarılı Cevap Dön
    const response = NextResponse.json({ 
      message: 'Form sent successfully', 
      crm_id: crmResult?.data?.id 
    }, { status: 200 });

    return setCorsHeaders(response);

  } catch (error) {
    console.error("Hata:", error);
    // Hata olsa bile 200 dönelim ki Elementor hata mesajı göstermesin, loglara baksın
    const errorResponse = NextResponse.json({ 
      status: "error", 
      message: error.message 
    }, { status: 200 });
    return setCorsHeaders(errorResponse);
  }
}
