import React, { useEffect, useState } from "react";

import { FaUserCircle } from "react-icons/fa";

import { supabase } from "../supabase";

import commonStyles from "./commonStyles";

export default function Users() {

  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchUsers();

  }, []);

  async function fetchUsers() {

    try {

      // ORDERS TABLE SE UNIQUE USERS NIKALENGE

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("id", { ascending: false });

      console.log("USERS DATA:", data);

      console.log("ERROR:", error);

      if (error) {

        console.log(error);

        return;

      }

      // UNIQUE USERS

      const uniqueUsers = [];

      const emails = new Set();

      data.forEach((order) => {

        if (!emails.has(order.customer_id)) {

          emails.add(order.customer_id);

          uniqueUsers.push({
            customer_name: order.customer_name,
            customer_id: order.customer_id,
          });

        }

      });

      setUsers(uniqueUsers);

    } catch (err) {

      console.log(err);

    }

  }

  return (

    <div style={styles.page}>

      <div style={styles.blur}></div>

      <h1 style={styles.title}>
        Users 👥
      </h1>

      <div style={styles.grid}>

        {users.length === 0 ? (

          <div style={styles.emptyCard}>
            No Users Found 👤
          </div>

        ) : (

          users.map((user,index)=>(

            <div key={index} style={styles.userCard}>

              <FaUserCircle
                size={70}
                color="#60a5fa"
              />

              <h2>
                {user.customer_name}
              </h2>

              <p>
                {user.customer_id}
              </p>

            </div>

          ))

        )}

      </div>

    </div>

  );
}

const styles = {

  ...commonStyles,

  emptyCard:{
    background:"rgba(255,255,255,0.06)",
    padding:"30px",
    borderRadius:"20px",
    color:"white",
    fontSize:"20px",
  }

};