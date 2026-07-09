import { useAuth } from "../components/AuthProvider";

export function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold text-white">Profile</h1>
      <section className="glass-panel rounded-[28px] p-5">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-400">Name</dt>
            <dd className="font-semibold text-white">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-400">Email</dt>
            <dd className="font-semibold text-white">{user?.email}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
