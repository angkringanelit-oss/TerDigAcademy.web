import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Sparkles, Brain, MessageCircle, ArrowLeft } from "lucide-react";
import { Mascot } from "../components/Mascot";
import { useNavigate } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

const aiResponses = [
  "Halo! Saya Quen, asisten AI TerDig yang siap membantu anak belajar dengan cara yang menyenangkan! Apa yang ingin dipelajari hari ini?",
  "Pertanyaan yang bagus! Mari kita belajar bersama dengan cara yang mudah dan menyenangkan...",
  "Wah, anak yang pintar! Saya akan jelaskan dengan gambar dan cerita yang seru. Apakah ada yang ingin ditanyakan lagi?",
  "Bagus sekali! Anak sudah memahami konsep dasarnya. Sekarang mari kita coba latihan yang lebih seru!",
  "Excellent! Anak hebat sekali! Sekarang mari kita lanjut ke materi yang lebih menarik.",
  "Jangan khawatir kalau masih bingung, itu wajar kok! Mari kita coba cara lain yang lebih mudah...",
  "Wah, pertanyaan yang cerdas! Ini menunjukkan anak sudah berpikir dengan baik. Mari kita explore lebih dalam...",
];

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
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
                  src="/images/quen-child-mascot.png"
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
                      className={`max-w-[80%] p-3 rounded-2xl ${
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
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-3">
                  <Input
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
