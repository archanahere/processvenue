import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

// Create MySQL connection
async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "processvenue",
  });
}

// GET all profiles
export async function GET() {
  try {
    const conn = await getConnection();
    const [rows] = await conn.execute("SELECT * FROM profiles");
    await conn.end();
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create profile
export async function POST(req) {
  try {
    const { name, email, details } = await req.json();
    const conn = await getConnection();
    await conn.execute(
      "INSERT INTO profiles (name, email, details) VALUES (?, ?, ?)",
      [name, email, details]
    );
    await conn.end();
    return NextResponse.json({ message: "Profile created" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update profile
export async function PUT(req) {
  try {
    const { id, name, email, details } = await req.json();
    const conn = await getConnection();
    await conn.execute(
      "UPDATE profiles SET name=?, email=?, details=? WHERE id=?",
      [name, email, details, id]
    );
    await conn.end();
    return NextResponse.json({ message: "Profile updated" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE profile
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    const conn = await getConnection();
    await conn.execute("DELETE FROM profiles WHERE id=?", [id]);
    await conn.end();
    return NextResponse.json({ message: "Profile deleted" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
