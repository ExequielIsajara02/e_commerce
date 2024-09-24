"use client";

import React from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/libs/zod";
import { Input } from "./ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage} from "./ui/form";
import { loginAction } from "../../actions/auth-action";

const FormLogin = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await loginAction(values)
    
    console.log(values);
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <Form {...form}>
        <form
          className="bg-slate-800 p-10 w-2/4 space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-bold">Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} type="email" className="text-white"/>
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
                <FormLabel className="text-white font-bold">Contraseña</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" className="text-white"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Enviar
          </button>
        </form>
      </Form>
    </div>
  );
};

export default FormLogin;
