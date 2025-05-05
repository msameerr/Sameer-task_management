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
git clone [[repo name]](https://github.com/msameerr/Sameer-task_management.git)
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
The backend API will be available at `[http://localhost:5068](https://localhost:7266)`


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
The frontend will be available at ` [http://localhost:5173](https://localhost:5173/)`.


# Tech Stack:
Following Tech Stack is being implemented:
- React + Typescript for frontend
- ASP.NET Core Web Api
- SQL Server Management Studio for database
- Redux for state management in React
- Serilog for Application logging (to be implemented)
- xUnit for unit testing (to be implemented)
- SonarQube for analyzing code quality (to be implemented)

## Additional Information
TBD

