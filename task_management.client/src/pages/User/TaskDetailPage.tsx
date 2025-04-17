"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

interface TaskDto {
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

interface ApiResponse<T = unknown> {
    Result: T;
    Message: string;
    IsSuccess: boolean;
}

const TaskDetailPage = () => {
    const { id } = useParams<{ id: string }>()
    const [task, setTask] = useState<TaskDto | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Simulate API call to fetch task details
        const fetchTaskDetails = async () => {
            try {
                setLoading(true)

                const response = await fetch(`https://localhost:7266/api/task/GetTaskById/${id}`)
                if (!response.ok) throw new Error("Failed to fetch task")

                const data: ApiResponse<TaskDto> = await response.json()

                if (data.IsSuccess && data.Result) {
                    setTask(data.Result)
                } else {
                    throw new Error(data.Message || "Task not found")
                }

            } catch (err) {
                setError("Failed to load task")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTaskDetails()
    }, [id])

    // Helper functions to convert IDs to readable text
    const getStatusText = (statusId: number): string => {
        switch (statusId) {
            case 1:
                return "Pending"
            case 2:
                return "In Progress"
            case 3:
                return "Completed"
            default:
                return "Unknown"
        }
    }

    const getCategoryText = (categoryId: number): string => {
        switch (categoryId) {
            case 1:
                return "Bug"
            case 2:
                return "Feature Request"
            case 3:
                return "Maintenance"
            default:
                return "Unknown"
        }
    }

    const getPriorityText = (priority: number): string => {
        switch (priority) {
            case 1:
                return "1 - Lowest"
            case 2:
                return "2 - Low"
            case 3:
                return "3 - Medium"
            case 4:
                return "4 - High"
            case 5:
                return "5 - Highest"
            default:
                return `${priority} - Unknown`
        }
    }

    // Format date for display
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return date.toLocaleString()
    }

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold">Loading Task Details...</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col space-y-4">
                                <div className="h-8 bg-muted rounded animate-pulse"></div>
                                <div className="h-24 bg-muted rounded animate-pulse"></div>
                                <div className="h-8 bg-muted rounded animate-pulse"></div>
                                <div className="h-8 bg-muted rounded animate-pulse"></div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (error || !task) {
        return (
            <div className="container mx-auto p-6">
                <div className="max-w-2xl mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-destructive">Error</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <p>{error || "Task not found"}</p>
                        </CardContent>
                        <CardFooter>
                            <Link to="/tasks">
                                <Button>
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Back to Task List
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <CardTitle className="text-2xl font-bold">Task Details</CardTitle>
                            <Badge
                                className={
                                    task.StatusId === 3
                                        ? "bg-green-100 text-green-800"
                                        : task.StatusId === 2
                                            ? "bg-blue-100 text-blue-800"
                                            : "bg-yellow-100 text-yellow-800"
                                }
                            >
                                {getStatusText(task.StatusId)}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Task ID</h3>
                                <p>{task.TaskId}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-1">Title</h3>
                                <p>{task.Title}</p>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold mb-1">Description</h3>
                                <p className="whitespace-pre-line">{task.Description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Priority</h3>
                                    <p>{getPriorityText(task.Priority)}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Created By</h3>
                                    <p>{task.CreatedBy}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Task Completion Date</h3>
                                    <p>{formatDate(task.TaskCompletionDate)}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Status</h3>
                                    <p>
                                        {getStatusText(task.StatusId)} (ID: {task.StatusId})
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Category</h3>
                                    <p>
                                        {getCategoryText(task.CategoryId)} (ID: {task.CategoryId})
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Active Status</h3>
                                    <p>{task.IsActive ? "Active" : "Inactive"}</p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-1">Created On</h3>
                                    <p>{formatDate(task.CreatedOn)}</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Link to="/tasks">
                            <Button>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Task List
                            </Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default TaskDetailPage
