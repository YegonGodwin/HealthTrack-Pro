
import { useState, useEffect } from 'react';
import { Mic, MicOff, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

const VoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [command, setCommand] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleVoiceCommand = () => {
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
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setCommand(null);
      setFeedback(null);
      setTranscript('');
      toast({
        title: 'Listening',
        description: 'Speak a command...',
      });
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      setTranscript(transcript);
      
      // Process the command
      processCommand(transcript);
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

  const processCommand = (transcript: string) => {
    // Detect command type
    if (transcript.includes('appointment') || transcript.includes('schedule') || transcript.includes('book')) {
      setCommand('appointment');
      setFeedback('Scheduling appointment. When would you like to book?');
      speakResponse('I can help you schedule an appointment. When would you like to book?');
      
      // In a real app, this would trigger a navigation to the appointment screen
      toast({
        title: 'Appointment Command',
        description: 'Navigating to appointment scheduler...',
      });
      
      // Simulate navigation
      setTimeout(() => {
        document.querySelector('[value="appointments"]')?.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        );
      }, 2000);
    } 
    else if (transcript.includes('reminder') || transcript.includes('medication')) {
      setCommand('medication');
      setFeedback('Setting up medication reminder. What medication do you need to be reminded about?');
      speakResponse('I can help you set a medication reminder. What medication do you need to be reminded about?');
      
      // In a real app, this would trigger a navigation to the medications screen
      toast({
        title: 'Medication Command',
        description: 'Navigating to medication reminders...',
      });
      
      // Simulate navigation
      setTimeout(() => {
        document.querySelector('[value="medications"]')?.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        );
      }, 2000);
    } 
    else if (transcript.includes('vitals') || transcript.includes('stats') || transcript.includes('metrics') || transcript.includes('dashboard')) {
      setCommand('vitals');
      setFeedback('Checking your vital signs and health metrics on the dashboard.');
      speakResponse('Here are your latest health metrics.');
      
      // In a real app, this would trigger a navigation to the dashboard
      toast({
        title: 'Vitals Command',
        description: 'Navigating to health dashboard...',
      });
      
      // Simulate navigation
      setTimeout(() => {
        document.querySelector('[value="dashboard"]')?.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        );
      }, 2000);
    }
    else if (transcript.includes('profile') || transcript.includes('settings') || transcript.includes('account')) {
      setCommand('profile');
      setFeedback('Opening your profile settings.');
      speakResponse('Opening your profile settings.');
      
      // In a real app, this would trigger a navigation to the profile
      toast({
        title: 'Profile Command',
        description: 'Navigating to profile settings...',
      });
      
      // Simulate navigation
      setTimeout(() => {
        document.querySelector('[value="profile"]')?.dispatchEvent(
          new MouseEvent('click', { bubbles: true })
        );
      }, 2000);
    }
    else {
      setCommand('unknown');
      setFeedback('I didn\'t recognize that command. Try saying "schedule appointment", "set medication reminder", "check my vitals", or "open profile".');
      speakResponse('I didn\'t recognize that command. Try saying schedule appointment, set medication reminder, check my vitals, or open profile.');
    }
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.rate = 1;
      speech.pitch = 1;
      speech.volume = 1;
      window.speechSynthesis.speak(speech);
    }
  };

  useEffect(() => {
    return () => {
      // Clean up speech synthesis when component unmounts
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <Card className="glass-card micro-bounce shadow-lg border border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Headphones size={20} className="text-health-purple" />
          Voice Commands
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center space-y-4 p-4 bg-gradient-to-b from-white/30 to-white/10 dark:from-gray-900/30 dark:to-gray-900/10 rounded-md">
          <Button
            onClick={handleVoiceCommand}
            variant="outline"
            size="lg"
            className={`w-16 h-16 rounded-full transition-all duration-500 ${
              isListening 
                ? 'bg-red-500/20 border-red-500 animate-pulse' 
                : 'bg-health-purple/20 border-health-purple/50 hover:bg-health-purple/30'
            }`}
          >
            {isListening ? (
              <MicOff className="h-8 w-8 text-red-500" />
            ) : (
              <Mic className="h-8 w-8 text-health-purple" />
            )}
          </Button>
          <p className="text-center text-sm font-medium">
            {isListening ? 'Listening...' : 'Tap to speak'}
          </p>
          
          {transcript && (
            <div className="w-full mt-4">
              <p className="text-xs text-gray-500 mb-1">You said:</p>
              <div className="p-2 bg-white/50 dark:bg-gray-800/50 rounded border border-gray-200 dark:border-gray-700">
                <p className="text-sm italic">"{transcript}"</p>
              </div>
            </div>
          )}
          
          {command && (
            <Badge className="mt-2" variant="outline">
              {command === 'unknown' ? 'Unrecognized Command' : `Command: ${command}`}
            </Badge>
          )}
          
          {feedback && (
            <div className="w-full mt-2 p-3 bg-health-blue/10 border border-health-blue/30 rounded-md">
              <p className="text-sm">{feedback}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-xs text-gray-500">Try saying:</p>
          <ul className="text-xs space-y-1">
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-health-blue rounded-full mr-2"></span>
              "Schedule an appointment with my doctor"
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-health-green rounded-full mr-2"></span>
              "Set a medication reminder for my pills"
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-health-purple rounded-full mr-2"></span>
              "Check my vital signs"
            </li>
            <li className="flex items-center">
              <span className="inline-block w-2 h-2 bg-health-yellow rounded-full mr-2"></span>
              "Open my profile settings"
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="pt-0 text-xs text-gray-500 justify-center">
        Voice commands work best in a quiet environment
      </CardFooter>
    </Card>
  );
};

export default VoiceCommands;
