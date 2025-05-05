"use client"

import type React from "react"
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Info } from "lucide-react"
import { Link } from "react-router-dom" 


import { taskService } from "@/services/TaskService";

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


const getStatusText = (status: number): string => {
    switch (status) {
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

// Function to get the appropriate color for status badges
const getStatusColor = (status: number): string => {
    switch (status) {
        case 3: // Completed
            return "bg-green-100 text-green-800 hover:bg-green-100"
        case 2: // In Progress
            return "bg-blue-100 text-blue-800 hover:bg-blue-100"
        case 1: // Pending
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
}

const TaskListPage: React.FC = () => {

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const [tasks, setTasks] = useState<TaskDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const id = user.User.ID;
                console.log("user id : ", id);
                const data = await taskService.getUserTask();
                setTasks(data);
            } catch (err) {
                console.error("Failed to load tasks:", err)
                setError("Failed to load tasks.");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, []);



    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center justify-between mb-6 max-w-2xl mx-auto">
                <Link to="/createTask">
                    <Button className="flex items-center gap-1">
                        <Plus className="h-4 w-4" />
                        Create Task
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold">Task List</h1>
            </div>

            <div className="flex flex-col gap-4 max-w-2xl mx-auto">
                {tasks.map((task) => (
                    <Card key={task.TaskId} className="overflow-hidden w-full">
                        <CardHeader className="p-4 pb-2">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-semibold">{task.Title}</h2>
                                <Badge className={`${getStatusColor(task.StatusId)} font-medium`}>{getStatusText(task.StatusId)}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-2 pb-2">
                            <p className="text-gray-600 dark:text-gray-300">{task.Description}</p>
                        </CardContent>
                        <CardFooter className="p-4 pt-2 flex justify-end gap-2 bg-muted/20">
                            <Link to={`/detailTask/${task.TaskId}`}>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Info className="h-4 w-4" />
                                    Detail
                                </Button>
                            </Link>
                            <Link to={`/UpdateTask/${task.TaskId}`}>
                                <Button variant="outline" size="sm" className="flex items-center gap-1">
                                    <Edit className="h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                            <Link to={`/deleteTask/${task.TaskId}`}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/20"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Delete
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="text-center py-12 max-w-2xl mx-auto">
                    <p className="text-gray-500 dark:text-gray-400">No tasks found. Create a new task to get started.</p>
                </div>
            )}
        </div>
    )
}

export default TaskListPage
