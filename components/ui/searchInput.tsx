import * as React from "react";

// import { cn } from "@/utils";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export interface InputProps  {
  icon?: React.ReactNode;
  placeholder?: string;
  onChange: (text: string) => void;
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ icon,  placeholder="", onChange, ...props }, ref) => {
    
    return (
      <div className="relative flex items-center gap-2 group rounded-md border border-input bg-input px-2 py-1 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full">
        {/* {icon && <span className="mr-2">{icon}</span>} */}
        <div className="left-1">
          {icon && icon}
        </div>
        <input
          // type={type}
          className={`flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground`}
          ref={ref}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          {...props}
        />
      </div>
    );
  },
);
SearchInput.displayName = "Input";

export { SearchInput };
