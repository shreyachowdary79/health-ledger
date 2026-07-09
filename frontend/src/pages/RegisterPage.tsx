import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/Button";
import { useAuth } from "../components/AuthProvider";

export function RegisterPage() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState(false);
  const { register, handleSubmit } = useForm<{ name: string; email: string; password: string }>();

  return (
    <main className="relative grid min-h-screen place-items-center px-4">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
      <form
        className="glass-panel relative z-10 w-full max-w-md rounded-[32px] p-8"
        onSubmit={handleSubmit(async (values) => {
          setSubmitting(true);
          try {
            await registerUser(values.name, values.email, values.password);
            navigate("/");
          } catch (error) {
            const message = axios.isAxiosError(error) ? error.response?.data?.message ?? "Registration failed" : "Registration failed";
            toast.error(message);
          } finally {
            setSubmitting(false);
          }
        })}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/80">Health Ledger</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">Create your account</h1>
        <div className="mt-6 grid gap-4">
          <input className="glass-input rounded-2xl px-4 py-3" placeholder="Name" {...register("name", { required: true })} />
          <input className="glass-input rounded-2xl px-4 py-3" placeholder="Email" {...register("email", { required: true })} />
          <input className="glass-input rounded-2xl px-4 py-3" type="password" placeholder="Password" {...register("password", { required: true, minLength: 8 })} />
          <Button className="rounded-full bg-premium text-slate-950 shadow-glow" disabled={isSubmitting}>{isSubmitting ? "Creating..." : "Create account"}</Button>
        </div>
        <Link className="mt-5 block text-sm text-emerald-300 transition hover:text-cyan-300" to="/login">
          I already have an account
        </Link>
      </form>
    </main>
  );
}
