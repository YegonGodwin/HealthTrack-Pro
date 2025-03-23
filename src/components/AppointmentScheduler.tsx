
import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus } from 'lucide-react';
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
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import { format, isToday, isTomorrow, addDays } from 'date-fns';

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: Date;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorName: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    date: addDays(new Date(), 2),
    time: '10:30 AM',
    location: 'Heart Care Center, 123 Medical Ave',
    status: 'upcoming'
  },
  {
    id: '2',
    doctorName: 'Dr. Michael Chen',
    specialty: 'General Physician',
    date: new Date(),
    time: '3:15 PM',
    location: 'Community Health Clinic, 456 Main St',
    status: 'upcoming'
  },
  {
    id: '3',
    doctorName: 'Dr. Emily Wilson',
    specialty: 'Dermatologist',
    date: addDays(new Date(), -5),
    time: '9:00 AM',
    location: 'Skin Care Specialists, 789 Wellness Blvd',
    status: 'completed'
  }
];

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast();

  const handleScheduleAppointment = () => {
    toast({
      title: "Coming soon",
      description: "The appointment scheduling feature will be available in the next update.",
    });
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
    ));
    
    toast({
      title: "Appointment cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };

  const getAppointmentDateLabel = (date: Date) => {
    if (isToday(date)) {
      return 'Today';
    } else if (isTomorrow(date)) {
      return 'Tomorrow';
    } else {
      return format(date, 'EEEE, MMMM d');
    }
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const pastAppointments = appointments.filter(apt => apt.status !== 'upcoming');

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Appointments</h2>
          <p className="text-muted-foreground">Schedule and manage your doctor appointments.</p>
        </div>
        <Button onClick={handleScheduleAppointment}>
          <Plus className="mr-2 h-4 w-4" /> Schedule Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-medium">Upcoming Appointments</h3>
          
          {upcomingAppointments.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-6 text-center">
              <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No upcoming appointments</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                You don't have any appointments scheduled.
              </p>
              <Button onClick={handleScheduleAppointment}>Schedule One Now</Button>
            </Card>
          ) : (
            upcomingAppointments.map((appointment) => (
              <Card key={appointment.id} className="overflow-hidden transition-all hover:shadow-md">
                <div className="bg-health-blue h-1" />
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{appointment.doctorName}</CardTitle>
                      <CardDescription>{appointment.specialty}</CardDescription>
                    </div>
                    {isToday(appointment.date) && (
                      <Badge className="bg-health-blue text-white">Today</Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{getAppointmentDateLabel(appointment.date)}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{appointment.location}</span>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/20 flex justify-between">
                  <Button 
                    variant="ghost" 
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancel
                  </Button>
                  <Button variant="outline">Reschedule</Button>
                </CardFooter>
              </Card>
            ))
          )}

          {pastAppointments.length > 0 && (
            <>
              <Separator className="my-4" />
              <h3 className="text-lg font-medium mt-6">Past Appointments</h3>
              <div className="space-y-2">
                {pastAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex justify-between items-center p-3 rounded-lg border bg-muted/50"
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-muted-foreground mr-2" />
                      <div>
                        <p className="text-sm font-medium">{appointment.doctorName}</p>
                        <p className="text-xs text-muted-foreground">{format(appointment.date, 'MMM d, yyyy')} - {appointment.time}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        appointment.status === 'completed' ? "text-green-600 bg-green-50 dark:bg-green-900/20" : "text-red-600 bg-red-50 dark:bg-red-900/20"
                      )}
                    >
                      {appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                    </Badge>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>View and select appointment dates</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
              
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-3">AI Appointment Suggestions</h4>
                <div className="space-y-2">
                  <div className="flex items-center p-2 rounded-md bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <div className="mr-2 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium text-blue-900 dark:text-blue-300">Annual Check-up</p>
                      <p className="text-blue-700 dark:text-blue-400">Recommended in April</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-2 rounded-md bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                    <div className="mr-2 h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-800 flex items-center justify-center">
                      <User className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-xs">
                      <p className="font-medium text-purple-900 dark:text-purple-300">Dental Cleaning</p>
                      <p className="text-purple-700 dark:text-purple-400">Due in 2 weeks</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
