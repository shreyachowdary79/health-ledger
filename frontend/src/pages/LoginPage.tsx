import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";
import { useAuth } from "../components/AuthProvider";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<{ email: string; password: string }>();

  return (
    <main className="relative grid min-h-screen place-items-center px-4">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
      <form
        className="glass-panel relative z-10 w-full max-w-md rounded-[32px] p-8"
        onSubmit={handleSubmit(async (values) => {
          setSubmitting(true);
          try {
            await login(values.email, values.password);
            navigate("/");
          } catch (error) {
            const message = axios.isAxiosError(error) ? error.response?.data?.message ?? "Invalid email or password" : "Invalid email or password";
            toast.error(message);
          } finally {
            setSubmitting(false);
          }
        })}
      >
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Health Ledger</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-400">Sign in to your healthcare dashboard.</p>
        </div>
        <div className="grid gap-4">
          <input className="glass-input rounded-2xl px-4 py-3" placeholder="Email" {...register("email", { required: true })} />
          <input className="glass-input rounded-2xl px-4 py-3" type="password" placeholder="Password" {...register("password", { required: true })} />
          <Button className="rounded-full bg-premium text-slate-950 shadow-glow" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>
        <Link className="mt-5 block text-sm text-emerald-300 transition hover:text-cyan-300" to="/register">
          Create an account
        </Link>
      </form>
    </main>
  );
}
