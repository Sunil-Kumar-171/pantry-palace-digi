import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) setError(error.message);
    else setSent(true);
    setSubmitting(false);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/auth" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Sign In
        </Link>
        <h1 className="font-display text-3xl font-semibold mb-2">Reset Password</h1>
        <p className="text-muted-foreground text-sm mb-8">Enter your email and we'll send you a reset link.</p>

        {sent ? (
          <div className="bg-accent/10 text-accent text-sm p-4 rounded-sm text-center">
            Check your email for a password reset link.
          </div>
        ) : (
          <>
            {error && <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-sm mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="you@example.com"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3.5 text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
};

export default ForgotPassword;
