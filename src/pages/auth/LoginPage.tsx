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
import { http } from "@/lib/http";
import { Loader } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "sonner";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      setLoading(true);
      const res = await http.post("/login", data);

      if (res.data.data) {
        login(res.data.data.accessToken, res.data.data.user);
        toast.success("Login Successfully");
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        toast.error(error.response?.data?.data?.message || "Failed to login");
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
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
              <Button className="w-full" disabled={loading}>
                {loading ? <Loader className="animate-spin" /> : "Login"}
              </Button>
            </div>
            <div className="mt-6">
              <p>
                Have already an account click here to{" "}
                <Link to={"/signup"} className="underline font-medium">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
