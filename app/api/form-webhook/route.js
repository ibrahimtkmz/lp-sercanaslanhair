import { NextResponse } from 'next/server';

// CORS Ayarları (WordPress/Elementor erişimi için)
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

    console.log("Elementor Gelen Veri:", data);

    // 2. Verileri Eşleştir
    const name = data['fields[name][value]'] || data.name || "Web Form";
    const rawEmail = data['fields[field_555e498][value]'] || data.email || data['fields[email][value]'] || "";
    const email = rawEmail.toString().trim();
    const rawPhone = data['fields[field_eae3750][value]'] || data.phone || data['fields[phone][value]'] || "";
    const phone = rawPhone.toString().replace(/[^0-9+]/g, "").trim();
    const message = data['fields[message][value]'] || data.message || "Mesaj yok";

    // --- GENEL API KEY ---
    // URL düzgünken (slash'lı) GENEL KEY'i deniyoruz.
    const apiKey = "2e8c1fc41659382da0f23cb40c18b46ae993565a"; 

    // Payload
    const payload = {
      "name": name,
      "surname": phone || "NoPhone",
      "email": email,
      "phone": phone,
      "description": `Web Form Mesajı: ${message}`,
      "title": "Website Form Lead",
      "id_source": 1, 
      "id_country": 1,
      "id_treatment_group": 1,
      "id_referrer": 1,
      "id_staff_sales": 1,
      "sonitel_agent_id": 1,
      "utm_info": {
        "utm_source": "website",
        "utm_medium": "form"
      }
    };

    console.log("CRM Paket:", payload);

    // URL: Küçük harf 'lead' ve sonda SLASH '/' 
    // Parametre: access-token olarak GENEL API KEY'i veriyoruz.
    const crmUrl = `https://app.doktor365.com.tr/api/lead/create/?access-token=${apiKey}`;

    const crmResponse = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Header'a da koyuyoruz
        "Authorization": `Bearer ${apiKey}`,
        // Bizi gerçek bir tarayıcı gibi göstersin diye ek başlıklar:
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://lp.sercanaslanhair.com",
        "Origin": "https://lp.sercanaslanhair.com",
        "X-Requested-With": "XMLHttpRequest"
      },
      body: JSON.stringify(payload)
    });

    const responseText = await crmResponse.text();
    let crmResult;
    try {
        crmResult = JSON.parse(responseText);
    } catch (e) {
        console.error("CRM HTML Döndü:", responseText.substring(0, 200)); 
        crmResult = { error: "CRM HTML döndürdü", raw_head: responseText.substring(0, 100) };
    }

    console.log("CRM Sonuç:", crmResult);

    const response = NextResponse.json({ 
      message: 'Processed', 
      crm_id: crmResult?.data?.id 
    }, { status: 200 });

    return setCorsHeaders(response);

  } catch (error) {
    console.error("Hata:", error);
    const errorResponse = NextResponse.json({ status: "error", message: error.message }, { status: 200 });
    return setCorsHeaders(errorResponse);
  }
}
