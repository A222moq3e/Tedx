import { auth } from "~/server/auth";
import { signIn, signOut } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-2xl text-white">
            {session && <span>Logged in as {session.user?.name}</span>}
          </p>
          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
                Sign out
              </button>
            </form>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <button className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20">
                Sign in
              </button>
            </form>
          )}
        </div>

        {session && <div style={{ marginTop: "20px" }}>
          <h2>Full Session Data:</h2>
          <pre
            style={{
              backgroundColor: "#4A4A4A",
              padding: "10px",
              borderRadius: "4px",
              overflow: "auto",
              fontSize: "12px",
            }}
          >
            {JSON.stringify(session?.user, null, 2)}
          </pre>
        </div>}
      </main>
    </HydrateClient>
  );
}
