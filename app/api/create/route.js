import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // Sayfa bilgisini description alanına ekliyoruz
    const pageInfo = body.page ? `Sayfa: ${body.page}` : "";

    const payload = {
      name: body.name,
      surname: body.surname,
      email: body.email,
      phone: body.phone,
      description: pageInfo, // sayfa bilgisi buraya yazılıyor
      title: body.name,
      id_source: 14,
      language: body.language,
    };

    const crmResponse = await fetch("https://app.doktor365.com.tr/api/lead/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CRM}`,
      },
      body: JSON.stringify(payload),
    });

    const responseData = await crmResponse.json();

    return NextResponse.json({
      message: "Data received successfully",
      status: "success",
      data: responseData,
    });
  } catch (error) {
    console.error("CRM lead error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
