import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Eğer Google Ads webhook datası geldiyse:
    if (body.user_column_data && body.google_key) {
      // 🔒 Güvenlik kontrolü
      if (body.google_key !== "crm") {
        return NextResponse.json(
          { error: "Unauthorized: Invalid key" },
          { status: 401 }
        );
      }

      // Google Ads datasını ayıkla
      const data = body.user_column_data || [];
      const findValue = (name) => {
        const item = data.find((d) =>
          d.column_name.toLowerCase().includes(name.toLowerCase())
        );
        return item ? item.string_value : "";
      };

      const firstName = findValue("first");
      const lastName = findValue("last");
      const phone = findValue("phone");

      const payload = {
        name: firstName,
        surname: lastName,
        email: "",
        phone: phone,
        description: body.is_test
          ? "Google Ads TEST lead"
          : `Google Ads Lead ID: ${body.lead_id}`,
        title: firstName,
        id_source: 14,
        language: "en",
      };

      // 🧪 Test verisi ise CRM'e gönderme, sadece success dön
      if (body.is_test) {
        return NextResponse.json(
          {
            success: true,
            message: "Google Ads test lead received successfully",
            status: "success",
          },
          { status: 200 }
        );
      }

      // 📤 Gerçek lead'i CRM'e gönder
      const crmResponse = await fetch(
        "https://app.doktor365.com.tr/api/lead/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CRM}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await crmResponse.json();

      return NextResponse.json({
        message: "Google Ads lead başarıyla CRM'e gönderildi",
        status: "success",
        data: responseData,
      });
    }

    // Eğer kendi web formundan veri geldiyse:
    const pageInfo = body.page ? `Sayfa: ${body.page}` : "";

    const payload = {
      name: body.name,
      surname: body.surname,
      email: body.email,
      phone: body.phone,
      description: pageInfo,
      title: body.name,
      id_source: 14,
      language: body.language,
    };

    const crmResponse = await fetch(
      "https://app.doktor365.com.tr/api/lead/create/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CRM}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const responseData = await crmResponse.json();

    return NextResponse.json({
      message: "Form datası başarıyla alındı ve CRM'e gönderildi",
      status: "success",
      data: responseData,
    });
  } catch (error) {
    console.error("CRM lead error:", error);
    return NextResponse.json(
      { error: "An error occurred", detail: String(error) },
      { status: 500 }
    );
  }
}
  
