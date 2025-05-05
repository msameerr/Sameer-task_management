
interface UserDto {
    Id: string,
    Name: string,
    Email: string,
    CreatedOn: string
}

interface ApiResponse<T = unknown> {
    Result: T;
    Message: string;
    IsSuccess: boolean;
}

export const userService = {

    getAllUsers: async (): Promise<UserDto[]> => {

        const token = JSON.parse(localStorage.getItem("user") || "{}")?.Token;

        try {
            const response = await fetch("https://localhost:7266/api/user/GetAllUsers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const apiResponse: ApiResponse<UserDto[]> = await response.json();

            if (!apiResponse.IsSuccess) {
                throw new Error(apiResponse.Message || "Failed to fetch all users");
            }

            return apiResponse.Result;
        }
        catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }

    }

};