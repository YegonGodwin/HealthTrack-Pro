
import { useState, useRef } from 'react';
import { SendHorizontal, Mic, MicOff, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

const HealthChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI health assistant. How can I help you today?',
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock responses - in a real app, this would connect to OpenAI's API
  const mockResponses: Record<string, string> = {
    headache: "Headaches can be caused by dehydration, stress, or lack of sleep. Try drinking water, resting, and taking a break from screens. If it persists for more than 24 hours, consider consulting your doctor.",
    sleep: "For better sleep, try maintaining a consistent schedule, avoiding caffeine after noon, creating a relaxing bedtime routine, and keeping your bedroom cool and dark.",
    water: "The recommended daily water intake is about 8 glasses or 2 liters, but this varies based on your activity level, climate, and overall health.",
    exercise: "Even 30 minutes of moderate exercise daily can significantly improve your health. Try walking, swimming, or cycling if you're just starting out.",
    stress: "Managing stress through mindfulness meditation, deep breathing exercises, and regular physical activity can help improve both mental and physical health.",
    diet: "A balanced diet rich in fruits, vegetables, lean proteins, and whole grains is essential for maintaining good health. Try to limit processed foods and added sugars.",
  };

  const simulateAIResponse = (query: string) => {
    const lowerQuery = query.toLowerCase();
    let response = "I don't have specific information about that. Consider consulting your healthcare provider for personalized advice.";
    
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
      role: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // In a real app, this would be a call to OpenAI's API
      setTimeout(() => {
        const aiResponse = simulateAIResponse(input);
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: aiResponse,
          role: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
        scrollToBottom();
      }, 1000);
    } catch (error) {
      console.error('Error generating AI response:', error);
      toast({
        title: 'Error',
        description: 'Failed to get a response. Please try again.',
        variant: 'destructive',
      });
      setIsLoading(false);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast({
        title: 'Not Supported',
        description: 'Voice recognition is not supported in your browser.',
        variant: 'destructive',
      });
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast({
        title: 'Listening',
        description: 'Speak now...',
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
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast({
        title: 'Error',
        description: `Speech recognition error: ${event.error}`,
        variant: 'destructive',
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
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
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-health-blue/20 border border-health-blue/30 text-gray-800 dark:text-white ml-12'
                    : 'bg-gray-100/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 mr-12'
                }`}
              >
                <div className="flex items-start">
                  {message.role === 'assistant' && (
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-health-purple text-white">AI</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-[10px] text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {message.role === 'user' && (
                    <Avatar className="h-8 w-8 ml-2">
                      <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
                      <AvatarFallback className="bg-gray-400 text-white">U</AvatarFallback>
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
                    <AvatarFallback className="bg-health-purple text-white">AI</AvatarFallback>
                  </Avatar>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
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
