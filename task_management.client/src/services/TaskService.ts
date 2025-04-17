//// src/services/TaskService.ts

//export enum TaskStatus {
//    Pending = 0,
//    InProgress = 1,
//    Completed = 2,
//    // Add other statuses if needed
//}

//export interface TaskCategory {
//    id: number;
//    name: string;
//}


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

    getUserTask: async (): Promise<TaskDto[]> => {
        try {
            const response = await fetch("https://localhost:7266/api/task/GetUserTasks", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Add Authorization header here if required
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

        try {
            const response = await fetch("https://localhost:7266/api/task/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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

        try {
            const response = await fetch("https://localhost:7266/api/task/Update", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
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


