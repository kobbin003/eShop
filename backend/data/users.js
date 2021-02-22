import bcrypt from "bcryptjs";

const bcryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcryptPassword("adminPassword"),
    isAdmin: true,
  },
  {
    name: "User One",
    email: "one@example.com",
    password: bcryptPassword("onePassword"),
    isAdmin: false,
  },
  {
    name: "Admin Two",
    email: "two@example.com",
    password: bcryptPassword("twoPassword"),
    isAdmin: false,
  },
];

export default users;
