"use client";

import { useState, useRef, DragEvent } from "react";
import { Upload, X, Check, AlertCircle } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    currentImage?: string;
    onUpload: (file: File) => Promise<void>;
    label?: string;
    maxSizeMB?: number;
}

export function ImageUpload({
    currentImage,
    onUpload,
    label = "Upload Image",
    maxSizeMB = 5
}: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(currentImage || null);
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = async (file: File) => {
        setError(null);
        setSuccess(false);

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        // Validate file size
        const maxSize = maxSizeMB * 1024 * 1024;
        if (file.size > maxSize) {
            setError(`File size must be less than ${maxSizeMB}MB`);
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload
        setIsUploading(true);
        try {
            await onUpload(file);
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Upload failed');
            setPreview(currentImage || null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const clearImage = () => {
        setPreview(null);
        setError(null);
        setSuccess(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">{label}</label>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg transition-colors ${isDragging
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
            >
                {preview ? (
                    <div className="relative aspect-video w-full">
                        <Image
                            src={preview}
                            alt="Preview"
                            fill
                            className="object-contain rounded-lg"
                        />
                        <button
                            onClick={clearImage}
                            className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:opacity-80 transition-opacity"
                            type="button"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        {isUploading && (
                            <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        )}
                        {success && (
                            <div className="absolute top-2 left-2 p-2 bg-green-500 text-white rounded-full">
                                <Check className="w-4 h-4" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center justify-center py-12 px-4 cursor-pointer"
                    >
                        <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-sm text-foreground font-medium mb-1">
                            Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                            PNG, JPG, WebP up to {maxSizeMB}MB
                        </p>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                />
            </div>

            {error && (
                <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                    <AlertCircle className="w-4 h-4" />
                    {error}
                </div>
            )}

            {success && (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-600 dark:text-green-400">
                    <Check className="w-4 h-4" />
                    Image uploaded successfully!
                </div>
            )}
        </div>
    );
}
