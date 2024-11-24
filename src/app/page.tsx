"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "~/app/_components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "~/app/_components/ui/card";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import Link from "next/link";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";

type LoginForm = {
  email: string;
  password: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: "/test",
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <Card className="w-full max-w-md border-none bg-card/10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-extrabold tracking-tight text-foreground">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-muted/20 placeholder:text-muted-foreground"
                  {...register("email", { required: true })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="bg-muted/20 placeholder:text-muted-foreground"
                  {...register("password", { required: true })}
                />
              </div>
              <div className="space-y-4">
                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Login
                </Button>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <Link href="/register/business" className="hover:text-foreground transition-colors">
                    Register as Business
                  </Link>
                  <Link href="/register/expert" className="hover:text-foreground transition-colors">
                    Register as Expert
                  </Link>
                </div>
              </div>
            </motion.form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
