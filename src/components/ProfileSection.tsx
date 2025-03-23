
import React from 'react';
import { User, Settings, Bell, Shield, LogOut, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ProfileSection = () => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <h2 className="text-2xl font-bold tracking-tight">Profile & Settings</h2>
      <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview Card */}
        <Card className="glass-card col-span-1 lg:col-span-1 overflow-hidden micro-bounce">
          <div className="h-1 bg-gradient-to-r from-health-blue to-health-purple"></div>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
              <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" />
              <AvatarFallback className="bg-gradient-to-br from-health-blue to-health-purple text-white">JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>John Doe</CardTitle>
              <CardDescription>Member since 2023</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-health-blue/20 text-health-blue dark:bg-health-blue/10 hover:bg-health-blue/30">Premium Plan</Badge>
              <Badge variant="outline" className="bg-white/50 dark:bg-gray-800/50">42 years</Badge>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Profile Completion</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2 bg-blue-100 dark:bg-blue-950/30">
                  <div className="absolute h-full bg-gradient-to-r from-health-blue to-health-purple" style={{ width: '75%' }}></div>
                </Progress>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Health Score</span>
                  <span className="font-medium">82/100</span>
                </div>
                <Progress value={82} className="h-2 bg-green-100 dark:bg-green-950/30">
                  <div className="absolute h-full bg-gradient-to-r from-health-green to-health-blue" style={{ width: '82%' }}></div>
                </Progress>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center pt-2">
            <Button variant="outline" className="w-full btn-hover-effect">
              Edit Profile
            </Button>
          </CardFooter>
        </Card>

        {/* Settings Card */}
        <Card className="glass-card col-span-1 lg:col-span-2 micro-bounce">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your account preferences and configurations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-4">
              {/* Settings Items */}
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-health-blue">
                    <User size={18} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Personal Information</p>
                    <p className="text-xs text-muted-foreground">Update your personal details</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-health-purple">
                    <Bell size={18} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Notifications</p>
                    <p className="text-xs text-muted-foreground">Configure how you receive alerts</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-health-green">
                    <Settings size={18} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Preferences</p>
                    <p className="text-xs text-muted-foreground">Customize your experience</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
              
              <button className="w-full flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-health-yellow">
                    <Shield size={18} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Privacy & Security</p>
                    <p className="text-xs text-muted-foreground">Manage your data and security</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between pt-0">
            <Separator className="my-4" />
            <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 icon-hover-effect">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Health Insights Card */}
      <Card className="glass-card micro-bounce">
        <CardHeader>
          <CardTitle>AI Health Insights</CardTitle>
          <CardDescription>Personalized recommendations based on your health data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <p className="text-sm text-blue-800 dark:text-blue-400">
              Based on your recent activity, we've noticed your sleep pattern has improved. Maintaining consistent 7-8 hour sleep cycles has positively impacted your heart rate variability.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" className="btn-hover-effect">Dismiss</Button>
          <Button className="btn-hover-effect">See More Insights</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileSection;
