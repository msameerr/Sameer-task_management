"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SignInForm from "../components/Auth/SignInForm"
import SignUpForm from "../components/Auth/SignUpForm"

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("signin")

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Welcome</CardTitle>
                    <CardDescription className="text-center">Sign in to your account or create a new one</CardDescription>
                </CardHeader>
                <Tabs defaultValue="signin" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signin">Sign In</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>
                    <CardContent className="p-6">
                        <TabsContent value="signin">
                            <SignInForm />
                        </TabsContent>
                        <TabsContent value="signup">
                            <SignUpForm />
                        </TabsContent>
                    </CardContent>
                </Tabs>
                <CardFooter className="flex justify-center">
                    <p className="text-center text-sm text-muted-foreground">
                        By continuing, you agree to our{" "}
                        <Link to="#" className="text-primary underline-offset-4 hover:underline">Terms of Service</Link> and{" "}
                        <Link to="#" className="text-primary underline-offset-4 hover:underline">Privacy Policy</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
