

"use client"

import { useState, useEffect } from "react"
import { /*useParams,*/ useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, ArrowLeft, CheckCircle, User, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { userService } from "@/services/UserService";

// User interface as provided
interface UserDto {
    Id: string
    Name: string
    Email: string
    CreatedOn: string
}



//// Format date for display
//const formatDate = (dateString: string): string => {
//    const date = new Date(dateString)
//    return date.toLocaleDateString("en-US", {
//        year: "numeric",
//        month: "short",
//        day: "numeric",
//    })
//}

// Get initials from name
const getInitials = (name: string): string => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
}

const AssignTaskPage = () => {
    //const { id } = useParams<{ id: string }>() // Task ID from URL
    const navigate = useNavigate()

    const [users, setUsers] = useState<UserDto[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [assigning, setAssigning] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [validationError, setValidationError] = useState<string | null>(null)

    useEffect(() => {
        // Fetch users
        const fetchUsers = async () => {
            try {
                setLoading(true)

                const user = await userService.getAllUsers();
                console.log("Fetched Users:", user); 
                setUsers(user)
            } catch (err) {
                setError("Failed to load users")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    const handleSelectUser = (userId: string) => {
        console.log("User selected:", userId);
        setSelectedUserId(userId);
        setValidationError(null);
    };


    const handleAssign = async () => {
        // Clear any previous errors
        setValidationError(null)

        if (!selectedUserId) {
            setValidationError("Please select a user to assign the task to.")
            return
        }

        try {
            setAssigning(true)
            // In a real app, you would make an API call here
            // await fetch(`/api/tasks/${id}/assign`, {
            //   method: 'POST',
            //   headers: {
            //     'Content-Type': 'application/json',
            //   },
            //   body: JSON.stringify({ userId: selectedUserId }),
            // });

            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // Show success state
            setSuccess(true)

            // Redirect after a delay
            setTimeout(() => {
                navigate("/admin/dashboard")
            }, 2000)
        } catch (err) {
            console.error("Failed to assign task:", err)
            setValidationError("Failed to assign task. Please try again.")
        } finally {
            setAssigning(false)
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="ml-2">Loading users...</span>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="container mx-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl font-bold text-destructive">Error</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{error}</p>
                    </CardContent>
                    <CardFooter>
                        <Link to="/admin/dashboard">
                            <Button>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-3xl mx-auto">
                <div className="mb-6">
                    <Link to="/admin/dashboard">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Dashboard
                        </Button>
                    </Link>
                </div>

                {success ? (
                    <Alert className="mb-6 bg-green-50 border-green-200">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-800">Success!</AlertTitle>
                        <AlertDescription className="text-green-700">
                            Task has been successfully assigned to{" "}
                            <span className="font-medium">{users.find((u) => u.Id === selectedUserId)?.Name}</span>. Redirecting to
                            dashboard...
                        </AlertDescription>
                    </Alert>
                ) : null}

                {validationError ? (
                    <Alert className="mb-6 bg-red-50 border-red-200">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-800">Error</AlertTitle>
                        <AlertDescription className="text-red-700">{validationError}</AlertDescription>
                    </Alert>
                ) : null}

                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Assign Task</CardTitle>
                        <CardDescription>Select a team member to assign this task to</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {users.map((user) => (
                                <div
                                    key={user.Id || user.Id} // ✅ Ensure unique key — fallback if API returns lowercase `id`
                                    className={`flex items-center justify-between p-4 rounded-md ${selectedUserId === user.Id ? "bg-primary/10 border border-primary" : "bg-card hover:bg-muted/50"
                                        }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <Avatar>
                                            <AvatarImage
                                                src={`/placeholder.svg?text=${getInitials(user.Name)}`}
                                                alt={user.Name}
                                            />
                                            <AvatarFallback className="bg-primary/10 text-primary">
                                                {getInitials(user.Name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{user.Name}</div>
                                            <div className="text-sm text-muted-foreground">{user.Email}</div>
                                        </div>
                                    </div>
                                    <Button
                                        variant={selectedUserId === user.Id ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handleSelectUser(user.Id)}
                                    >
                                        {selectedUserId === user.Id ? "Selected" : "Select"}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => navigate("/admin/dashboard")} disabled={assigning}>
                            Cancel
                        </Button>
                        <Button onClick={handleAssign} disabled={!selectedUserId || assigning}>
                            {assigning ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Assigning...
                                </>
                            ) : (
                                <>
                                    <User className="mr-2 h-4 w-4" />
                                    Assign Task
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default AssignTaskPage
