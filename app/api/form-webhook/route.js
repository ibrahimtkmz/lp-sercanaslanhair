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

    // JSON veya form-data
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        data[key] = value;
      });
    }

    console.log('Elementor Gelen Veri:', data);

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

    // 🔑 Üstteki "Api Key"
    const apiKey = '2e8c1fc41659382ad0df23cb40c18b4aea993565a';
    // Prod'da: const apiKey = process.env.DOKTOR365_API_KEY;

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

    // ✅ Doğru endpoint + access-token query param
    const crmUrl = `https://app.doktor365.com.tr/api/lead/create/?access-token=${apiKey}`;

    let crmStatus = null;
    let crmResult = null;

    try {
      const crmResponse = await fetch(crmUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // DİKKAT: Authorization header YOK
        },
        body: JSON.stringify(payload),
      });

      crmStatus = crmResponse.status;
      const responseText = await crmResponse.text();

      try {
        crmResult = JSON.parse(responseText);
      } catch (e) {
        console.error(
          'CRM JSON yerine başka bir şey döndü:',
          responseText.substring(0, 200)
        );
        crmResult = {
          error: 'CRM JSON dönmedi',
          raw_head: responseText.substring(0, 200),
        };
      }
    } catch (e) {
      console.error('CRM isteği sırasında hata:', e);
      crmStatus = 'fetch_error';
      crmResult = { error: e.message };
    }

    console.log('CRM Status:', crmStatus);
    console.log('CRM Sonuç:', crmResult);

    const response = NextResponse.json(
      {
        ok: true,
        message: 'Webhook processed',
        crm_status: crmStatus,
        crm_raw: crmResult,
      },
      { status: 200 }
    );

    return setCorsHeaders(response);
  } catch (error) {
    console.error('route.js GENEL HATA:', error);

    const fallbackResponse = NextResponse.json(
      {
        ok: false,
        message: 'Webhook internal error',
        error: error.message,
      },
      { status: 200 }
    );
    return setCorsHeaders(fallbackResponse);
  }
}
