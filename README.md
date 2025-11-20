Personal Portfolio Website & Admin Dashboard

This project is a full-stack portfolio application built to showcase my work, experience, and services. It includes both a public-facing portfolio and a private admin dashboard that allows me to update content dynamically without touching the codebase.


It includes a public-facing portfolio and a full admin dashboard for managing content such as:

   . Users

   . Projects

   . Services

   . Contact messages

The system is fully connected to a backend API (Node.js + Express + MongoDB), allowing CRUD operations from the admin pages.

📌 Features

🌐 Public Website

    . Homepage with introduction and branding

    . About section

    . Display of featured projects

    . Service list

    . Contact form (submits directly to the backend)

🛠️ Admin Dashboard

The admin dashboard provides a clean interface to manage all database entities:

Users

   . Create new users

   . View all registered users

   . Delete users

   . Edit user information through a popup modal

Projects

   . View all existing projects

   . Create new projects

   . Edit and update project details using a modal

   . Delete projects

Services

   . Add new services

   . Manage service descriptions

   . Edit services in a modal popup

   . Delete services

Contact Messages

   . List of all messages submitted through the public contact form

   . View message details

   . Edit or delete contact entries if needed

📁 Technologies Used
Frontend

   . React

   . React Router

   . Axios

   . Custom CSS

Backend

   . Node.js

   . Express

   . MongoDB 


## 📂 Project Structure

src/
 ├── components/
 ├── pages/
 │   ├── admin/
 │   ├── Home.js
 │   ├── Contact.js
 │   ├── About.js
 │   └── ...
 ├── api.js
 ├── App.js
 └── index.js


## 🔧 Running the Project Locally


# Clone the repository
git clone https://github.com/moesha08/my-react-portfolio.git

# Navigate to the folder
cd my-react-portfolio

# Install dependencies
npm install

# Start the development server
npm start


📡 API Connection

The frontend communicates with the backend via Axios (src/api.js).
All CRUD operations send and receive data from:

http://localhost:5000/api