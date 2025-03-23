
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from '@/components/Layout';
import HealthMetrics from '@/components/HealthMetrics';
import MedicationReminders from '@/components/MedicationReminders';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import ProfileSection from '@/components/ProfileSection';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Tabs
          defaultValue="dashboard"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="glass-panel rounded-xl p-1 mb-6">
            <TabsList className="grid w-full grid-cols-4 rounded-lg h-auto p-1 bg-transparent">
              <TabsTrigger value="dashboard" className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 btn-hover-effect">Dashboard</TabsTrigger>
              <TabsTrigger value="medications" className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 btn-hover-effect">Medications</TabsTrigger>
              <TabsTrigger value="appointments" className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 btn-hover-effect">Appointments</TabsTrigger>
              <TabsTrigger value="profile" className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-gray-800 btn-hover-effect">Profile</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="page-transition">
            <TabsContent value="dashboard" className="mt-0">
              <HealthMetrics />
            </TabsContent>
            
            <TabsContent value="medications" className="mt-0">
              <MedicationReminders />
            </TabsContent>
            
            <TabsContent value="appointments" className="mt-0">
              <AppointmentScheduler />
            </TabsContent>
            
            <TabsContent value="profile" className="mt-0">
              <ProfileSection />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
