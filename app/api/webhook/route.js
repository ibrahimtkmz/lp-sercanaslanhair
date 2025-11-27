import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // 1. WApifly'dan gelen veriyi al
    const data = await request.json();
    console.log("WApifly Gelen Veri:", data);

    // WApifly'dan gelen veriler (Örnek: data.from = gönderen no, data.body = mesaj)
    const senderPhone = data.from || "";
    const messageBody = data.body || "";

    // Eğer mesaj yoksa veya numara yoksa işlemi durdur (Boş yere CRM'i yorma)
    if (!senderPhone) {
      return NextResponse.json({ status: "error", message: "Telefon numarasi yok" }, { status: 400 });
    }

    // 2. Doktor365 için Hazırlık
    // API Key (Ekran görüntüsündeki uzun anahtar)
    const apiKey = "2e8c1fc41659382da0f23cb40c18b46ae993565a"; 
    
    // CRM'e gidecek veri paketi
    const payload = {
      "name": "WhatsApp",        // Adı bilinmiyor, WhatsApp yazıyoruz
      "surname": senderPhone,    // Soyad yerine numarayı yazalım ki listede belli olsun
      "email": "",               // WhatsApp'ta email gelmez, boş bırakıyoruz
      "phone": senderPhone,      // Gönderen numara
      "description": `Gelen Mesaj: ${messageBody}`, // Mesaj içeriği nota eklenir
      "title": "WhatsApp Lead",  // Kayıt Başlığı
      
      // Aşağıdaki ID'ler zorunlu görünüyor, varsayılan 1 gönderiyoruz.
      // Eğer hata alırsak Doktor365 panelinden doğru ID'leri öğrenmeliyiz.
      "id_source": 1, 
      "id_country": 1,
      "id_treatment_group": 1,
      "id_referrer": 1,
      "id_staff_sales": 1,
      "sonitel_agent_id": 1,
      
      "utm_info": {
        "utm_source": "whatsapp",
        "utm_medium": "message",
        "utm_campaign": "wapifly"
      }
    };

    // 3. Doktor365'e Gönder (Fetch ile)
    const crmResponse = await fetch("https://app.doktor365.com.tr/api/Lead/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}` // Dokümantasyondaki Bearer Token yöntemi
      },
      body: JSON.stringify(payload)
    });

    const crmResult = await crmResponse.json();
    console.log("Doktor365 Cevabi:", crmResult);

    // 4. Sonucu Döndür
    if (crmResponse.ok) {
      return NextResponse.json({ status: "success", crm_id: crmResult?.data?.id });
    } else {
      return NextResponse.json({ status: "crm_error", details: crmResult }, { status: 500 });
    }

  } catch (error) {
    console.error("Webhook Hatasi:", error);
    return NextResponse.json({ status: "server_error", error: error.message }, { status: 500 });
  }
}
