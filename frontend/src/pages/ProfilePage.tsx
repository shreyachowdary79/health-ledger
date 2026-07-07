import { useAuth } from "../components/AuthProvider";

export function ProfilePage() {
  const { user } = useAuth();
  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <section className="rounded-md bg-white p-5 shadow-soft dark:bg-slate-900">
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Name</dt>
            <dd className="font-semibold">{user?.name}</dd>
          </div>
          <div>
            <dt className="text-sm text-slate-500">Email</dt>
            <dd className="font-semibold">{user?.email}</dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
