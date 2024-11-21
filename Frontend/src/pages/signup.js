import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { DollarSign } from "lucide-react";
import Link from "next/link";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { setUserInfo } = useContext(UserContext);

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    if (!formData.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    if (!validateForm()) return;
    setUserInfo({
      name: formData.name,
      password: formData.password,
    });
    router.push("/onboarding");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700">
        <CardHeader className="flex flex-col items-center">
          <div className="bg-green-500 p-3 rounded-full">
            <DollarSign className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl text-center">
            BlackSite Finance
          </CardTitle>
          <CardDescription className="text-gray-400">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 -mt-2">
          <div className="space-y-2">
            <Label htmlFor="username">Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              type="text"
              className={`bg-gray-700 border-gray-600 text-white ${
                errors.name ? "border-red-500" : ""
              }`}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              className={`bg-gray-700 border-gray-600 text-white ${
                errors.password ? "border-red-500" : ""
              }`}
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              className={`bg-gray-700 border-gray-600 text-white ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          <Button
            onClick={handleSignup}
            className="w-full bg-green-500 hover:bg-green-600 text-white"
          >
            Sign Up
          </Button>
          <p className="mt-4 text-sm text-gray-400">
            Already have an account?{" "}
            <Link href="/login" className="text-green-500 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
