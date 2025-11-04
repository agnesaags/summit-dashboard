import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const search = searchParams.get("search") || "";

  try {
    const response = await axios.get("https://fakestoreapi.com/products");

    // Format ulang agar sesuai interface Product di frontend
    const products = response.data.map((p: any) => ({
      product_id: String(p.id),
      product_title: p.title,
      product_price: p.price,
      product_description: p.description,
      product_category: p.category,
      product_image: p.image,
      created_timestamp: new Date().toISOString(),
      updated_timestamp: new Date().toISOString(),
    }));

    return NextResponse.json({ data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
