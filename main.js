const express = require("express");
const csv = require("csv-string");
const fs = require("fs");

const app = express();

app.get("/api/export/users", (req, res) => {
  // Get the user table/collection from the database
  const users = [
    { name: "John Doe", age: 32, city: "New York" },
    { name: "Jane Doe", age: 29, city: "London" },
    { name: "Jim Smith", age: 40, city: "Paris" }
  ];

  // Convert the user table/collection to CSV format
  const csvData = csv.stringify(users, { header: true });

  // Create a file and write the CSV data to it
  fs.writeFile("users.csv", csvData, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");

    // Set the content type and attachment header
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="users.csv"'
    );

    // Send the file data as the response
    res.send(csvData);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
