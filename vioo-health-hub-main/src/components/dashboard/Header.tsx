import { Bell, Settings } from "lucide-react";

export function Header() {
  const currentDate = new Date();
  const greeting = currentDate.getHours() < 12 ? "早上好" : 
                   currentDate.getHours() < 18 ? "下午好" : "晚上好";
  
  const dateString = currentDate.toLocaleDateString("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <header className="flex items-center justify-between py-4">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          {greeting} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">{dateString}</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full" />
        </button>
        <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
