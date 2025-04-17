"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Trash2, AlertTriangle, ArrowLeft } from "lucide-react"

// Simple Task interface for deletion
interface Task {
    TaskId: number;
    Title: string;
}

interface ApiResponse<T = unknown> {
    Result: T;
    Message: string;
    IsSuccess: boolean;
}


const TaskDeletePage = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [task, setTask] = useState<Task | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false)
    const [isDeleting, setIsDeleting] = useState<boolean>(false)

    useEffect(() => {

        const fetchTask = async () => {
            try {
                setLoading(true)

                const response = await fetch(`https://localhost:7266/api/task/GetTaskById/${id}`)
                if (!response.ok) throw new Error("Failed to fetch task")

                const data: ApiResponse<Task> = await response.json()

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

        fetchTask()
    }, [id])

    const handleDelete = async () => {
        try {
            setIsDeleting(true)

            const response = await fetch(`https://localhost:7266/api/task/Delete/${id}`, {
                method: "PUT",
            })

            const data: ApiResponse = await response.json()

            if (!response.ok || data.IsSuccess === false) {
                throw new Error(data.Message || "Deletion failed")
            }


            navigate("/userHome", {
                state: {
                    notification: {
                        type: "success",
                        message: `Task "${task?.Title}" was successfully deleted.`,
                    },
                },
            })
        } catch (err) {
            console.error("Failed to delete task:", err)
            setError("Failed to delete task. Please try again.")
            setIsDeleting(false)
            setShowConfirmDialog(false)
        }
    }

    if (loading) {
        return (
            <div className="container mx-auto p-6">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardContent className="p-6 flex justify-center items-center">
                            <div className="h-8 w-full bg-muted rounded animate-pulse"></div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    if (error || !task) {
        return (
            <div className="container mx-auto p-6">
                <div className="max-w-md mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-destructive">Error</CardTitle>
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
            <div className="max-w-md mx-auto">
                <Card className="border-destructive/50">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <Trash2 className="h-5 w-5 text-destructive" />
                            Delete Task
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="bg-destructive/10 p-4 rounded-md mb-4 flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-medium text-destructive mb-1">Warning</p>
                                <p className="text-sm text-muted-foreground">
                                    You are about to delete the following task. This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <div className="border rounded-md p-4 mb-4">
                            <div className="mb-2">
                                <span className="text-sm font-medium text-muted-foreground">Task ID:</span>
                                <span className="ml-2">{task.TaskId}</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-muted-foreground">Task Title:</span>
                                <span className="ml-2">{task.Title}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between gap-2">
                        <Button variant="outline" onClick={() => navigate("/tasks")}>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={() => setShowConfirmDialog(true)} disabled={isDeleting}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            {isDeleting ? "Deleting..." : "Delete Task"}
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            {/* Confirmation Dialog */}
            <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will permanently delete task "{task.Title}" (ID: {task.TaskId}). This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? "Deleting..." : "Yes, delete task"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default TaskDeletePage
