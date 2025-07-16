import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ChevronLeft, ChevronRight, Play, RotateCcw, BookOpen, Hash } from "lucide-react";
import guruImage from "@/assets/guru-ji.png";

const ShlokPage = () => {
  const { textId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGuru, setShowGuru] = useState(false);
  const [pageInput, setPageInput] = useState("");
  const [isPageDialogOpen, setIsPageDialogOpen] = useState(false);

  // Sample data - in real app, this would come from API/database
  const textData = {
    "bhagavad-gita": {
      title: "Bhagavad Gita",
      subtitle: "Chapter 1: Arjuna's Dilemma",
      totalPages: 7,
      emoji: "📖",
      language: "Sanskrit"
    },
    "bible": {
      title: "Holy Bible",
      subtitle: "Genesis 1:1",
      totalPages: 2,
      emoji: "✝️",
      language: "Hebrew"
    },
    "quran": {
      title: "Holy Quran",
      subtitle: "Surah Al-Fatiha",
      totalPages: 2,
      emoji: "🕌",
      language: "Arabic"
    },
    "guru-granth-sahib": {
      title: "Guru Granth Sahib",
      subtitle: "Japji Sahib",
      totalPages: 2,
      emoji: "☬",
      language: "Gurmukhi"
    }
  };

  const currentText = textData[textId as keyof typeof textData] || textData["bhagavad-gita"];

  // Extended shlok data for different texts and pages
  const shlokDatabase = {
    "bhagavad-gita": [
      {
        page: 1,
        original: "धृतराष्ट्र उवाच। धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥",
        transliteration: "dhṛitarāśhtra uvācha\ndharma-kṣhetre kuru-kṣhetre samavetā yuyutsavaḥ\nmāmakāḥ pāṇḍavāśhchaiva kim akurvata sañjaya",
        meaning: "धृतराष्ट्र ने कहा: हे संजय! धर्मक्षेत्र कुरुक्षेत्र में एकत्रित होकर युद्ध की इच्छा वाले मेरे और पांडु के पुत्रों ने क्या किया?"
      },
      {
        page: 2,
        original: "सञ्जय उवाच। दृष्ट्वा तु पाण्डवानीकं व्यूढं दुर्योधनस्तदा।\nआचार्यमुपसङ्गम्य राजा वचनमब्रवीत्॥",
        transliteration: "sañjaya uvācha\ndṛiṣhṭvā tu pāṇḍavānīkaṁ vyūḍhaṁ duryodhanastadā\nācāryamupasaṅgamya rājā vachanamabravīt",
        meaning: "संजय ने कहा: उस समय राजा दुर्योधन ने पांडवों की सेना को व्यूहबद्ध देखकर आचार्य द्रोण के पास जाकर ये वचन कहे।"
      },
      {
        page: 3,
        original: "पश्यैतां पाण्डुपुत्राणामाचार्य महतीं चमूम्।\nव्यूढां द्रुपदपुत्रेण तव शिष्येण धीमता॥",
        transliteration: "paśhyaitāṁ pāṇḍu-putrāṇām ācārya mahatīṁ chamūm\nvyūḍhāṁ drupada-putreṇa tava śhiṣhyeṇa dhīmatā",
        meaning: "हे आचार्य! आपके बुद्धिमान शिष्य द्रुपद के पुत्र धृष्टद्युम्न द्वारा व्यूहबद्ध की गई पांडुपुत्रों की इस महान सेना को देखिए।"
      },
      {
        page: 4,
        original: "अत्र शूरा महेष्वासा भीमार्जुनसमा युधि।\nयुयुधानो विराटश्च द्रुपदश्च महारथः॥",
        transliteration: "atra śhūrā maheṣhvāsā bhīmārjuna-samā yudhi\nyuyudhāno virāṭaśhcha drupadaśhcha mahārathaḥ",
        meaning: "इस सेना में युद्ध में भीम और अर्जुन के समान अनेक वीर महान धनुर्धर हैं, जैसे युयुधान, विराट और महारथी द्रुपद।"
      },
      {
        page: 5,
        original: "धृष्टकेतुश्चेकितानः काशिराजश्च वीर्यवान्।\nपुरुजित्कुन्तिभोजश्च शैब्यश्च नरपुङ्गवः॥",
        transliteration: "dhṛiṣhṭaketuśhchekitānaḥ kāśhirājaśhcha vīryavān\npurujit kuntibhojaśhcha śhaibyaśhcha narapuṅgavaḥ",
        meaning: "धृष्टकेतु, चेकितान, वीर्यवान काशिराज, पुरुजित, कुन्तिभोज और नरों में श्रेष्ठ शैब्य।"
      },
      {
        page: 6,
        original: "युधामन्युश्च विक्रान्त उत्तमौजाश्च वीर्यवान्।\nसौभद्रो द्रौपदेयाश्च सर्व एव महारथाः॥",
        transliteration: "yudhāmanyuśhcha vikrānta uttamaujāśhcha vīryavān\nsaubhadro draupadeyāśhcha sarva eva mahārathāḥ",
        meaning: "पराक्रमी युधामन्यु, वीर्यवान उत्तमौजा, सुभद्रा के पुत्र अभिमन्यु और द्रौपदी के पुत्र - ये सभी महान रथी योद्धा हैं।"
      },
      {
        page: 7,
        original: "अस्माकं तु विशिष्टा ये तान्निबोध द्विजोत्तम।\nनायका मम सैन्यस्य संज्ञार्थं तान्ब्रवीमि ते॥",
        transliteration: "asmākaṁ tu viśhiṣhṭā ye tān nibodha dvijottama\nnāyakā mama sainyasya saṁjñārthaṁ tān bravīmi te",
        meaning: "हे द्विजोत्तम! हमारी ओर के जो विशिष्ट योद्धा हैं, मेरी सेना के नायक हैं, उन्हें भी आपकी जानकारी के लिए मैं बताता हूं।"
      }
    ],
    "bible": [
      {
        page: 1,
        original: "בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ",
        transliteration: "B'reishit bara Elohim et hashamayim v'et ha'aretz",
        meaning: "आदि में परमेश्वर ने आकाश और पृथ्वी की सृष्टि की।"
      },
      {
        page: 2,
        original: "וְהָאָרֶץ הָיְתָה תֹהוּ וָבֹהוּ וְחֹשֶׁךְ עַל־פְּנֵי תְהוֹם",
        transliteration: "V'ha'aretz hayetah tohu vavohu v'choshech al-pnei t'hom",
        meaning: "पृथ्वी बेडौल और सुनसान पड़ी थी, और गहरे जल के ऊपर अंधकार था।"
      }
    ],
    "quran": [
      {
        page: 1,
        original: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        transliteration: "Bismillāhir-Raḥmānir-Raḥīm",
        meaning: "अल्लाह के नाम से जो अत्यंत कृपालु और दयावान है।"
      },
      {
        page: 2,
        original: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        transliteration: "Al-ḥamdu lillāhi rabbil-'ālamīn",
        meaning: "सारी प्रशंसा अल्लाह के लिए है जो सारे संसारों का पालनहार है।"
      }
    ],
    "guru-granth-sahib": [
      {
        page: 1,
        original: "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ",
        transliteration: "Ik Oankaar Sat Naam Kartaa Purakh Nirbhau Nirvair",
        meaning: "एक ओंकार, सत्य नाम, कर्ता पुरुष, निर्भय, निर्वैर।"
      },
      {
        page: 2,
        original: "ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ",
        transliteration: "Akaal Moorat Ajoonee Saibhan Gur Prasaad",
        meaning: "अकाल मूर्ति, अजन्मा, स्वयंभू, गुरु की कृपा से प्राप्त होने वाला।"
      }
    ]
  };

  const currentShlok = shlokDatabase[textId as keyof typeof shlokDatabase]?.[currentPage - 1] || shlokDatabase["bhagavad-gita"][0];

  const handlePageJump = () => {
    const pageNum = parseInt(pageInput);
    if (pageNum >= 1 && pageNum <= currentText.totalPages) {
      setCurrentPage(pageNum);
      setIsPageDialogOpen(false);
      setPageInput("");
    }
  };

  const playShlokaudio = async () => {
    setIsPlaying(true);
    setShowGuru(true);
    
    // Simulate TTS narration sequence in Hindi
    const speak = (text: string) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.7;
        return new Promise((resolve) => {
          utterance.onend = resolve;
          speechSynthesis.speak(utterance);
        });
      }
      return Promise.resolve();
    };

    try {
      await speak(`श्लोक संख्या ${currentPage}`);
      await speak(currentShlok.original);
      await speak("श्लोक का अर्थ है");
      await speak(currentShlok.meaning);
    } catch (error) {
      console.error("TTS Error:", error);
    }
    
    setIsPlaying(false);
    // Auto-reset after completion
    setTimeout(() => {
      setShowGuru(false);
    }, 1000);
  };

  const resetShlok = () => {
    setIsPlaying(false);
    setShowGuru(false);
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
  };

  const nextPage = () => {
    if (currentPage < currentText.totalPages) {
      setCurrentPage(currentPage + 1);
      resetShlok();
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      resetShlok();
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
        <div className="flex gap-2 sm:gap-4 items-start relative">
          {/* Sticky Responsive Guru Character */}
          {showGuru && (
            <div className="fixed top-1/2 left-2 transform -translate-y-1/2 z-50 w-16 sm:w-20 md:w-24 animate-fade-in">
              <Card className="bg-gradient-to-br from-orange-400 to-orange-500 border-orange-600/30 shadow-2xl">
                <CardContent className="p-2 sm:p-3 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-1 sm:mb-2 rounded-full overflow-hidden">
                    <img 
                      src={guruImage} 
                      alt="गुरु जी" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xs sm:text-sm font-sacred text-white mb-1">गुरु जी</h3>
                  <div className={`w-full h-0.5 sm:h-1 bg-orange-200 rounded-full overflow-hidden ${isPlaying ? 'animate-pulse' : ''}`}>
                    <div className={`h-full bg-white transition-all duration-1000 ${isPlaying ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Shlok Content */}
          <Card className={`flex-1 shadow-sacred bg-card-gradient backdrop-blur-sm border-accent/20 animate-fade-in transition-all duration-300 ${showGuru ? 'ml-20 sm:ml-24 md:ml-28' : ''}`}>
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-sacred text-primary mb-2">
                Shlok {currentPage}
              </CardTitle>
              <Badge variant="secondary" className="mx-auto bg-accent/20 text-accent-foreground">
                <BookOpen className="w-3 h-3 mr-1" />
                Original {currentText.language}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Original Text */}
              <div className="text-center space-y-4">
                <div className="bg-muted/50 rounded-lg p-6 border border-accent/20">
                  <p className="text-lg leading-relaxed font-sacred text-primary whitespace-pre-line">
                    {currentShlok.original}
                  </p>
                </div>
                
                <div className="text-sm text-muted-foreground italic">
                  {currentShlok.transliteration}
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
                    {currentShlok.meaning}
                  </p>
                </div>
              </div>

              {/* Play and Reset Buttons */}
              <div className="flex justify-center space-x-4">
                <Button
                  onClick={playShlokaudio}
                  disabled={isPlaying}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play Shlok
                </Button>
                
                <Button
                  variant="outline"
                  onClick={resetShlok}
                  className="border-accent/50 hover:bg-accent/10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

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