import { pool } from "../config/database.js";

/**
 * UserRepository — единственная точка работы с таблицей users.
 * Никакой бизнес-логики — только SQL.
 */
export const UserRepository = {
  async findByLogin(login) {
    const { rows } = await pool.query(
      "SELECT id, login, email, password_hash FROM users WHERE login = $1",
      [login],
    );
    return rows[0] || null;
  },

  async findByEmail(email) {
    const { rows } = await pool.query(
      "SELECT id, login, email, password_hash FROM users WHERE email = $1",
      [email],
    );
    return rows[0] || null;
  },

  async findById(id) {
    const { rows } = await pool.query(
      "SELECT id, login, email, password_hash FROM users WHERE id = $1",
      [id],
    );
    return rows[0] || null;
  },

  async create({ login, passwordHash, email }) {
    const { rows } = await pool.query(
      "INSERT INTO users (login, password_hash, email) VALUES ($1, $2, $3) RETURNING id",
      [login, passwordHash, email || null],
    );
    return rows[0];
  },

  async updatePassword(id, passwordHash) {
    await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [
      passwordHash,
      id,
    ]);
  },
};
