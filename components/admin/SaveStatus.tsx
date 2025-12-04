"use client";

import { Check, Clock, AlertCircle } from "lucide-react";

export type SaveStatus = "saved" | "unsaved" | "saving" | "error";

interface SaveStatusProps {
    status: SaveStatus;
    message?: string;
}

export function SaveStatus({ status, message }: SaveStatusProps) {
    const config = {
        saved: {
            icon: Check,
            text: message || "All changes saved",
            className: "text-green-600 dark:text-green-400 bg-green-500/10 border-green-500/20",
        },
        unsaved: {
            icon: Clock,
            text: message || "Unsaved changes",
            className: "text-yellow-600 dark:text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
        },
        saving: {
            icon: Clock,
            text: message || "Saving...",
            className: "text-blue-600 dark:text-blue-400 bg-blue-500/10 border-blue-500/20",
        },
        error: {
            icon: AlertCircle,
            text: message || "Failed to save",
            className: "text-destructive bg-destructive/10 border-destructive/20",
        },
    };

    const { icon: Icon, text, className } = config[status];

    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium ${className}`}>
            <Icon className={`w-4 h-4 ${status === 'saving' ? 'animate-spin' : ''}`} />
            {text}
        </div>
    );
}
