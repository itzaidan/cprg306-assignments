"use client";
import Link from "next/link";

import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  return (
    <div>
      <div>
        {user ? (
          <div>
            <div>
              <h1>Week 10</h1>
            </div>
            <div>
              <p>Hello there {user.displayName}!</p>
            </div>
            <div>
              <Link
                href="/week-10/shopping-list">
                Shopping List
              </Link>
            </div>
            <div>
              <button
                onClick={firebaseSignOut}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h1>Week 10</h1>
            </div>
            <div>
              <p>Please sign in</p>
            </div>
            <div>
              <button
                onClick={gitHubSignIn}>
                Sign In with GitHub
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}