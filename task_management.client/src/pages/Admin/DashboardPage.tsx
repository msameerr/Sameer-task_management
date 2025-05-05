"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
    ClipboardList,
    Clock,
    CheckCircle,
    Search,
    ChevronDown,
    MoreHorizontal,
    Plus,
    ArrowUpDown,
    Calendar,
    User,
    UserPlus,
} from "lucide-react"
import { Link } from "react-router-dom"

import { taskService } from "@/services/TaskService";

interface Task {
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
            return "Lowest"
        case 2:
            return "Low"
        case 3:
            return "Medium"
        case 4:
            return "High"
        case 5:
            return "Highest"
        default:
            return "Unknown"
    }
}

const getStatusColor = (statusId: number): string => {
    switch (statusId) {
        case 1: // Pending
            return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        case 2: // In Progress
            return "bg-blue-100 text-blue-800 hover:bg-blue-100"
        case 3: // Completed
            return "bg-green-100 text-green-800 hover:bg-green-100"
        default:
            return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    })
}

const AdminDashboard = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([])

    useEffect(() => {

        const fetchTasks = async () => {
            try {
                setLoading(true)

                const tasks = await taskService.getAllTask();

                setTasks(tasks)
                setFilteredTasks(tasks)
            } catch (err) {
                console.error("Failed to fetch tasks:", err)
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    useEffect(() => {
        // Filter tasks based on search query
        if (searchQuery.trim() === "") {
            setFilteredTasks(tasks)
        } else {
            const query = searchQuery.toLowerCase()
            const filtered = tasks.filter(
                (task) =>
                    task.Title.toLowerCase().includes(query) ||
                    task.Description.toLowerCase().includes(query) ||
                    task.CreatedBy.toLowerCase().includes(query),
            )
            setFilteredTasks(filtered)
        }
    }, [searchQuery, tasks])

    // Calculate task counts by status
    const pendingCount = tasks.filter((task) => task.StatusId === 1).length
    const inProgressCount = tasks.filter((task) => task.StatusId === 2).length
    const completedCount = tasks.filter((task) => task.StatusId === 3).length

    return (
        <div className="flex min-h-screen flex-col bg-gray-50 dark:bg-gray-900">
            <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6 dark:bg-gray-950">
                <h1 className="text-xl font-semibold">Task Management Dashboard</h1>
                <div className="ml-auto flex items-center gap-4">
                    <Link to="/tasks/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Task
                        </Button>
                    </Link>
                </div>
            </header>
            <main className="flex-1 p-6">
                <div className="grid gap-6">
                    {/* Summary Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        <Card className="border-l-4 border-l-yellow-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-medium">Pending Tasks</CardTitle>
                                <CardDescription>Tasks waiting to be started</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-3xl font-bold">{pendingCount}</div>
                                    <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                                        <ClipboardList className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-blue-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-medium">In Progress</CardTitle>
                                <CardDescription>Tasks currently being worked on</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-3xl font-bold">{inProgressCount}</div>
                                    <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                                        <Clock className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-l-4 border-l-green-500">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-base font-medium">Completed</CardTitle>
                                <CardDescription>Tasks that have been completed</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <div className="text-3xl font-bold">{completedCount}</div>
                                    <div className="rounded-full bg-green-100 p-3 text-green-600">
                                        <CheckCircle className="h-6 w-6" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Task Table */}
                    <Card>
                        <CardHeader>
                            <CardTitle>All Tasks</CardTitle>
                            <CardDescription>Manage and monitor all tasks in the system</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-between pb-4">
                                <div className="flex w-full max-w-sm items-center space-x-2">
                                    <Input
                                        placeholder="Search tasks..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="h-9"
                                    />
                                    <Button variant="outline" size="sm" className="h-9 px-4 text-xs">
                                        <Search className="mr-2 h-3.5 w-3.5" />
                                        Search
                                    </Button>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" size="sm" className="ml-auto h-9 px-4 text-xs">
                                            <ChevronDown className="mr-2 h-3.5 w-3.5" />
                                            Filter
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuCheckboxItem checked>Show All</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Pending Only</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>In Progress Only</DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>Completed Only</DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[80px]">ID</TableHead>
                                            <TableHead>
                                                <div className="flex items-center space-x-1">
                                                    <span>Title</span>
                                                    <ArrowUpDown className="h-3 w-3" />
                                                </div>
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell">Status</TableHead>
                                            <TableHead className="hidden md:table-cell">Priority</TableHead>
                                            <TableHead className="hidden lg:table-cell">Category</TableHead>
                                            <TableHead className="hidden lg:table-cell">
                                                <div className="flex items-center space-x-1">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    <span>Due Date</span>
                                                </div>
                                            </TableHead>
                                            <TableHead className="hidden lg:table-cell">
                                                <div className="flex items-center space-x-1">
                                                    <User className="h-3.5 w-3.5" />
                                                    <span> Created By </span>
                                                </div>
                                            </TableHead>
                                            <TableHead className="w-[100px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {loading ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="h-24 text-center">
                                                    Loading tasks...
                                                </TableCell>
                                            </TableRow>
                                        ) : filteredTasks.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="h-24 text-center">
                                                    No tasks found.
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredTasks.map((task) => (
                                                <TableRow key={task.TaskId}>
                                                    <TableCell className="font-medium">{task.TaskId}</TableCell>
                                                    <TableCell>
                                                        <div className="font-medium">{task.Title}</div>
                                                        <div className="hidden text-sm text-muted-foreground md:block">
                                                            {task.Description.length > 60
                                                                ? `${task.Description.substring(0, 60)}...`
                                                                : task.Description}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">
                                                        <Badge className={getStatusColor(task.StatusId)}>{getStatusText(task.StatusId)}</Badge>
                                                    </TableCell>
                                                    <TableCell className="hidden md:table-cell">{getPriorityText(task.Priority)}</TableCell>
                                                    <TableCell className="hidden lg:table-cell">{getCategoryText(task.CategoryId)}</TableCell>
                                                    <TableCell className="hidden lg:table-cell">{formatDate(task.TaskCompletionDate)}</TableCell>
                                                    <TableCell className="hidden lg:table-cell">{task.CreatedBy}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link to={"/assignTask"}>
                                                                <Button
                                                                    variant="default"
                                                                    size="sm"
                                                                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white">
                                                                    <UserPlus className="h-4 w-4" />
                                                                    Assign Task
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center justify-end gap-2">
                                                            <Link to={`/tasks/${task.TaskId}/details`}>
                                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                    <MoreHorizontal className="h-4 w-4" />
                                                                    <span className="sr-only">View details</span>
                                                                </Button>
                                                            </Link>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}

export default AdminDashboard
