import { Loader2 } from "lucide-react"; // lucide icon
import { Card, CardContent, CardTitle } from "@/components/ui/card";

interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
}

const LoadingScreen = ({
  title = "Loading",
  subtitle = "Please wait a moment...",
}: LoadingScreenProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <Card className="w-full max-w-sm shadow-lg">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full bg-muted"
            aria-hidden="true"
          >
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>

          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <p className="text-sm text-muted-foreground text-center">
            {subtitle}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingScreen;
