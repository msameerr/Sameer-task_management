"use client"

import type React from "react"

import { useState } from "react"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useNavigate } from "react-router-dom"

import { authService } from "@/services/AuthService"

import { useAuth } from "@/context/AuthContext";

// Sign In Form Schema
const signInFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    password: z.string().min(8, { message: "Password must be at least 8 characters." }),
    rememberMe: z.boolean().default(false).optional(),
})

type SignInFormValues = z.infer<typeof signInFormSchema>

export default function SignInForm() {

    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const signInForm = useForm<SignInFormValues>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    const { login } = useAuth();

    const onSubmit = async (data: SignInFormValues) => {
        console.log("Sign Up Data:", data)
        try {
            setIsSubmitting(true)
            const response = await authService.signIn({
                Email: data.email,
                Password: data.password
            })

            if (response.IsSuccess) {

                localStorage.setItem("user", JSON.stringify(response.Result));
                console.log(localStorage.getItem("user"));
                login();

                navigate("/userHome");

            } else {
                alert(response.Message)
            }
        } catch (error) {
            console.error("Signup failed:", error)
            alert("Failed to register user")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Form {...signInForm}>
            <form onSubmit={signInForm.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={signInForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="example@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={signInForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="••••••••" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={signInForm.control}
                    name="rememberMe"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>Remember me</FormLabel>
                            </div>
                        </FormItem>
                    )}
                />

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>

            </form>
            <div className="mt-4 text-center text-sm">
                <Link to="#" className="text-primary underline-offset-4 hover:underline">
                    Forgot your password?
                </Link>
            </div>
        </Form>
    )
}
