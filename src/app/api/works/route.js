import pool from "@/lib/db";

// Create new work experience (POST /api/work)
export async function POST(req) {
  try {
    const { company, role, work_experience, profile_id } = await req.json();
    const [result] = await pool.query(
      "INSERT INTO work (company, role, work_experience, profile_id) VALUES (?, ?, ?, ?)",
      [company, role, work_experience, profile_id]
    );
    return new Response(JSON.stringify({ id: result.insertId, company, role, work_experience, profile_id }), { status: 201 });
  } catch (error) {
    console.error("Error creating work:", error);
    return new Response("Failed to create work", { status: 500 });
  }
}

// Get all work experiences (GET /api/work)
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM work");
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching work:", error);
    return new Response("Failed to fetch work", { status: 500 });
  }
}