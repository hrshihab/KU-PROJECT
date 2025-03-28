

# KU-Project-Server

This is the backend server for the **KU Project** built using **Node.js**, **Express.js**, **TypeScript**, and **Prisma ORM**. The server handles authentication, user management, news management, support requests, career management, and NOC/GO document management.

![KU Project Server](https://i.ibb.co.com/prwW9cQk/KU-ICT-CELL-PROJECT-ERD.png)  
*KU Project Server Preview*
r
## Technologies Used

- **Node.js** 🟩
- **Express.js** 🖥️
- **TypeScript** 🔤
- **Prisma ORM** 🗃️
- **JWT Authentication** 🔐
- **Bcrypt** 🔒 (Password hashing)
- **Cloudinary** ☁️ (Image Hosting)
- **Zod** ✅ (Schema Validation)
- **Node-cron** 🕒 (Scheduled tasks)
- **Nodemailer** 📧 (Email handling)


## Features

- **User Authentication** (Login, Register, Forgot Password, Reset Password)
- **Admin Panel** for managing users, news, support requests, careers, and NOCs.
- **JWT Access and Refresh Tokens** for secure user sessions.
- **Cloudinary integration** for storing and managing images.
- **Prisma ORM** for easy database interaction with **PostgreSQL**.

## Setup and Installation

### 1. Clone the repository

```bash
git clone https://github.com/hrshihab/KU-PROJECT-SERVER.git
cd KU-PROJECT-SERVER
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of the project and add the following environment variables:

```env
NODE_ENV="development"
PORT=3000
DATABASE_URL="postgresql://DB_USER:DB_PASS@localhost:5432/DB_NAME?schema=public"
JWT_SECRET="YOUR SECRET"
EXPIRES_IN="30d"
REFRESH_TOKEN_SECRET="YOUR SECRET"
REFRESH_TOKEN_EXPIRES_IN="30d"
RESET_PASS_TOKEN="YOUR TOKEN SECRET"
RESET_PASS_TOKEN_EXPIRES_IN="5m"
RESET_PASS_LINK="FRONT-END RESET PASSWORD FORM LINK"
EMAIL = "YOUR EMAIL"
APP_PASS = "YOUR APP PASSWORD"

```

### 4. Prisma Setup

Make sure you have **Prisma** set up and generate the required Prisma client:

```bash
npx prisma generate
```

### 5. Run Development Server

To start the development server with TypeScript and automatic reloading:

```bash
npm run dev
```

### 6. Build and Start in Production Mode

To build the server for production:

```bash
npm run build
```

To start the server in production mode:

```bash
npm start
```

### 7. Seeding the Database

To seed the database with initial data (e.g., admin user, roles, etc.):

```bash
npm run seed
```

## Available Scripts

- **dev**: `ts-node-dev --respawn --transpile-only src/server.ts` - Start the server in development mode.
- **build**: `tsc` - Compile TypeScript files.
- **postinstall**: `prisma generate` - Generate Prisma client after dependencies installation.
- **start**: `node dist/server.js` - Start the server in production mode.
- **seed**: `ts-node-dev --respawn --transpile-only prisma/seed.ts` - Seed the database with initial data.

## API Endpoints

For detailed API documentation, refer to [Postman API Documentation](https://documenter.getpostman.com/view/31300739/2sAYkEpzNh).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to copy this `README` file directly to your **KU-Project-Server** GitHub repository! Let me know if you need further changes or additional details.
