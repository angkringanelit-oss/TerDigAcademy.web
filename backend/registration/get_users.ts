import { api } from "encore.dev/api";
import { registrationDB } from "./db";

export interface User {
  id: number;
  parentName: string;
  childName: string;
  email: string;
  phone: string;
  childAge: number | null;
  grade: string | null;
  packageType: string | null;
  registrationType: string;
  status: string;
  createdAt: string;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
}

// Gets all registered users
export const getUsers = api<void, GetUsersResponse>(
  { expose: true, method: "GET", path: "/users" },
  async () => {
    const users = await registrationDB.queryAll<{
      id: number;
      parent_name: string;
      child_name: string;
      email: string;
      phone: string;
      child_age: number | null;
      grade: string | null;
      package_type: string | null;
      registration_type: string;
      status: string;
      created_at: string;
    }>`
      SELECT 
        id,
        parent_name,
        child_name,
        email,
        phone,
        child_age,
        grade,
        package_type,
        registration_type,
        status,
        created_at
      FROM users 
      ORDER BY created_at DESC
    `;

    const formattedUsers: User[] = users.map(user => ({
      id: user.id,
      parentName: user.parent_name,
      childName: user.child_name,
      email: user.email,
      phone: user.phone,
      childAge: user.child_age,
      grade: user.grade,
      packageType: user.package_type,
      registrationType: user.registration_type,
      status: user.status,
      createdAt: user.created_at
    }));

    return {
      users: formattedUsers,
      total: formattedUsers.length
    };
  }
);
