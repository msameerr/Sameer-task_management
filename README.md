# Task Management System

## Getting Started

## Table of Contents
- [Prerequisites](#prerequisites)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Tech Stack](#tech-stack)
- [Additional Information](#additional-information)

## Prerequisites
Make sure you have the following installed on your machine:
- .NET SDK (version 6.0 or later)
- Node.js (version 14.0 or later)
- npm (Node Package Manager)
- SQL Server (or other preferred database)

## Backend Setup
### 1. Clone the repository:
```bash
git clone https://github.com/msameerr/Sameer-task_management.git
```

### 2. Configure the database:
- Update the `appsettings.json` file with your database connection string.
- Example `appsettings.json`:
  ```json
  {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=Task_Management_System;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
     }
  }
  ```

### 3. Run Entity Framework migrations:
```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 4. Install dependencies:
```bash
dotnet restore
```

### 5. Running the Backend
```bash
dotnet run
```
The backend API will be available at `https://localhost:7266`


## Frontend Setup
### 1. Navigate to the frontend directory:
```bash
cd ../../frontend
```

### 2. Install dependencies:
```bash
npm install
```


### 3. Running the Frontend
```bash
npm start
```
The frontend will be available at ` https://localhost:5173/`.


# Tech Stack:
Following Tech Stack is being implemented:
- React + Typescript for frontend
- ASP.NET Core Web Api
- SQL Server Management Studio for database
- Redux for state management in React
- Serilog for Application logging (to be implemented)
- xUnit for unit testing (to be implemented)
- SonarQube for analyzing code quality (to be implemented)

------------------------------------------------------------------------------------------------------------------------------------------------

# POV : ADMIN 
## Admin's Dashboard
![dashboard](https://github.com/user-attachments/assets/91a3659b-60ed-446b-b8de-5bf4f45f46b0)
## Assign To User Page
![assign](https://github.com/user-attachments/assets/229a874b-4b8a-409b-9657-c812382c7853)

# POV : NORMAL USER
## Register Page
![register](https://github.com/user-attachments/assets/8575a8e1-71dc-4b8d-a807-1e620811b552)
## Login Page
![login](https://github.com/user-attachments/assets/7e972fec-bfd0-4e41-a843-192571b1c7fd)
## User Home Page
![list](https://github.com/user-attachments/assets/90922633-d13b-429e-ad27-f8168a31bace)
## Task Creation Page 
![create](https://github.com/user-attachments/assets/374a71d5-a029-48c4-a0af-6048fbcfcdc9)
## Task Detail Page
![detail](https://github.com/user-attachments/assets/8c3069bb-4bba-49b9-b817-8de94dc3b43b)
## Task Delete Page
![delete](https://github.com/user-attachments/assets/15520951-c429-4acd-a673-5b47b3dd9c8c)



