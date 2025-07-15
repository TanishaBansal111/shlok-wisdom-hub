import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Phone } from "lucide-react";

const LoginPage = () => {
  const [loginType, setLoginType] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, just navigate to dashboard - will integrate with Supabase later
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-sacred-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="shadow-sacred bg-card-gradient backdrop-blur-sm border-accent/20">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-divine-gradient rounded-full flex items-center justify-center shadow-divine">
              <span className="text-2xl">🕉️</span>
            </div>
            <CardTitle className="text-2xl font-sacred text-primary">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to continue your spiritual journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <Button
                type="button"
                variant={loginType === "email" ? "default" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setLoginType("email")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                type="button"
                variant={loginType === "phone" ? "default" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setLoginType("phone")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={loginType}>
                  {loginType === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <div className="relative">
                  <Input
                    id={loginType}
                    type={loginType === "email" ? "email" : "tel"}
                    placeholder={loginType === "email" ? "Enter your email" : "Enter your phone number"}
                    value={loginType === "email" ? formData.email : formData.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [loginType]: e.target.value
                    }))}
                    className="pl-10"
                    required
                  />
                  {loginType === "email" ? (
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  ) : (
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      password: e.target.value
                    }))}
                    className="pl-10"
                    required
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                </div>
              </div>

              <div className="flex justify-end">
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-divine-gradient hover:shadow-divine transition-all duration-300"
              >
                Sign In
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                Don't have an account?
              </span>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-accent/50 hover:bg-accent/10" 
              asChild
            >
              <Link to="/signup">Create New Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;