import { NextResponse } from "next/server";
import pool from "../../../../lib/db";

export async function GET(request, { params }) {
  const { articleId } = params;

  try {
    const [rows] = await pool.query(
      "SELECT reaction, count FROM reactions WHERE article_id = ?",
      [articleId]
    );

    const reactionCounts = {
      like: 0,
      love: 0,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0,
    };

    rows.forEach((row) => {
      reactionCounts[row.reaction] = row.count;
    });

    return NextResponse.json(reactionCounts);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  const { articleId } = params;
  const { reaction, oldReaction } = await request.json();

  try {
    await pool.query("START TRANSACTION");

    if (oldReaction) {
      await pool.query(
        "UPDATE reactions SET count = GREATEST(count - 1, 0) WHERE article_id = ? AND reaction = ?",
        [articleId, oldReaction]
      );
    }

    await pool.query(
      "INSERT INTO reactions (article_id, reaction, count) VALUES (?, ?, 1) ON DUPLICATE KEY UPDATE count = count + 1",
      [articleId, reaction]
    );

    await pool.query("COMMIT");

    const [rows] = await pool.query(
      "SELECT reaction, count FROM reactions WHERE article_id = ?",
      [articleId]
    );

    const reactionCounts = {
      like: 0,
      love: 0,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0,
    };

    rows.forEach((row) => {
      reactionCounts[row.reaction] = row.count;
    });

    return NextResponse.json(reactionCounts);
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { articleId } = params;
  const { reaction } = await request.json();

  try {
    await pool.query(
      "UPDATE reactions SET count = GREATEST(count - 1, 0) WHERE article_id = ? AND reaction = ?",
      [articleId, reaction]
    );

    const [rows] = await pool.query(
      "SELECT reaction, count FROM reactions WHERE article_id = ?",
      [articleId]
    );

    const reactionCounts = {
      like: 0,
      love: 0,
      haha: 0,
      wow: 0,
      sad: 0,
      angry: 0,
    };

    rows.forEach((row) => {
      reactionCounts[row.reaction] = row.count;
    });

    return NextResponse.json(reactionCounts);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
