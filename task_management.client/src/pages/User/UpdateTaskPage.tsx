"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Loader2 } from "lucide-react"

import { taskService } from "@/services/TaskService";

interface TaskFormData {
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

// Helper function to format date for datetime-local input
const formatDateForInput = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toISOString().slice(0, 16) // Format: YYYY-MM-DDTHH:MM
}

const UpdateTaskPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

    const [formData, setFormData] = useState<TaskFormData>({
      TaskId:0,
      Title: "",
      Description: "",
      Priority: 3,
      TaskCompletionDate: "",
      StatusId: 1,
      CategoryId: 1,
      CreatedBy: "",
      IsActive: true,
      CreatedOn:""
  })

  const [loading, setLoading] = useState<boolean>(true)
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        // Fetch task data to pre-fill the form
        const fetchTaskData = async () => {
            try {
                setLoading(true)

                const response = await fetch(`https://localhost:7266/api/task/GetTaskById/${id}`)
                if (!response.ok) throw new Error("Failed to fetch task")

                const data: ApiResponse<TaskFormData> = await response.json()
                const taskData = data.Result;

                if (taskData) {
                    setFormData({
                        TaskId: taskData.TaskId,
                        Title: taskData.Title,
                        Description: taskData.Description,
                        Priority: taskData.Priority,
                        TaskCompletionDate: formatDateForInput(taskData.TaskCompletionDate),
                        StatusId: taskData.StatusId,
                        CategoryId: taskData.CategoryId,
                        CreatedBy: taskData.CreatedBy,
                        IsActive: taskData.IsActive,
                        CreatedOn: taskData.CreatedOn
                    })
                } else {
                    setError("Task not found")
                }
            } catch (err) {
                setError("Failed to load task data")
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchTaskData()
    }, [id])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: keyof TaskFormData, value: string) => {
    setFormData({
      ...formData,
      [name]: Number.parseInt(value, 10),
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setSubmitting(true)

        const response = await taskService.updateTask(formData);

        if (response.IsSuccess) 
        {
            alert(`Task "${formData.Title}" has been updated successfully.`);
            navigate("/userHome");
        } else
        {
            alert(response.Message || "Failed to create task");
        }

    }
    catch (err)
    {
      console.error("Failed to update task:", err)
      alert("Failed to update task. Please try again.");

    }
    finally
    {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Update Task</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">Loading task data...</span>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p>{error}</p>
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
            <CardTitle className="text-2xl font-bold">Update Task</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 px-6">
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
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={formData.Priority.toString()}
                  onValueChange={(value) => handleSelectChange("Priority", value)}
                >
                  <SelectTrigger id="priority">
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

            <CardFooter className="flex justify-between px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/tasks/${id}/details`)}
                disabled={submitting}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Task"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default UpdateTaskPage
