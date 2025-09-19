import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import pool from "@/lib/db"; 
// Database connection
async function getConnection() {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "processvenue",
  });
}

// GET all projects
// export async function GET() {
//   try {
//     const conn = await getConnection();
//     const [rows] = await conn.execute(`
//       SELECT p.pid, p.pname, p.description, p.links, p.created_at, pr.name AS profile_name 
//       FROM projects p
//       LEFT JOIN profiles pr ON p.profileid = pr.id
//     `);
//     await conn.end();
//     return NextResponse.json(rows);
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }


// GET all projects
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT projects.*, profiles.name as profile_name
      FROM projects 
      LEFT JOIN profiles ON projects.profileid = profiles.id
      ORDER BY projects.created_at DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
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

    return NextResponse.json({ id: result.insertId, pname, description, profileid, links });
  } catch (error) {
    console.error("Error inserting project:", error);
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 });
  }
}

// // POST create project
// export async function POST(req) {
//   try {
//     const { pname, description, profileid, links } = await req.json();
//     const conn = await getConnection();
//     await conn.execute(
//       "INSERT INTO projects (pname, description, profileid, links) VALUES (?, ?, ?, ?)",
//       [pname, description, profileid, links]
//     );
//     await conn.end();
//     return NextResponse.json({ message: "Project created" }, { status: 201 });
//   } catch (err) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// DELETE project by ID
export async function DELETE(req, { params }) {
  const { id } = await context.params;

  try {
    const [result] = await pool.query("DELETE FROM projects WHERE pid = ?", [id]);

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Project not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Project deleted" }), { status: 200 });
  } catch (err) {
    console.error("Error deleting project:", err);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}


//Update project by ID
export async function PUT(req, { params }) {
  const { id } = params; // no await needed
  const { pname, description, profileid, links } = await req.json();

  try {
    const [result] = await pool.query(
      "UPDATE projects SET pname=?, description=?, profileid=?, links=? WHERE pid=?",
      [pname, description, profileid, links, id]
    );

    if (result.affectedRows === 0) {
      return new Response(JSON.stringify({ error: "Project not found" }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Project updated successfully" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Error updating project:", err);
    return new Response(JSON.stringify({ error: "Database error" }), { status: 500 });
  }
}


