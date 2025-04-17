"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom" 


import { taskService } from "@/services/TaskService";

interface CreateTaskDto {
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

const CreateTaskPage = () => {
    const navigate = useNavigate()

    const [formData, setFormData] = useState<CreateTaskDto>({
        Title: "",
        Description: "",
        Priority: 3, 
        TaskCompletionDate: "", 
        StatusId: 1, 
        CategoryId: 1, 
        IsActive: true,
        CreatedOn: new Date().toISOString(),
        CreatedBy: "Sameer"
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSelectChange = (name: keyof CreateTaskDto, value: string) => {
        setFormData({
            ...formData,
            [name]: Number.parseInt(value, 10),
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const taskData = {
            ...formData,
            // Convert the string date to a proper DateTime format if needed
            TaskCompletionDate: new Date(formData.TaskCompletionDate).toISOString(),
            IsActive: true,
            CreatedOn: new Date().toISOString(),
            CreatedBy: "Sameer"
        }

        try {
            const response = await taskService.createTask(taskData);

            if (response.IsSuccess) {
                alert("Task created successfully!");
                navigate("/userHome");
            } else {
                alert(response.Message || "Failed to create task");
            }
            
        } catch (error) {
            console.error("Failed to create task:", error);
            alert("An error occurred while creating the task.");
        }

    }

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Create New Task</CardTitle>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Task Title</Label>
                                <Input
                                    id="title"
                                    name="Title"
                                    value={formData.Title}
                                    onChange={handleInputChange}
                                    placeholder="Enter task title"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Task Description</Label>
                                <Textarea
                                    id="description"
                                    name="Description"
                                    value={formData.Description}
                                    onChange={handleInputChange}
                                    placeholder="Enter detailed task description"
                                    className="min-h-[120px]"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="Priority">Priority</Label>
                                <Select
                                    value={formData.Priority.toString()}
                                    onValueChange={(value) => handleSelectChange("Priority", value)}
                                >
                                    <SelectTrigger id="Priority">
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">1 - Lowest</SelectItem>
                                        <SelectItem value="2">2 - Low</SelectItem>
                                        <SelectItem value="3">3 - Medium</SelectItem>
                                        <SelectItem value="4">4 - High</SelectItem>
                                        <SelectItem value="5">5 - Highest</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="completionDate">Task Completion Date</Label>
                                <Input
                                    id="completionDate"
                                    name="TaskCompletionDate"
                                    type="datetime-local"
                                    value={formData.TaskCompletionDate}
                                    onChange={handleInputChange}
                                    required
                                />
                                <p className="text-sm text-muted-foreground">Select both date and time for task completion</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Task Status</Label>
                                <Select
                                    value={formData.StatusId.toString()}
                                    onValueChange={(value) => handleSelectChange("StatusId", value)}
                                >
                                    <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Pending</SelectItem>
                                        <SelectItem value="2">In Progress</SelectItem>
                                        <SelectItem value="3">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">Task Category</Label>
                                <Select
                                    value={formData.CategoryId.toString()}
                                    onValueChange={(value) => handleSelectChange("CategoryId", value)}
                                >
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Bug</SelectItem>
                                        <SelectItem value="2">Feature Request</SelectItem>
                                        <SelectItem value="3">Maintenance</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>

                        <CardFooter className="flex flex-wrap justify-between gap-4 px-6 py-4">
                            <Button type="button" variant="outline" onClick={() => navigate("/userHome")}>
                                Cancel
                            </Button>
                            <Button type="submit">Create Task</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default CreateTaskPage
