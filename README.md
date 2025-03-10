# 📚 Library Management Frontend

This project is a Vue.js web application designed to manage a library, including books and loans.

## 🚀 Installation and Execution

### 1️⃣ Prerequisites
Make sure you have **Node.js** and **npm** installed on your machine:

```bash
node -v  # Check the Node.js version
npm -v   # Check the npm version
```

If not, download and install them from the [Node.js Official Website](https://nodejs.org/).

### 2️⃣ Install Dependencies
After cloning the repository, navigate to the project directory and run:

```bash
npm install
```

This will install all the necessary dependencies for the application to function properly.

### 3️⃣ Install Docker

### 4️⃣ Start the Project

1. **Local execution**
Run the application in development mode with the following command:

```bash
npm run dev
```

By default, the project will be accessible at:  
👉 **http://localhost:5173/** (or another port depending on your configuration).

2. **Execution with Docker**

To run the application using Docker, execute:

```bash
docker build -t img_front
```
The previous command create a docker image for the frontend app. After that, you can build the docker and run it : 

```bash
docker 
```

The API will be accessible at: [http://localhost:8000](http://localhost:8000)


## 📂 Project Structure

```
Library-frontend
├── 📁 src
│   ├── 📁 assets       # Global images and styles
│   ├── 📁 components   # Reusable Vue components
│   ├── 📁 router       # Application routes
│   ├── 📁 stores       # State management using Pinia
│   ├── 📁 types        # TypeScript types used in the application
│   ├── 📁 views        # Main application pages
│   ├── App.vue         # Root component
│   ├── main.ts         # Main entry file that mounts the Vue app
├── package.json        # npm dependencies and scripts
├── vite.config.ts      # Vite.js configuration
└── README.md           # Project documentation
```
