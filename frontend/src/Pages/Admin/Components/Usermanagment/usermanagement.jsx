import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (user) => {
    try {
      const response = await fetch(`https://epic-hardware-test-os6r45i7v-moamenatos-projects.vercel.app/users/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      setUsers(users.filter((e) => e._id !== user._id));

      alert("User deleted successfully");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <Paper
      sx={{ backgroundColor: "#F5F7F8", padding: "2rem", borderRadius: "8px" }}
    >
      {error && (
        <Alert severity="error" sx={{ marginBottom: "1rem" }}>
          {error}
        </Alert>
      )}
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F4CE14", color: "#FFFFFF" }}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
              <TableCell>
                {!user.isAdmin && (
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#F44336",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#D32F2F",
                        color: "#FFFFFF",
                      },
                    }}
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default UserManagement;
