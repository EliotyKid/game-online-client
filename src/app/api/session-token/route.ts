// // app/api/get-cookies/route.ts
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// export async function GET() {
//   const cookieStore = await cookies(); // ✅ usar await

//   // Pegar um cookie específico
//   const myCookie = cookieStore.get("myCookieName")?.value || null;

//   // Pegar todos os cookies como objeto
//   const allCookies: Record<string, string> = {};
//   cookieStore.getAll().forEach(cookie => {
//     allCookies[cookie.name] = cookie.value;
//   });

//   return NextResponse.json({
//     allCookies,
//     myCookie
//   });
// }
// app/api/session-token/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth"; // seu Auth.js v5

export async function GET() {
  // pega a sessão diretamente, sem argumentos
  const session = await auth(); 

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // token do Discord OAuth
  const token = (session as any).sessionToken || null;

  return NextResponse.json({ token });
}
