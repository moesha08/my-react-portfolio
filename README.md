Personal Portfolio Website & Admin Dashboard

This project is a full-stack portfolio application built to showcase my work, experience, and services. It includes both a public-facing portfolio and a private admin dashboard that allows me to update content dynamically without touching the codebase.

The frontend is built with React, and the backend is built with Node.js, Express, and MongoDB.

Overview

The main website contains the following sections:

• Home – introduction and professional overview

• About – background, skills, and career focus

• Projects – a collection of personal and academic projects

• Services – a list of services I can provide

• Contact – a form visitors can use to send me messages

All contact form submissions are stored in the database and appear inside the admin dashboard.

Admin Dashboard

The admin panel is designed to give full control over the website’s content.
It currently supports:

• User Management

   Add, edit, view, and delete users

   Useful for managing multiple administrators if needed

• Project Management

   Create new projects

   Edit project details

   Delete or update existing entries

• Service Management

   Add new services

   Update descriptions

   Remove services that are no longer needed

• Contact Messages

   View all submitted contact forms

   Read full message details

   Edit or update contact information

   Reply through email (mailto link)

   Delete single messages or clear all

The dashboard communicates with the backend through REST APIs using Axios.

Technology Stack
Frontend

• React

• React Router

• Axios

• Custom CSS

• Backend

• Node.js

• Express

• MongoDB 

•  Environment variables (dotenv)




## 📂 Project Structure

my-react-portfolio/
│
├── public/
│ ├── images/
│ ├── projects/
│ └── favicon.ico
│
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ ├── index.js
│ └── styles
│
└── README.md


## 🔧 Running the Project Locally

```bash
# Clone the repository
git clone https://github.com/moesha08/my-react-portfolio.git

# Navigate to the folder
cd my-react-portfolio

# Install dependencies
npm install

# Start the development server
npm start
