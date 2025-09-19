import pool from "@/lib/db";

// GET all projects
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT projects.*, profiles.name as profile_name
      FROM projects
      LEFT JOIN profiles ON projects.profileid = profiles.id
      ORDER BY projects.created_at DESC
    `);
    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (err) {
    console.error("Error fetching projects:", err);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}

// POST new project
export async function POST(req) {
  try {
    const { pname, description, profileid, links } = await req.json();
    const [result] = await pool.query(
      "INSERT INTO projects (pname, description, profileid, links) VALUES (?, ?, ?, ?)",
      [pname, description, profileid, links]
    );

    return new Response(JSON.stringify({ message: "Project added", pid: result.insertId }), {
      status: 201,
    });
  } catch (err) {
    console.error("Error adding project:", err);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}
