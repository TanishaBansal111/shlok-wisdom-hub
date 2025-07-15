import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Users, BookOpen } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Sacred Texts",
      description: "Access multiple holy scriptures in their original languages"
    },
    {
      icon: Heart,
      title: "Spiritual Growth",
      description: "Deepen your understanding with guided explanations"
    },
    {
      icon: Users,
      title: "Community",
      description: "Join thousands on their spiritual journey"
    }
  ];

  return (
    <div className="min-h-screen bg-sacred-gradient">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <div className="mx-auto w-24 h-24 bg-divine-gradient rounded-full flex items-center justify-center shadow-divine mb-6 animate-divine-glow">
              <span className="text-4xl">🕉️</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-sacred text-primary mb-6">
              Sacred Texts
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover the wisdom of ages through beautiful digital scriptures with guided explanations and spiritual insights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button size="lg" className="bg-divine-gradient hover:shadow-divine transition-all duration-300" asChild>
              <Link to="/signup">
                Begin Your Journey
                <Star className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="border-accent/50 hover:bg-accent/10" asChild>
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>

          <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-accent/20 text-accent-foreground">
                Free
              </Badge>
              <span>No subscription required</span>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-accent" />
              <span>Made with devotion</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-3xl font-sacred text-primary mb-4">
            Why Choose Sacred Texts?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience ancient wisdom through modern technology, designed for seekers of all backgrounds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="text-center shadow-card bg-card-gradient backdrop-blur-sm border-accent/20 hover:shadow-sacred transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-divine-gradient rounded-full flex items-center justify-center shadow-divine mb-4">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-sacred text-primary">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.8s" }}>
          <h2 className="text-3xl font-sacred text-primary mb-4">
            Ready to Begin?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community and start exploring the profound wisdom of sacred texts today.
          </p>
          
          <Button size="lg" className="bg-divine-gradient hover:shadow-divine transition-all duration-300" asChild>
            <Link to="/signup">
              Start Reading Now
              <BookOpen className="w-5 h-5 ml-2" />
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:text-accent/80 transition-colors">
              Sign in here
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
