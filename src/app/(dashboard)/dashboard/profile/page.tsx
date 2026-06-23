import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>
      <p className="text-muted-foreground mb-6">
        Manage your personal information and resume. This demonstrates a static dashboard page.
      </p>

      <Card className="max-w-lg">
        <CardContent className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Name</label>
            <p className="text-lg font-semibold">Alex Developer</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-lg font-semibold">alex.dev@example.com</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">Skills</label>
            <div className="flex gap-2 mt-1">
              <Badge variant="secondary">React</Badge>
              <Badge variant="secondary">Next.js</Badge>
              <Badge variant="secondary">TypeScript</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
