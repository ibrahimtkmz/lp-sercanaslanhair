import { NextResponse } from 'next/server';

// 1. CORS Ayarları
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

    // --- KRİTİK DÜZELTME BAŞLANGICI ---
    // Gelen veri JSON mu yoksa Form Data mı kontrol et
    if (contentType.includes('application/json')) {
      // Eğer JSON gelirse (İdeal olan)
      data = await request.json();
    } else {
      // Eğer Form Data gelirse (Şu an aldığın hata bunun için)
      const formData = await request.formData();
      // FormData'yı düz objeye çevir
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }
    console.log("İşlenmiş Veri:", data);
    // --- KRİTİK DÜZELTME BİTİŞİ ---

    // Verileri Yakalama (Her türlü ihtimale karşı)
    // Elementor bazen 'fields[name]' bazen direkt 'name' gönderir.
    const name = data.name || data['fields[name][value]'] || data['form_fields[name]'] || "Web Form";
    const email = data.email || data['fields[email][value]'] || data['form_fields[email]'] || "";
    // Telefonu temizle (boşlukları sil)
    let rawPhone = data.phone || data['fields[phone][value]'] || data['form_fields[phone]'] || "";
    // Eğer array gelirse (bazen olur) ilkini al, string ise temizle
    const phone = Array.isArray(rawPhone) ? rawPhone[0] : rawPhone.toString().replace(/[^0-9+]/g, "");
    
    const message = data.message || data['fields[message][value]'] || data['form_fields[message]'] || "Mesaj yok";

    const apiKey = "2e8c1fc41659382da0f23cb40c18b46ae993565a";

    // Doktor365 Payload
    const payload = {
      "name": name,
      "surname": phone, // Soyad olarak numarayı yazıyoruz ki belli olsun
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

    const crmResult = await crmResponse.json();
    console.log("CRM Cevabı:", crmResult);

    const response = NextResponse.json({ 
      message: 'Processed successfully', 
      crm_id: crmResult?.data?.id 
    }, { status: 200 });

    return setCorsHeaders(response);

  } catch (error) {
    console.error("Webhook Hatası:", error);
    // Hata olsa bile 200 dönelim, Elementor kullanıcıya hata göstermesin. Biz logdan bakarız.
    const errorResponse = NextResponse.json({ status: "error", message: error.message }, { status: 200 });
    return setCorsHeaders(errorResponse);
  }
}
