

export interface TaskDto {
    TaskId: number;
    Title: string;
    Description: string;
    Priority: number;
    CreatedBy: string;
    TaskCompletionDate: string; 
    StatusId: number;
    CategoryId: number;
    IsActive: boolean;
    CreatedOn: string; 
}

export interface CreateTaskDto {
    Title: string;
    Description: string;
    Priority: number;
    CreatedBy: string;
    TaskCompletionDate: string;
    StatusId: number;
    CategoryId: number;
    IsActive: boolean;
    CreatedOn: string;
}

interface ApiResponse<T = unknown> {
    Result: T;
    Message: string;
    IsSuccess: boolean;
}

export const taskService = {

    getAllTask: async (): Promise<TaskDto[]> => {

        const token = JSON.parse(localStorage.getItem("user") || "{}")?.Token;

        try {
            const response = await fetch("https://localhost:7266/api/task/GetAll", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiResponse: ApiResponse<TaskDto[]> = await response.json();

            if (!apiResponse.IsSuccess) {
                throw new Error(apiResponse.Message || "Failed to fetch all user tasks");
            }

            return apiResponse.Result;
        } catch (error) {
            console.error("Error fetching all user tasks:", error);
            throw error;
        }
    },


    getUserTask: async (): Promise<TaskDto[]> => {

        const token = JSON.parse(localStorage.getItem("user") || "{}")?.Token;
        const user = JSON.parse(localStorage.getItem("user") || "{}");

        try {
            
            const userId = user.User.ID;
            console.log("UserId : ", userId);
            const response = await fetch(`https://localhost:7266/api/task/GetUserTasks/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiResponse: ApiResponse<TaskDto[]> = await response.json();

            if (!apiResponse.IsSuccess) {
                throw new Error(apiResponse.Message || "Failed to fetch user tasks");
            }

            return apiResponse.Result;
        } catch (error) {
            console.error("Error fetching user tasks:", error);
            throw error;
        }
    },


    createTask: async (taskData: CreateTaskDto): Promise<ApiResponse> => {
        const token = JSON.parse(localStorage.getItem("user") || "{}")?.Token;
        try {
            const response = await fetch("https://localhost:7266/api/task/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Error creating task:", error);
            throw error;
        }
    },


    updateTask: async (taskData: CreateTaskDto): Promise<ApiResponse> => {
        const token = JSON.parse(localStorage.getItem("user") || "{}")?.Token;
        try {
            const response = await fetch("https://localhost:7266/api/task/Update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();

        } catch (error) {
            console.error("Error updating task:", error);
            throw error;
        }
    }

};


