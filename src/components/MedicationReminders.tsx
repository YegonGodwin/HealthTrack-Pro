
import { useState } from 'react';
import { Pill, Plus, Clock, X, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { cn } from '@/lib/utils';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  taken: boolean;
}

// Mock data for medications
const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    time: '08:00',
    taken: false
  },
  {
    id: '2',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    time: '20:00',
    taken: false
  },
  {
    id: '3',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    time: '12:00',
    taken: true
  },
  {
    id: '4',
    name: 'Aspirin',
    dosage: '81mg',
    frequency: 'Once daily',
    time: '08:00',
    taken: true
  }
];

const MedicationReminders = () => {
  const [medications, setMedications] = useState<Medication[]>(mockMedications);
  const { toast } = useToast();

  const handleMarkAsTaken = (id: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: true } : med
    ));
    
    toast({
      title: "Medication marked as taken",
      description: "Great job staying on top of your health!",
    });
  };

  const handleAddMedication = () => {
    toast({
      title: "Coming soon",
      description: "The add medication feature will be available in the next update.",
    });
  };

  const getTimeStatus = (medication: Medication) => {
    const [hours, minutes] = medication.time.split(':').map(Number);
    const medicationTime = new Date();
    medicationTime.setHours(hours, minutes, 0);
    
    const now = new Date();
    const diffMs = medicationTime.getTime() - now.getTime();
    const diffMins = Math.round(diffMs / 60000);
    
    if (medication.taken) {
      return { label: 'Taken', color: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' };
    } else if (diffMins <= 0 && diffMins > -60) {
      return { label: 'Now', color: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400 animate-pulse' };
    } else if (diffMins <= 30 && diffMins > 0) {
      return { label: 'Soon', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400' };
    } else if (diffMins < 0) {
      return { label: 'Missed', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900/40 dark:text-gray-400' };
    } else {
      return { label: 'Upcoming', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400' };
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Medication Reminders</h2>
          <p className="text-muted-foreground">Stay on track with your medication schedule.</p>
        </div>
        <Button onClick={handleAddMedication}>
          <Plus className="mr-2 h-4 w-4" /> Add Medication
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {medications.map((medication) => {
          const status = getTimeStatus(medication);
          
          return (
            <Card key={medication.id} className="overflow-hidden transition-all hover:shadow-md">
              <div className={cn(
                "h-1",
                medication.taken ? "bg-green-500" : "bg-blue-500"
              )} />
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <Pill className="mr-2 h-5 w-5 text-health-blue" />
                      {medication.name}
                    </CardTitle>
                    <CardDescription>{medication.dosage} - {medication.frequency}</CardDescription>
                  </div>
                  <Badge variant="outline" className={status.color}>
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{medication.time}</span>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/20 pt-1">
                {!medication.taken ? (
                  <Button 
                    variant="ghost" 
                    className="w-full text-green-600 hover:text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20"
                    onClick={() => handleMarkAsTaken(medication.id)}
                  >
                    <Check className="mr-2 h-4 w-4" /> Mark as Taken
                  </Button>
                ) : (
                  <div className="w-full text-center text-sm text-muted-foreground py-2">
                    ✓ Taken today
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Medication Assistant</CardTitle>
          <CardDescription>
            Personalized suggestions based on your medication routine
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              Based on your medication schedule, it might be more effective to take Lisinopril and Aspirin together. 
              Would you like to adjust your schedule?
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline">
            <X className="mr-2 h-4 w-4" /> Dismiss
          </Button>
          <Button>
            <Check className="mr-2 h-4 w-4" /> Apply Suggestion
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MedicationReminders;
