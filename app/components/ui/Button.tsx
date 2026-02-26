import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    className?: string;
    size?: "default" | "sm" | "lg";
}

export function Button({
    children,
    variant = "primary",
    size = "default",
    className = "",
    ...props
}: ButtonProps) {
    const baseStyle = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-jungle focus:ring-offset-2 hover:-translate-y-0.5";

    const variants = {
        primary: "bg-jungle text-white shadow-soft hover:shadow-md",
        secondary: "bg-mutedTeal text-white shadow-soft hover:shadow-md",
        outline: "border-2 border-jungle text-jungle hover:bg-jungle/5",
        ghost: "text-jungle hover:bg-jungle/10",
    };

    const sizes = {
        default: "px-6 py-3 text-base",
        sm: "px-4 py-2 text-sm",
        lg: "px-8 py-4 text-lg",
    };

    return (
        <button className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    );
}
