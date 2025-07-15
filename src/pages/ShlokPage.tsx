import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, Pause, Volume2, BookOpen, Hash } from "lucide-react";

const ShlokPage = () => {
  const { textId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [pageInput, setPageInput] = useState("");
  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false);

  // Sample data - in real app, this would come from API/database
  const textData = {
    "bhagavad-gita": {
      title: "Bhagavad Gita",
      subtitle: "Chapter 1: Arjuna's Dilemma",
      totalPages: 700,
      emoji: "📖"
    },
    "bible": {
      title: "Holy Bible",
      subtitle: "Genesis 1:1",
      totalPages: 31102,
      emoji: "✝️"
    },
    "quran": {
      title: "Holy Quran",
      subtitle: "Surah Al-Fatiha",
      totalPages: 6236,
      emoji: "🕌"
    },
    "guru-granth-sahib": {
      title: "Guru Granth Sahib",
      subtitle: "Japji Sahib",
      totalPages: 5894,
      emoji: "☬"
    }
  };

  const currentText = textData[textId as keyof typeof textData] || textData["bhagavad-gita"];

  // Sample shlok data
  const shlokData = {
    original: "धृतराष्ट्र उवाच। धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
    transliteration: "dhṛitarāśhtra uvācha\ndharma-kṣhetre kuru-kṣhetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāśhchaiva kim akurvata sañjaya",
    meaning: "धृतराष्ट्र ने कहा: हे संजय! धर्मक्षेत्र कुरुक्षेत्र में एकत्रित होकर युद्ध की इच्छा वाले मेरे और पांडु के पुत्रों ने क्या किया?",
    explanation: "यह श्लोक भगवद्गीता का आरंभ है। राजा धृतराष्ट्र अपने मंत्री संजय से कुरुक्षेत्र के युद्ध के बारे में पूछ रहे हैं।"
  };

  const handlePageJump = () => {
    const pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= currentText.totalPages) {
      setCurrentPage(pageNum);
      setIsPageDialogOpen(false);
      setPageInput("");
    }
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // Here you would integrate with TTS or audio player
  };

  const nextPage = () => {
    if (currentPage < currentText.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-sacred-gradient">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-accent/20 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Link>
              </Button>
              
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{currentText.emoji}</span>
                <div>
                  <h1 className="font-sacred text-lg text-primary">{currentText.title}</h1>
                  <p className="text-sm text-muted-foreground">{currentText.subtitle}</p>
                </div>
              </div>
            </div>

            <Dialog open={isPageDialogOpen} onOpenChange={setIsPageDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-accent/50">
                  <Hash className="w-4 h-4 mr-2" />
                  Page {currentPage}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Jump to Page</DialogTitle>
                  <DialogDescription>
                    Enter a page number between 1 and {currentText.totalPages.toLocaleString()}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="page-input">Page Number</Label>
                    <Input
                      id="page-input"
                      type="number"
                      min="1"
                      max={currentText.totalPages}
                      value={pageInput}
                      onChange={(e) => setPageInput(e.target.value)}
                      placeholder={`1 - ${currentText.totalPages.toLocaleString()}`}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsPageDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handlePageJump}>
                      Jump to Page
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-sacred bg-card-gradient backdrop-blur-sm border-accent/20 animate-fade-in">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-sacred text-primary mb-2">
              Shlok {currentPage}
            </CardTitle>
            <Badge variant="secondary" className="mx-auto bg-accent/20 text-accent-foreground">
              <BookOpen className="w-3 h-3 mr-1" />
              Original Sanskrit
            </Badge>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Original Text */}
            <div className="text-center space-y-4">
              <div className="bg-muted/50 rounded-lg p-6 border border-accent/20">
                <p className="text-lg leading-relaxed font-sacred text-primary whitespace-pre-line">
                  {shlokData.original}
                </p>
              </div>
              
              <div className="text-sm text-muted-foreground italic">
                {shlokData.transliteration}
              </div>
            </div>

            {/* Hindi Meaning */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-primary flex items-center">
                <span className="mr-2">📖</span>
                Meaning in Hindi
              </h3>
              <div className="bg-secondary/30 rounded-lg p-4 border border-accent/20">
                <p className="text-base leading-relaxed text-foreground">
                  {shlokData.meaning}
                </p>
              </div>
            </div>

            {/* Explanation */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary flex items-center">
                  <span className="mr-2">🧑‍🏫</span>
                  Explanation
                </h3>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleAudio}
                  className="border-accent/50 hover:bg-accent/10"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Listen
                    </>
                  )}
                  <Volume2 className="w-4 h-4 ml-2" />
                </Button>
              </div>
              
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20">
                <p className="text-base leading-relaxed text-foreground">
                  {shlokData.explanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <Button
            variant="outline"
            onClick={previousPage}
            disabled={currentPage === 1}
            className="border-accent/50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Page {currentPage.toLocaleString()} of {currentText.totalPages.toLocaleString()}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={currentPage === currentText.totalPages}
            className="border-accent/50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ShlokPage;