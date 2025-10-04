import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { http } from "@/lib/http";
import axios from "axios";

const schema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface SignupData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: SignupData) => {
    setLoading(true);
    try {
      setLoading(true);
      await http.post("/signup", data);
      toast.success("Account created successfully! Please log in.");
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        toast.error(
          error.response?.data?.data?.message ||
            "Signup failed. Please try again."
        );
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto flex justify-center items-center py-[100px]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("username")}
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username?.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register("email")}
                  name="email"
                  type="email"
                  placeholder="Enter Email Address"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email?.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>

                <Input
                  {...register("password")}
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password?.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>

                <Input
                  {...register("confirmPassword")}
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <Button className="w-full" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : "Sign Up"}
              </Button>
            </div>
            <div className="mt-6">
              <p>
                Already have an account?{" "}
                <Link to={"/login"} className="underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupPage;
