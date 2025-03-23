import { useState, useRef } from "react";
import { SendHorizontal, Mic, MicOff, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const HealthChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI health assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock responses - in a real app, this would connect to OpenAI's API
  const mockResponses: Record<string, string> = {
    headache:
      "Headaches can be caused by dehydration, stress, or lack of sleep. Try drinking water, resting, and taking a break from screens. If it persists for more than 24 hours or worsens, consider consulting your doctor.",

    sleep:
      "For better sleep, maintain a consistent sleep schedule, avoid caffeine after noon, create a relaxing bedtime routine, and keep your bedroom cool and dark. Avoid screens at least an hour before bed.",

    water:
      "The recommended daily water intake is about 8 glasses (2 liters), but this varies based on activity level, climate, and individual health needs. Listen to your body's signals and hydrate accordingly.",

    exercise:
      "Engaging in 30 minutes of moderate exercise daily can improve cardiovascular health, mood, and overall well-being. Walking, jogging, yoga, or swimming are great options to start with.",

    stress:
      "Managing stress through mindfulness meditation, deep breathing, regular exercise, and proper sleep can improve mental and physical health. Consider speaking with a therapist if stress becomes overwhelming.",

    diet: "A balanced diet rich in fruits, vegetables, lean proteins, and whole grains supports overall health. Minimize processed foods, excess sugar, and unhealthy fats for better long-term well-being.",

    fever:
      "A mild fever can be managed by staying hydrated, resting, and using over-the-counter fever reducers like acetaminophen. If it exceeds 102°F (38.9°C) or lasts more than three days, consult a doctor.",

    cough:
      "A cough can result from allergies, infections, or irritants. Drinking warm fluids, using a humidifier, and resting your voice may help. If it lasts more than two weeks, see a doctor.",

    cold: "Rest, drink plenty of fluids, and consider using a saline spray or steam to ease congestion. Over-the-counter medications may help with symptom relief, but consult a doctor if symptoms worsen.",

    flu: "Flu symptoms include fever, body aches, cough, and fatigue. Rest, stay hydrated, and take fever-reducing medication if needed. If symptoms are severe or prolonged, seek medical attention.",

    stomach_pain:
      "Mild stomach pain can be caused by indigestion, gas, or stress. Drinking warm water, resting, and eating light meals may help. If the pain is severe or persistent, seek medical care.",

    heartburn:
      "Heartburn is often caused by spicy or acidic foods. Try eating smaller meals, avoiding late-night snacks, and drinking water. If it happens frequently, consult your doctor.",

    nausea:
      "Ginger tea, staying hydrated, and avoiding strong smells may help with nausea. If vomiting persists for more than 24 hours, seek medical attention.",

    diarrhea:
      "Stay hydrated and consume light meals like bananas, rice, applesauce, and toast. If diarrhea persists for more than two days or you notice dehydration signs, contact a doctor.",

    constipation:
      "Eating fiber-rich foods, drinking more water, and staying physically active can help relieve constipation. If it lasts for more than a week, consider consulting a doctor.",

    allergies:
      "Common allergy symptoms include sneezing, itchy eyes, and congestion. Avoid known triggers and consider antihistamines if needed. If symptoms are severe, consult an allergist.",

    blood_pressure:
      "Maintaining a healthy diet, reducing salt intake, exercising regularly, and managing stress can help regulate blood pressure. If it’s consistently high or low, consult a doctor.",

    diabetes:
      "Managing diabetes requires a balanced diet, regular exercise, and monitoring blood sugar levels. If you have concerns about symptoms or medication, seek medical advice.",

    back_pain:
      "Improving posture, stretching, and applying heat or cold packs can help with back pain. If pain persists for more than two weeks or worsens, consult a doctor.",

    joint_pain:
      "Joint pain can be due to arthritis, inflammation, or injury. Rest, applying ice, and over-the-counter pain relievers may help. If pain is chronic or severe, consult a specialist.",

    skin_rash:
      "A rash may result from allergies, irritation, or infections. Keeping the area clean and applying a soothing cream can help. If the rash spreads or worsens, seek medical attention.",

    eye_pain:
      "Eye pain may be caused by strain, dryness, or an infection. Resting your eyes, using artificial tears, and reducing screen time may help. If pain is severe or vision is affected, see an ophthalmologist.",

    eye_pains:
      "Eye pain may be caused by strain, dryness, or an infection. Resting your eyes, using artificial tears, and reducing screen time may help. If pain is severe or vision is affected, see an ophthalmologist.",

    ear_pain:
      "Ear pain can be due to infections, allergies, or wax buildup. Applying a warm compress may help, but if pain persists, consult a doctor.",

    dizziness:
      "Dizziness can be caused by dehydration, low blood sugar, or inner ear issues. Sitting down, drinking water, and eating a small snack may help. Seek medical care if dizziness is frequent or severe.",

    fatigue:
      "Chronic fatigue can be caused by lack of sleep, poor diet, or underlying conditions. Eating well, staying active, and maintaining a proper sleep schedule can help. If fatigue persists, seek medical advice.",

    depression:
      "Depression can affect daily life and requires proper support. Talking to a therapist, engaging in self-care, and reaching out to loved ones can help. Seek professional help if symptoms persist.",

    anxiety:
      "Deep breathing, mindfulness, and exercise can help manage anxiety. If it interferes with daily life, consider therapy or professional guidance.",

    vaccination:
      "Vaccinations help prevent serious illnesses. Check with your doctor about recommended vaccines based on your age, travel plans, and health history.",

    covid:
      "COVID-19 symptoms include fever, cough, and shortness of breath. Isolate if you have symptoms, get tested, and follow local health guidelines. Seek immediate medical care if you have breathing difficulties.",

    smoking:
      "Quitting smoking reduces the risk of heart disease, lung disease, and cancer. Support groups, nicotine patches, and behavioral therapy can help with quitting.",

    alcohol:
      "Excessive alcohol consumption can harm the liver, brain, and heart. Moderation or seeking support to reduce intake can improve health and well-being.",

    pregnancy:
      "Prenatal care is crucial for a healthy pregnancy. Eating nutritious food, staying hydrated, and avoiding harmful substances are essential. Regular check-ups with a doctor are recommended.",

    menopause:
      "Menopause symptoms include hot flashes, mood swings, and sleep disturbances. Lifestyle adjustments, hormone therapy, or medication may help manage symptoms.",

    weight_loss:
      "A healthy approach to weight loss includes a balanced diet, regular exercise, and consistent habits. Avoid crash diets and focus on sustainable changes.",

    weight_gain:
      "Gaining weight healthily involves consuming nutrient-rich foods, strength training, and ensuring a proper caloric intake. Avoid processed junk foods.",

    hydration:
      "Proper hydration is essential for bodily functions. Drink water regularly, and adjust intake based on physical activity and climate.",

    mental_health:
      "Taking care of mental health involves self-care, social support, and seeking professional help if needed. Don't hesitate to talk to someone if you're struggling.",

    general_checkup:
      "Regular health check-ups help detect issues early. It’s recommended to visit a doctor for routine exams at least once a year.",
  };

  const simulateAIResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response =
      "I don't have specific information about that. Consider consulting your healthcare provider for personalized advice.";

    // Check if the query contains any of our keywords
    Object.entries(mockResponses).forEach(([keyword, answer]) => {
      if (lowerQuery.includes(keyword)) {
        response = answer;
      }
    });

    return response;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // In a real app, this would be a call to OpenAI's API
      setTimeout(() => {
        const aiResponse = simulateAIResponse(input);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
        scrollToBottom();
      }, 1000);
    } catch (error) {
      console.error("Error generating AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleVoiceInput = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: "Listening",
        description: "Speak now...",
      });
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);

      // Auto-send the voice message
      setTimeout(() => {
        setInput(transcript);
        handleSendMessage();
      }, 500);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      toast({
        title: "Error",
        description: `Speech recognition error: ${event.error}`,
        variant: "destructive",
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="flex flex-col h-[500px] glass-card micro-bounce shadow-lg border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot size={20} className="text-health-blue" />
          Health Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto mb-2 p-4 bg-gradient-to-b from-white/30 to-white/10 dark:from-gray-900/30 dark:to-gray-900/10 rounded-md">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-health-blue/20 border border-health-blue/30 text-gray-800 dark:text-white ml-12"
                    : "bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 mr-12"
                }`}
              >
                <div className="flex items-start">
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-health-purple text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                      <AvatarFallback className="bg-gray-400 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 mr-12">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-health-purple text-white">
                      AI
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="pt-3">
        <div className="flex w-full items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleVoiceInput}
            disabled={isListening}
            className="flex-shrink-0 transition-all duration-300 hover:bg-health-blue/20"
          >
            {isListening ? (
              <MicOff className="h-5 w-5 text-red-500" />
            ) : (
              <Mic className="h-5 w-5 text-health-blue" />
            )}
          </Button>
          <Input
            ref={inputRef}
            placeholder="Ask about health, diet, exercise..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || isListening}
            className="flex-grow transition-all duration-300 focus:ring-2 focus:ring-health-blue/50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 bg-health-blue hover:bg-health-blue/90 transition-all duration-300"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HealthChatbot;
