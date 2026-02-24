import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const { user, loading, signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) return null;
  if (user) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);

    if (isSignUp) {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        setError(error.message);
      } else {
        setMessage("Check your email for a verification link before signing in.");
        setIsSignUp(false);
        setPassword("");
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError(error.message);
      }
    }
    setSubmitting(false);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <h1 className="font-display text-3xl font-semibold text-center mb-2">
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>
        <p className="text-muted-foreground text-center text-sm mb-8">
          {isSignUp ? "Join MAISON for an elevated shopping experience" : "Sign in to your MAISON account"}
        </p>

        {message && (
          <div className="bg-accent/10 text-accent text-sm p-3 rounded-sm mb-4 text-center">{message}</div>
        )}
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-sm mb-4 text-center">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold tracking-wide uppercase mb-1.5">Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="Your name"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold tracking-wide uppercase mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-accent"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold tracking-wide uppercase mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border bg-background px-4 py-3 text-sm rounded-sm focus:outline-none focus:ring-1 focus:ring-accent pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-primary text-primary-foreground py-3.5 text-sm font-semibold tracking-wider uppercase rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {submitting ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => { setIsSignUp(!isSignUp); setError(""); setMessage(""); }}
            className="text-accent font-medium hover:underline"
          >
            {isSignUp ? "Sign In" : "Create Account"}
          </button>
        </p>

        {!isSignUp && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            <Link to="/forgot-password" className="text-accent font-medium hover:underline">
              Forgot your password?
            </Link>
          </p>
        )}
      </div>
    </main>
  );
};

export default Auth;
