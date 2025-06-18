
import type { ReactNode } from "react";
import { toast } from "sonner"


interface AlertToastProps {
  title: string;
  description: string;
  icon?: ReactNode;
  options?: { duration?: number };
}


export const AlertToast = ({ title, description, icon, options = {} }: AlertToastProps) => {
  toast.custom((t) => (
    <div className="flex items-start gap-3 bg-white text-black p-4 rounded shadow-lg w-full max-w-md">
      <div className="text-xl">{icon ?? "⚠️"}</div>
      <div className="flex-1">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  ), {
    duration: options.duration ?? 2000,
    id: "alert-info", // optional: prevent duplicates
  });
};