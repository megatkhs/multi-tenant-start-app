import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    if (!context.tenant) {
      throw notFound();
    }

    return { tenant: context.tenant };
  },
});

function Home() {
  const { tenant } = Route.useLoaderData();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">テナント: {tenant}</h1>
      <p>このページは {tenant} 向けに動的配信されています。</p>
    </main>
  );
}
