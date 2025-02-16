import * as React from "react";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    startIcon?: LucideIcon;
    endIcon?: LucideIcon;
    onEndIconClick?: () => void;
}
function Input({
    className,
    startIcon,
    endIcon,
    onEndIconClick,
    label,
    type,
    ...props
}: InputProps) {
    const StartIcon = startIcon;
    const EndIcon = endIcon;
    return (
        <div className="flex flex-col items-start gap-0">
            {label && (
                <label className="block text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {label}:
                </label>
            )}
            <div className="w-full relative">
                {StartIcon && (
                    <div className="absolute left-1.5 top-1/2 transform -translate-y-1/2">
                        <StartIcon
                            size={18}
                            className="text-muted-foreground"
                        />
                    </div>
                )}
                <input
                    type={type}
                    className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
                        startIcon ? "pl-8" : "",
                        className,
                    )}
                    {...props}
                />
                {EndIcon && (
                    <div
                        onClick={onEndIconClick}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                        <EndIcon className="text-muted-foreground" size={18} />
                    </div>
                )}
            </div>
        </div>
    );
}

export { Input };
