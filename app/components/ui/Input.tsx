import { InputHTMLAttributes, forwardRef } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", ...props }, ref) => {
        return (
            <input
                className={`flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-jungle focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors shadow-sm ${className}`}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = "Input";
