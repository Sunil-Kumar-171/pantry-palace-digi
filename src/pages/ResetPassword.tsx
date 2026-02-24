import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Check for recovery token in URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setReady(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setError(error.message);
    } else {
      navigate("/", { replace: true });
    }
    setSubmitting(false);
  };

  if (!ready) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <p className="text-muted-foreground">Invalid or expired reset link.</p>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="font-display text-3xl font-semibold mb-2">Set New Password</h1>
        <p className="text-muted-foreground text-sm mb-8">Enter your new password below.</p>

        {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-sm mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
            placeholder="New password (min 6 characters)"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-3.5 text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ResetPassword;
