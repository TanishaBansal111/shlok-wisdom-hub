import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, Lock, Phone, User } from "lucide-react";

const SignupPage = () => {
  const [signupType, setSignupType] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    if (!formData.agreeToTerms) {
      alert("Please agree to the Terms of Service");
      return;
    }
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
            <CardTitle className="text-2xl font-sacred text-primary">Join Our Community</CardTitle>
            <CardDescription className="text-muted-foreground">
              Create an account to begin your spiritual journey
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex gap-2 p-1 bg-muted rounded-lg">
              <Button
                type="button"
                variant={signupType === "email" ? "default" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setSignupType("email")}
              >
                <Mail className="w-4 h-4 mr-2" />
                Email
              </Button>
              <Button
                type="button"
                variant={signupType === "phone" ? "default" : "ghost"}
                size="sm"
                className="flex-1"
                onClick={() => setSignupType("phone")}
              >
                <Phone className="w-4 h-4 mr-2" />
                Phone
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      name: e.target.value
                    }))}
                    className="pl-10"
                    required
                  />
                  <User className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={signupType}>
                  {signupType === "email" ? "Email Address" : "Phone Number"}
                </Label>
                <div className="relative">
                  <Input
                    id={signupType}
                    type={signupType === "email" ? "email" : "tel"}
                    placeholder={signupType === "email" ? "Enter your email" : "Enter your phone number"}
                    value={signupType === "email" ? formData.email : formData.phone}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      [signupType]: e.target.value
                    }))}
                    className="pl-10"
                    required
                  />
                  {signupType === "email" ? (
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
                    placeholder="Create a password"
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

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                    className="pl-10"
                    required
                  />
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => setFormData(prev => ({
                    ...prev,
                    agreeToTerms: checked as boolean
                  }))}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link to="/terms" className="text-accent hover:text-accent/80">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-accent hover:text-accent/80">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-divine-gradient hover:shadow-divine transition-all duration-300"
              >
                Create Account
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                Already have an account?
              </span>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-accent/50 hover:bg-accent/10" 
              asChild
            >
              <Link to="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;