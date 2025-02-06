"use client"
import { useSession, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // Optionally, show a loading state
  }
        console.log(session)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {session ? (
        <div className="text-center">
          <img
            src={session.user?.image || "/default-avatar.png"} // Fallback to a default image if no profile image
            alt={session.user?.name || "User"}
            className="w-72 h-72 rounded-full mb-4"
          />
          <h1 className="text-2xl mb-2">{session.user?.name}</h1>
          <p className="mb-4">{session.user?.email}</p>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div>
          <h1>You are not signed in</h1>
        </div>
      )}
    </div>
  );
}
