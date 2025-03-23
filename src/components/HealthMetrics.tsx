
import { useState, useEffect } from 'react';
import { Heart, Gauge, ActivitySquare, Droplet, LineChart, Brain } from 'lucide-react';
import MetricCard from './MetricCard';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import HealthChatbot from './HealthChatbot';
import VoiceCommands from './VoiceCommands';
import PredictiveAlerts from './PredictiveAlerts';

// Mock data for health metrics
const mockMetricsData = {
  heartRate: {
    current: 72,
    trend: { value: 3, isPositive: false },
    history: [68, 72, 70, 74, 72, 76, 78, 72, 70, 72]
  },
  bloodPressure: {
    current: '120/80',
    trend: { value: 2, isPositive: true },
    history: [
      { systolic: 118, diastolic: 78 },
      { systolic: 120, diastolic: 80 },
      { systolic: 122, diastolic: 82 },
      { systolic: 119, diastolic: 79 },
      { systolic: 121, diastolic: 81 },
      { systolic: 120, diastolic: 80 },
      { systolic: 118, diastolic: 78 }
    ]
  },
  oxygenLevel: {
    current: 98,
    trend: { value: 1, isPositive: true },
    history: [97, 96, 98, 97, 98, 98, 99]
  },
  glucoseLevel: {
    current: 5.4,
    trend: { value: 2, isPositive: false },
    history: [5.2, 5.3, 5.6, 5.5, 5.4, 5.4, 5.3]
  }
};

const HealthMetrics = () => {
  const [metrics, setMetrics] = useState(mockMetricsData);
  const [activeTab, setActiveTab] = useState('daily');
  const { toast } = useToast();
  const [isAIAnalyzing, setIsAIAnalyzing] = useState(false);

  useEffect(() => {
    // Simulate data update
    const interval = setInterval(() => {
      const newHeartRate = metrics.heartRate.current + (Math.random() > 0.5 ? 1 : -1);
      
      setMetrics(prev => ({
        ...prev,
        heartRate: {
          ...prev.heartRate,
          current: newHeartRate,
          trend: { 
            value: Math.abs(Math.round((newHeartRate - prev.heartRate.current) / prev.heartRate.current * 100)), 
            isPositive: newHeartRate > prev.heartRate.current 
          }
        }
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, [metrics]);

  const handleRefreshData = () => {
    // Simulate data refresh
    toast({
      title: "Refreshing health data",
      description: "Syncing with your health devices...",
    });
    
    // Simulate fetching new data
    setTimeout(() => {
      setMetrics({
        ...metrics,
        heartRate: {
          ...metrics.heartRate,
          current: Math.floor(Math.random() * (80 - 65) + 65)
        },
        oxygenLevel: {
          ...metrics.oxygenLevel,
          current: Math.floor(Math.random() * (100 - 95) + 95)
        }
      });
      
      toast({
        title: "Health data updated",
        description: "Your metrics have been refreshed successfully.",
      });
    }, 2000);
  };

  const handleAIAnalysis = () => {
    setIsAIAnalyzing(true);
    
    toast({
      title: "AI Analysis Started",
      description: "Analyzing your health data patterns...",
    });
    
    // Simulate AI analysis
    setTimeout(() => {
      setIsAIAnalyzing(false);
      
      toast({
        title: "AI Analysis Complete",
        description: "AI has generated new health insights based on your data.",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Health Metrics</h2>
          <p className="text-muted-foreground">Monitor your vital signs and health parameters.</p>
        </div>
        <div className="flex mt-2 md:mt-0 space-x-2">
          <Button 
            variant="outline"
            onClick={handleAIAnalysis}
            disabled={isAIAnalyzing}
            className="btn-hover-effect"
          >
            <Brain className="mr-2 h-4 w-4" />
            {isAIAnalyzing ? "Analyzing..." : "AI Analysis"}
          </Button>
          <Button 
            variant="outline"
            onClick={handleRefreshData}
            className="btn-hover-effect"
          >
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Heart Rate"
          value={`${metrics.heartRate.current} bpm`}
          icon={<Heart className="h-5 w-5" />}
          trend={metrics.heartRate.trend}
          color="red"
        />
        <MetricCard
          title="Blood Pressure"
          value={metrics.bloodPressure.current}
          icon={<Gauge className="h-5 w-5" />}
          trend={metrics.bloodPressure.trend}
          color="blue"
        />
        <MetricCard
          title="Oxygen Level"
          value={`${metrics.oxygenLevel.current}%`}
          icon={<ActivitySquare className="h-5 w-5" />}
          trend={metrics.oxygenLevel.trend}
          color="green"
        />
        <MetricCard
          title="Glucose Level"
          value={`${metrics.glucoseLevel.current} mmol/L`}
          icon={<Droplet className="h-5 w-5" />}
          trend={metrics.glucoseLevel.trend}
          color="purple"
        />
      </div>

      {/* AI-Powered Features Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PredictiveAlerts />
        </div>
        <div>
          <VoiceCommands />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HealthChatbot />
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Health Insights</CardTitle>
              <CardDescription>
                AI-powered analysis of your health metrics and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="daily" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="daily" onClick={() => setActiveTab('daily')}>Daily</TabsTrigger>
                  <TabsTrigger value="weekly" onClick={() => setActiveTab('weekly')}>Weekly</TabsTrigger>
                  <TabsTrigger value="monthly" onClick={() => setActiveTab('monthly')}>Monthly</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="space-y-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                    <div className="flex items-start">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-800">
                        <LineChart className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300">Daily Health Summary</h4>
                        <p className="mt-1 text-sm text-blue-800 dark:text-blue-400">Your metrics are within normal ranges. Heart rate is slightly lower compared to yesterday.</p>
                      </div>
                    </div>
                  </div>
                  <div className="h-[200px] rounded-md border bg-muted/50 p-4 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Visualized daily metrics will appear here</p>
                  </div>
                </TabsContent>
                <TabsContent value="weekly" className="space-y-4">
                  <div className="h-[200px] rounded-md border bg-muted/50 p-4 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Visualized weekly metrics will appear here</p>
                  </div>
                </TabsContent>
                <TabsContent value="monthly" className="space-y-4">
                  <div className="h-[200px] rounded-md border bg-muted/50 p-4 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Visualized monthly metrics will appear here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HealthMetrics;
