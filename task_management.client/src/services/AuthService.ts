

interface SignUpData {
    Name: string;
    Email: string;
    Password: string;
    IsActive?: boolean;
    CreatedOn?: string;
}

interface SignInData {
    Email: string;
    Password: string;
}

interface ApiResponse<T = unknown> {
    Result: T;
    Message: string;
    IsSuccess: boolean;
}

export const authService = {
    // User Sign Up
    async signUp(signUpData: SignUpData): Promise<ApiResponse> {

        const api_url = "https://localhost:7266/api/auth/register";

        try {
            console.log(signUpData);
            const response = await fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signUpData),
            });

            if (!response.ok) {
                throw new Error(`Sign-up failed: ${response.status} ${response.statusText}`);
            }

            return await response.json();

        }
        catch (error) {
            console.error("Error signing up:", error);
            return { Result: null, Message: "Something went wrong", IsSuccess: false };
        }
    },

    // User Sign In
    async signIn(signInData: SignInData): Promise<ApiResponse> {

        const api_url = "https://localhost:7266/api/auth/login";

        try {
            const response = await fetch(api_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signInData),
            });

            if (!response.ok) {
                throw new Error(`Sign-in failed: ${response.status} ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error("Error signing in:", error);
            return { Result: null, Message: "Something went wrong", IsSuccess: false };
        }
    }
};
