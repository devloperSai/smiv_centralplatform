import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useAuth";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) return;

    loginMutation.mutate(
      { identifier: email, password: password },
      {
        onSuccess: () => {
          toast.success("Login successful");
          navigate("/dashboard");
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || error.message || "Invalid credentials. Please try again.");
        }
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-sm">
        <div className="grid-cell mb-0">
          <h1 className="font-display text-xl font-bold text-foreground tracking-tight">
            VoICET Control Panel
          </h1>
          <p className="text-xs text-muted-foreground font-body mt-1">
            Smart Intelligent Village Dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-cell">
            <label className="kpi-label block mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:border-foreground transition-colors"
              placeholder="operator@voicet.in"
              required
            />
          </div>
          <div className="grid-cell">
            <label className="kpi-label block mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border px-3 py-2 text-sm font-body text-foreground focus:outline-none focus:border-foreground transition-colors"
              placeholder="••••••••"
              required
            />
          </div>
          <div className="grid-cell">
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-foreground text-background font-display text-sm font-medium py-2.5 hover:bg-foreground/90 transition-colors tracking-wider disabled:opacity-50"
            >
              {loginMutation.isPending ? "AUTHENTICATING..." : "ACCESS PANEL"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
