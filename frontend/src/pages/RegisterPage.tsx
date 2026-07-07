import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuth } from "../components/AuthProvider";

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<{ name: string; email: string; password: string }>();

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
      <form
        className="w-full max-w-md rounded-md bg-white p-6 shadow-soft dark:bg-slate-900"
        onSubmit={handleSubmit(async (values) => {
          setSubmitting(true);
          try {
            await registerUser(values.name, values.email, values.password);
            navigate("/");
          } catch {
            toast.error("Registration failed");
          } finally {
            setSubmitting(false);
          }
        })}
      >
        <h1 className="text-2xl font-bold">Create Account</h1>
        <div className="mt-6 grid gap-4">
          <input className="rounded-md border border-slate-300 bg-transparent px-3 py-2" placeholder="Name" {...register("name", { required: true })} />
          <input className="rounded-md border border-slate-300 bg-transparent px-3 py-2" placeholder="Email" {...register("email", { required: true })} />
          <input className="rounded-md border border-slate-300 bg-transparent px-3 py-2" type="password" placeholder="Password" {...register("password", { required: true, minLength: 8 })} />
          <Button disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create account"}</Button>
        </div>
        <Link className="mt-4 block text-sm text-mint" to="/login">
          I already have an account
        </Link>
      </form>
    </main>
  );
}
