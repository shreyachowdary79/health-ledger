import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { useAuth } from "../components/AuthProvider";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4 dark:bg-slate-950">
      <form
        className="w-full max-w-md rounded-md bg-white p-6 shadow-soft dark:bg-slate-900"
        onSubmit={handleSubmit(async (values) => {
          setSubmitting(true);
          try {
            await login(values.email, values.password);
            navigate("/");
          } catch {
            toast.error("Invalid email or password");
          } finally {
            setSubmitting(false);
          }
        })}
      >
        <h1 className="text-2xl font-bold">Health Ledger</h1>
        <p className="mt-1 text-sm text-slate-500">Log in to continue.</p>
        <div className="mt-6 grid gap-4">
          <input className="rounded-md border border-slate-300 bg-transparent px-3 py-2" placeholder="Email" {...register("email", { required: true })} />
          <input className="rounded-md border border-slate-300 bg-transparent px-3 py-2" type="password" placeholder="Password" {...register("password", { required: true })} />
          <Button disabled={isSubmitting}>{isSubmitting ? "Signing in..." : "Sign in"}</Button>
        </div>
        <Link className="mt-4 block text-sm text-mint" to="/register">
          Create an account
        </Link>
      </form>
    </main>
  );
}
