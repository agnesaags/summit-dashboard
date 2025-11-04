import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("product_id");

  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/product`,
      { params: { product_id: productId } }
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/product`,
      body
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/product`,
      body
    );
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
