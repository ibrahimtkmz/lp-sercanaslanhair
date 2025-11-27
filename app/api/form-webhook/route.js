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

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    console.log("Elementor Gelen Veri:", data);

    const name = data['fields[name][value]'] || data.name || "Web Form";
    const rawEmail = data['fields[field_555e498][value]'] || data.email || data['fields[email][value]'] || "";
    const email = rawEmail.toString().trim();
    const rawPhone = data['fields[field_eae3750][value]'] || data.phone || data['fields[phone][value]'] || "";
    const phone = rawPhone.toString().replace(/[^0-9+]/g, "").trim();
    const message = data['fields[message][value]'] || data.message || "Mesaj yok";

    // --- PARTNER HASH ID ---
    // Bu ID, Partner API tablosundan alındı.
    const apiKey = "efecf646749f211b9e0f98bfaba6215c1e710e125"; 

    // --- STRATEJİ: ANAHTARI GÖVDEYE GÖMMEK ---
    // Bazı CRM'ler anahtarı header yerine verinin içinde "token" veya "hash" olarak bekler.
    const payload = {
      "token": apiKey,   // Deneme 1
      "hash": apiKey,    // Deneme 2
      "api_key": apiKey, // Deneme 3
      "name": name,
      "surname": phone || "NoPhone",
      "email": email,
      "phone": phone,
      "description": `Web Form Mesajı: ${message}`,
      "title": "Website Form Lead",
      
      // ID'leri string olarak da gönderelim, bazen sayı kabul etmezler
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

    // URL'e de eklemeye devam ediyoruz (Çift dikiş)
    const crmUrl = `https://app.doktor365.com.tr/api/lead/create/?access-token=${apiKey}`;

    const crmResponse = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Header'da Partner Hash ID
        "Authorization": `Bearer ${apiKey}`,
        // Alternatif Başlıklar
        "X-Partner-Key": apiKey,
        // Browser Taklidi
        "User-Agent": "Mozilla/5.0 (Compatible; FormWebhook/1.0)",
        "Referer": "https://lp.sercanaslanhair.com",
        "Origin": "https://lp.sercanaslanhair.com"
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
