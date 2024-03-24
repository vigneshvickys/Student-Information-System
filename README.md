**Installation Instructions:**

**1.	Frontend (React.js):**
•	Clone the project repository from Git.
•	Navigate to the frontend directory (cd frontend).
•	Manually install dependencies: **npm install**
•	Start the development server: **npm start**

**2.	Backend (Node.js with Express):**
•	Navigate to the backend directory **(cd backend/.env)**.
•	Manually install dependencies: **npm install**.
•	Build the project for staging: npm run build_stage.

**3.	Database (MongoDB):**
•	If you don't have MongoDB installed, you can use MongoDB Atlas. Create a MongoDB Atlas account and set up a free tier cluster. Copy the connection string provided by MongoDB Atlas.
•	Set up the database and collections as required by the application. Use the MongoDB connection string from your cd/backend/.env file to connect to the MongoDB Atlas cluster.

**Project Deployment:**
Once the project is built and configured locally, it can be deployed to a hosting service such as Heroku for public access. Ensure to set up environment variables and configuration files properly for deployment.

**Note:** Make sure to replace placeholders like database credentials, email server details, and any sensitive information with actual values before deployment to ensure security and proper functioning of the application.
