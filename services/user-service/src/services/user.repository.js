import { randomUUID } from 'node:crypto';

// Temporary in-memory storage.
// Replace with PostgreSQL repository in the database stage.

const users = new Map();

export function findUserByEmail(email) {
  return users.get(email) || null;
}

export function findUserById(id) {
  return [...users.values()].find(user => user.id === id) || null;
}

export function createUser(user) {
  users.set(user.email, {
    id: randomUUID(),
    ...user,
    createdAt: new Date().toISOString()
  });

  return findUserByEmail(user.email);
}
