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

    // 1. Veriyi Oku
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

    // --- KRİTİK DEĞİŞİKLİK: HASH ID ---
    // URL artık doğru olduğu için, Partner API için geçerli olan Hash ID'yi kullanıyoruz.
    const apiKey = "efecf646749f211b9e0f98bfaba6215c1e710e125"; 

    // Doktor365 Payload
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

    // URL: (Doğru çalışan URL)
    const crmUrl = "https://app.doktor365.com.tr/api/lead/create/";

    const crmResponse = await fetch(crmUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`, // Hash ID burada kullanılıyor
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
