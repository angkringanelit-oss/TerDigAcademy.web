import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, Brain, MessageCircle, ArrowLeft } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { useNavigate } from "react-router-dom";
import { logger } from "@/lib/logger";

// Import mascot image
import quenChildImg from "../assets/Quen Child.png";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AIConsultationPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Halo! Saya Quen, asisten AI TerDig yang siap membantu anak belajar dengan cara yang menyenangkan! Mau belajar apa hari ini?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on input when component mounts
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();

    // Reset error sebelum request baru
    setErrorMessage(null);

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      content: userMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const proxyUrl = import.meta.env.VITE_GROQ_PROXY_URL;
      
      if (!proxyUrl) {
        throw new Error("URL proxy AI tidak ditemukan. Silakan periksa konfigurasi environment.");
      }

      logger.info("Sending message to AI proxy:", proxyUrl);
      
      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "user", content: userMessage }
          ]
        }),
      });

      const data = await response.json();

      // Handle rate limit (429)
      if (response.status === 429) {
        setErrorMessage(`⏰ ${data.message} (Coba lagi dalam ${data.retryAfter})`);
        return;
      }

      // Handle AI unavailable / server error (503 or other)
      if (response.status === 503 || !response.ok) {
        setErrorMessage(`🤖 ${data.message || 'Terjadi kesalahan pada server AI.'}`);
        return;
      }

      const aiMessage = data.response || "Aku belum tahu jawabannya, tapi aku akan belajar lagi!";

      logger.success("AI response received");
      
      // Add AI response
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiMessage,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, newAiMessage]);
    } catch (error) {
      logger.error("Error getting AI response:", error);
      
      setErrorMessage(`🤖 Terjadi kesalahan pada server AI.`);
    } finally {
      setIsTyping(false);
      // Refocus on input after sending message
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Konsultasi AI</h1>
                <p className="text-sm text-gray-600">Belajar bersama Quen, AI tutor ramah anak</p>
              </div>
            </div>
            <div className="ml-auto">
              <Badge className="bg-green-100 text-green-700">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* AI Mascot Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-purple-700">
                  <Sparkles className="w-5 h-5" />
                  Quen AI
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Mascot 
                  src={quenChildImg}
                  alt="Quen Child - AI Tutor"
                  size="lg"
                  animation="breathing"
                  className="mx-auto"
                />
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    Halo! Saya Quen, AI tutor yang siap membantu anak belajar dengan cara yang menyenangkan!
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    <Badge variant="secondary" className="text-xs">Bahasa Indonesia</Badge>
                    <Badge variant="secondary" className="text-xs">Matematika</Badge>
                    <Badge variant="secondary" className="text-xs">Sains</Badge>
                    <Badge variant="secondary" className="text-xs">Bahasa Inggris</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    <div>
                      <CardTitle className="text-lg">Chat dengan Quen AI</CardTitle>
                      <p className="text-sm text-gray-600">Tanya apa saja tentang pelajaran anak</p>
                    </div>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">
                    {messages.length - 1} pesan
                  </Badge>
                </div>
              </CardHeader>

              {/* Error Banner */}
              {errorMessage && (
                <div className="px-4 pt-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 animate-in fade-in slide-in-from-top-2">
                    <p className="text-amber-800 text-sm mb-3 font-medium">{errorMessage}</p>
                    <a
                      href="https://wa.me/628953395950?text=Halo%20Admin%20TerDig,%20saya%20butuh%20bantuan%20tentang%20bimbel%20atau%20AI%20Tutor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors shadow-sm"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                      Chat Admin via WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-line ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      <p className={`text-xs mt-2 ${
                        message.sender === "user" ? "text-blue-100" : "text-gray-500"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-100 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-3">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pertanyaan untuk anak di sini..."
                    className="flex-1 border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 rounded-xl"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Tekan Enter untuk mengirim pesan
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}