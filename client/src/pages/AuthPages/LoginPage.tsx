import { JSX } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useLogin } from "../../hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
// import authServices from "../../services/api/authServices";

export default function LoginForm(): JSX.Element {
  const { loginForm, handleInputChange, handleFormSubmit } = useLogin();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card text-primary p-8 rounded-lg shadow-sm w-full max-w-sm border border-card">
        <h2 className="text-2xl font-bold mb-2">Login to your account</h2>
        <p className="text-gray-400 text-sm mb-6">
          Enter your credentials to access your account
        </p>

        <div className="flex gap-4 mb-6">
          <Button className="flex-1 flex items-center justify-center gap-2 border border-secondary py-2 rounded-md hover:bg-primary/80 transition">
            <FaGithub className="text-lg" />
            GitHub
          </Button>
          <Button className="flex-1 flex items-center justify-center gap-2 border border-secondary py-2 rounded-md hover:bg-primary/80 transition">
            <FaGoogle className="text-lg" />
            Google
          </Button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <hr className="flex-grow border-gray-700" />
          <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
          <hr className="flex-grow border-gray-700" />
        </div>

        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <Label htmlFor="email" className="block text-sm mb-1">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              required
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
              value={loginForm.email}
              placeholder="m@example.com"
              className="\"
            />
          </div>
          <div>
            <Label className="block text-sm mb-1">Password</Label>
            <Input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="********"
              id="password"
              required
              onChange={handleInputChange}
              value={loginForm.password}
              className=""
            />
          </div>
          <Button
            variant="default"
            type="submit"
            className="w-full font-medium py-2 rounded-md transition"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
