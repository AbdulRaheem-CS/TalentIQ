"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/marketing/logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("jasmine.cole@corvex.io");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<"credentials" | "sso" | null>(null);

  function signIn(method: "credentials" | "sso") {
    setIsSubmitting(method);
    setTimeout(() => {
      router.push("/dashboard");
    }, 700);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 p-lg">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-lg inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card variant="elevated">
            <CardHeader className="items-center gap-xs text-center">
              <Logo className="text-2xl" />
              <CardTitle className="text-xl">Welcome back</CardTitle>
              <CardDescription>Sign in to your TalentIQ workspace</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col gap-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  signIn("credentials");
                }}
                className="flex flex-col gap-sm"
              >
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-foreground">
                    Work email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    required
                    icon={<Mail />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-xs font-medium text-foreground">
                      Password
                    </label>
                    <a href="#" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    icon={<Lock />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                </div>

                <Button
                  type="submit"
                  className="mt-xs"
                  isLoading={isSubmitting === "credentials"}
                  disabled={isSubmitting !== null}
                >
                  Sign in
                </Button>
              </form>

              <div className="flex items-center gap-sm">
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <Button
                variant="outline"
                isLoading={isSubmitting === "sso"}
                disabled={isSubmitting !== null}
                onClick={() => signIn("sso")}
              >
                <Building2 className="h-4 w-4" />
                Sign in with SSO
              </Button>

              <p className="text-center text-xs text-muted-foreground">
                This is a demo environment — any email/password signs you in.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
