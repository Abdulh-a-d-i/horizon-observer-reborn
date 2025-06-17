
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Shield, MessageSquare, Brain } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const features = [
    {
      icon: Activity,
      title: "Real-time Logs",
      description: "Ingest and analyze logs in real-time with automatic error detection and alerting."
    },
    {
      icon: Shield,
      title: "Smart Ticketing",
      description: "Automatic ticket creation from error logs with intelligent routing and prioritization."
    },
    {
      icon: MessageSquare,
      title: "Team Chat",
      description: "Real-time collaboration with team chat integrated directly into ticket workflows."
    },
    {
      icon: Brain,
      title: "AI Assistant",
      description: "Get intelligent suggestions and analysis for faster incident resolution."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
                <span className="text-white dark:text-black font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">Resolvix</span>
            </div>
            <Button
              onClick={onGetStarted}
              variant="outline"
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-black dark:bg-white rounded-xl flex items-center justify-center">
              <span className="text-white dark:text-black font-bold text-2xl">R</span>
            </div>
            <span className="ml-4 text-4xl font-bold text-gray-900 dark:text-white">Resolvix</span>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Production-ready incident management platform with real-time
            collaboration, intelligent log analysis, and AI-powered assistance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Sign Up Free
            </Button>
            <Button
              onClick={onGetStarted}
              variant="outline"
              size="lg"
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            >
              Sign In
            </Button>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            Choose your role: Admin, Engineer, or Viewer during signup
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 text-center bg-gray-50 dark:bg-slate-700 border-gray-200 dark:border-slate-600">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-slate-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-gray-600 dark:text-gray-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to streamline your incident management?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Join teams using Resolvix to resolve issues faster and more efficiently.
          </p>
          <Button
            onClick={onGetStarted}
            size="lg"
            className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
          >
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
