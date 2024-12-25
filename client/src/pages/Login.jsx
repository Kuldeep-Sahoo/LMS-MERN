import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({
    email: "",
    password: ""
  });
  // registerUser: The function to trigger the mutation(i.e., make the POST request).
  // registerData: The data returned from the server if the mutation is successful.
  // registerError: Any error encountered during the mutation.
  // registerIsLoading: A boolean indicating if the request is still in progress.
  // registerIsSuccess: A boolean indicating if the mutation was successful.
  const [
    registerUser, {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess
    },
  ] = useRegisterUserMutation()

  const [loginUser, {
    data: loginData,
    error: loginError,
    isLoading: loginIsLoading,
    isSuccess: loginIsSuccess

  }] = useLoginUserMutation()
  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    console.log(inputData);
    const action = type === "signup" ? registerUser : loginUser
    await action(inputData);
  };
  const navigate=useNavigate()
  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup Successfull...")
    }
    if (registerError) {
      toast.error(registerError.data.message || "Signup failed!!!")
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login Successfull...")
      navigate("/")
    }
    if (loginError) {
      toast.error(loginError.data.message || "Login failed!!!")
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerError
  ])
  // const navigate=useNavigate()
  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="text"
                  name="name"
                  placeholder="eg. Kuldeep"
                  required
                  value={signupInput.name}
                />
              </div>
              <div className="space-y-1">
                <Label onChange={changeInputHandler} htmlFor="username">
                  Email
                </Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="email"
                  placeholder="eg. abc@123.com"
                  required
                  name="email"
                  value={signupInput.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="password"
                  name="password"
                  value={signupInput.password}
                  required
                  placeholder="eg. xyz%123"
                />
              </div>
            </CardContent>
            <CardFooter style={{ display: "flex", justifyContent: "center" }}>
              <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                  </>
                ) : "Signup"}

              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your passpord here. After signup, you will be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="email"
                  placeholder="eg. abc@123.com"
                  required
                  name="email"
                  value={loginInput.email}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="password"
                  name="password"
                  value={loginInput.password}
                  required
                  placeholder="abc@123"
                />
              </div>
            </CardContent>
            <CardFooter style={{ display: "flex", justifyContent: "center" }}>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait
                    </>
                  ) : "Login"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
