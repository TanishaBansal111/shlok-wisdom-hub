import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Book, Star, Heart } from "lucide-react";

const Dashboard = () => {
  const holyTexts = [
    {
      id: "bhagavad-gita",
      title: "Bhagavad Gita",
      description: "The eternal conversation between Lord Krishna and Arjuna",
      emoji: "📖",
      chapters: 18,
      verses: 700,
      language: "Sanskrit",
      color: "from-orange-400 to-orange-600"
    },
    {
      id: "bible",
      title: "Holy Bible",
      description: "The sacred scriptures of Christianity",
      emoji: "✝️",
      chapters: 66,
      verses: 31102,
      language: "Hebrew/Greek",
      color: "from-blue-400 to-blue-600"
    },
    {
      id: "quran",
      title: "Holy Quran",
      description: "The divine revelation to Prophet Muhammad",
      emoji: "🕌",
      chapters: 114,
      verses: 6236,
      language: "Arabic",
      color: "from-green-400 to-green-600"
    },
    {
      id: "guru-granth-sahib",
      title: "Guru Granth Sahib",
      description: "The eternal Guru of the Sikhs",
      emoji: "☬",
      chapters: 31,
      verses: 5894,
      language: "Gurmukhi",
      color: "from-yellow-400 to-yellow-600"
    }
  ];

  const handleLogout = () => {
    // For now, just navigate to login - will integrate with Supabase later
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-sacred-gradient">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-accent/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-divine-gradient rounded-full flex items-center justify-center shadow-divine">
              <span className="text-lg">🕉️</span>
            </div>
            <h1 className="text-xl font-sacred text-primary">Sacred Texts</h1>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-muted-foreground hover:text-primary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-sacred text-primary mb-4">
            Select a Holy Text
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immerse yourself in the wisdom of sacred scriptures. Each text offers profound insights 
            and spiritual guidance for your journey of enlightenment.
          </p>
        </div>

        {/* Holy Texts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {holyTexts.map((text, index) => (
            <Card 
              key={text.id}
              className="group hover:shadow-sacred transition-all duration-300 cursor-pointer border-accent/20 bg-card-gradient backdrop-blur-sm hover:scale-105 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/text/${text.id}`} className="block">
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto w-20 h-20 bg-gradient-to-br ${text.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-divine transition-shadow duration-300`}>
                    <span className="text-3xl">{text.emoji}</span>
                  </div>
                  <CardTitle className="text-xl font-sacred text-primary group-hover:text-accent transition-colors">
                    {text.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {text.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Book className="w-4 h-4" />
                      <span>{text.chapters} chapters</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>{text.verses.toLocaleString()} verses</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Badge 
                      variant="secondary" 
                      className="bg-accent/20 text-accent-foreground border-accent/30"
                    >
                      {text.language}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-center space-x-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <Heart className="w-3 h-3" />
                    <span>Click to explore</span>
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-12 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          <p className="text-sm text-muted-foreground">
            More sacred texts will be added soon. Stay tuned for updates! 🙏
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;