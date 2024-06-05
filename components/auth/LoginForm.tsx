"use client";

import CardWrapper from "../CardWrapper";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { LoginSchema } from "@/schema";
import FormError from "./FormError";
import { login } from "@/actions/auth";
import { toast } from "sonner";
import { AiOutlineReload } from "react-icons/ai";

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const form = useForm<zod.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      password: "",
      username: "",
    },
  });
  const onSubmit = (values: zod.infer<typeof LoginSchema>) => {
    setError("");
    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data.error);
          }
          if (!data?.error) {
            toast.success("Successfully Logged In!");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => form.reset());
    });
  };
  return (
    <CardWrapper
      headerLabel="Welcome Back!"
      footerLabel="Don't have an account?"
      href="/auth/register"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="jhondoe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="******"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <Button
            type="submit"
            className="w-full relative"
            disabled={isPending}
          >
            {isPending && (
              <AiOutlineReload className="w-6 h-6 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9 animate-spin absolute" />
            )}
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
