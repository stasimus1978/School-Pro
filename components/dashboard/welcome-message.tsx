import { User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WelcomeBannerProps {
  userName: string;
  userSchool: string;
  userRole: string;
}

export function WelcomeBanner({ userName, userSchool, userRole }: WelcomeBannerProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 border-none shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="bg-white p-2 rounded-full shadow-sm">
            <User className="size-6 text-blue-500" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Welcome back, {userName}!</h2>
            <p className="text-blue-100">
              {userRole} at {userSchool}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
