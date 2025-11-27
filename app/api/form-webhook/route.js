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

    const name =
      data['fields[name][value]'] ||
      data.name ||
      'Web Form';

    const rawEmail =
      data['fields[field_555e498][value]'] ||
      data.email ||
      data['fields[email][value]'] ||
      '';

    const email = rawEmail.toString().trim();

    const rawPhone =
      data['fields[field_eae3750][value]'] ||
      data.phone ||
      data['fields[phone][value]'] ||
      '';

    const phone = rawPhone.toString().replace(/[^0-9+]/g, '').trim();

    const message =
      data['fields[message][value]'] ||
      data.message ||
      'Mesaj yok';

    // PARTNER HASH ID
    const apiKey = 'efecf646749f211b9e0f98bfaba6215c1e710e125';
    // Prod'da: const apiKey = process.env.DOKTOR365_HASH_KEY;

    const payload = {
      name: name,
      surname: 'Website',
      email: email,
      phone: phone,
      description: `Web Form Mesajı: ${message}`,
      title: 'Website Form Lead',
      id_source: 1,
      id_country: 1,
      id_treatment_group: 1,
      id_referrer: 1,
      id_staff_sales: 1,
      sonitel_agent_id: 1,
      utm_info: {
        utm_source: 'website',
        utm_medium: 'form',
      },
    };

    console.log('CRM Paket:', payload);

    // ✅ DOĞRU KAPI: "lead" küçük harf
    // İstersen access-token query'sini de bırakabiliriz:
    // const crmUrl = `https://app.doktor365.com.tr/api/lead/create/?access-token=${apiKey}`;
    const crmUrl = 'https://app.doktor365.com.tr/api/lead/create/';

    const crmResponse = await fetch(crmUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Yeni yöntem: Bearer token
        Authorization: `Bearer ${apiKey}`,
        'X-Auth-Token': apiKey,
        token: apiKey,
      },
      body: JSON.stringify(payload),
    });

    console.log('CRM Status:', crmResponse.status);
    console.log(
      'CRM Headers:',
      Object.fromEntries(crmResponse.headers.entries())
    );

    const responseText = await crmResponse.text();
    let crmResult;

    try {
      crmResult = JSON.parse(responseText);
    } catch (e) {
      console.error(
        'CRM JSON yerine başka bir şey döndü (muhtemelen HTML):',
        responseText.substring(0, 200)
      );
      crmResult = {
        error: 'CRM JSON dönmedi',
        raw_head: responseText.substring(0, 200),
      };
    }

    console.log('CRM Sonuç:', crmResult);

    const response = NextResponse.json(
      {
        message: 'Processed',
        crm_status: crmResponse.status,
        crm_id: crmResult?.data?.id,
        crm_raw: crmResult,
      },
      { status: 200 }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error('Hata:', error);
    const errorResponse = NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
    return setCorsHeaders(errorResponse);
  }
}
