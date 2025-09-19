import pool from "@/lib/db";

// Get one work by ID (GET /api/work/[id])
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const [rows] = await pool.query("SELECT * FROM work WHERE w_id = ?", [id]);

    if (rows.length === 0) {
      return new Response("Work not found", { status: 404 });
    }
    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    console.error("Error fetching work:", error);
    return new Response("Failed to fetch work", { status: 500 });
  }
}

// Update work by ID (PUT /api/work/[id])
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { company, role, work_experience, profile_id } = await req.json();
    const [result] = await pool.query(
      "UPDATE work SET company=?, role=?, work_experience=?, profile_id=? WHERE w_id=?",
      [company, role, work_experience, profile_id, id]
    );

    if (result.affectedRows === 0) {
      return new Response("Work not found", { status: 404 });
    }

    return new Response(JSON.stringify({ message: "Work updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error updating work:", error);
    return new Response("Failed to update work", { status: 500 });
  }
}

// Delete work by ID (DELETE /api/work/[id])
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const [result] = await pool.query("DELETE FROM work WHERE w_id=?", [id]);

    if (result.affectedRows === 0) {
      return new Response("Work not found", { status: 404 });
    }
    return new Response("Work deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting work:", error);
    return new Response("Failed to delete work", { status: 500 });
  }
}