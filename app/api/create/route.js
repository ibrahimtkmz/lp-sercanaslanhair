import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    let url = "https://app.doktor365.com.tr/api/lead/create/";
    const body = await request.json();

    const createLead = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CRM}`,
      },
      body: JSON.stringify({
        name: body.name,
        surname: body.surname,
        email: body.email,
        phone: body.phone,
        description: "",
        title: body.name,
        id_source: 14,
        language: body.language,
      }),
    });

    const response = await createLead.json();

    // Example response
    return NextResponse.json({
      message: "Data received successfully",
      status: "success",
      data: response,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
