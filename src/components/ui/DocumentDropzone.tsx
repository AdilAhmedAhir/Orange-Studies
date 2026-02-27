"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { Upload, CheckCircle, FileText, X, AlertCircle } from "lucide-react";
import { uploadFile } from "@/app/actions/upload";

interface DocumentDropzoneProps {
    label: string;
    description: string;
    accept?: string;
    required?: boolean;
    onFileSelect: (file: File | null) => void;
    onUploadComplete?: (url: string) => void;
    uploaded?: boolean;
}

export function DocumentDropzone({
    label,
    description,
    accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp",
    required = true,
    onFileSelect,
    onUploadComplete,
    uploaded = false,
}: DocumentDropzoneProps) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [fileName, setFileName] = useState<string | null>(null);
    const [isComplete, setIsComplete] = useState(uploaded);
    const [error, setError] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleUpload = useCallback(async (file: File) => {
        setIsUploading(true);
        setUploadProgress(0);
        setFileName(file.name);
        setError(null);

        // Simulate initial progress while uploading
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress >= 85) {
                progress = 85;
                clearInterval(progressInterval);
            }
            setUploadProgress(Math.min(progress, 85));
        }, 300);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const result = await uploadFile(formData);

            clearInterval(progressInterval);
            setUploadProgress(100);

            setTimeout(() => {
                setIsUploading(false);
                setIsComplete(true);
                onFileSelect(file);
                if (onUploadComplete) {
                    onUploadComplete(result.url);
                }
            }, 300);
        } catch (err) {
            clearInterval(progressInterval);
            setIsUploading(false);
            setUploadProgress(0);
            setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
        }
    }, [onFileSelect, onUploadComplete]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) handleUpload(file);
    }, [handleUpload]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
    }, [handleUpload]);

    const handleRemove = useCallback(() => {
        setIsComplete(false);
        setFileName(null);
        setUploadProgress(0);
        setError(null);
        onFileSelect(null);
        if (onUploadComplete) {
            onUploadComplete("");
        }
        if (inputRef.current) inputRef.current.value = "";
    }, [onFileSelect, onUploadComplete]);

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-neutral-800">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
                {isComplete && (
                    <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-1 text-xs font-bold text-emerald-600">
                        <CheckCircle className="h-3.5 w-3.5" /> Uploaded
                    </motion.span>
                )}
            </div>
            <p className="text-xs text-neutral-400">{description}</p>

            {/* Error Message */}
            {error && (
                <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-2 text-xs text-red-600">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {error}
                    <button onClick={() => setError(null)} className="ml-auto"><X className="h-3 w-3" /></button>
                </motion.div>
            )}

            <AnimatePresence mode="wait">
                {isComplete && fileName ? (
                    /* ── SUCCESS STATE ── */
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="flex items-center gap-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 px-5 py-4"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100">
                            <FileText className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-semibold text-emerald-800">{fileName}</p>
                            <p className="text-xs text-emerald-500">Upload complete — saved to cloud</p>
                        </div>
                        <button onClick={handleRemove} className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-red-50 hover:text-red-500">
                            <X className="h-4 w-4" />
                        </button>
                    </motion.div>
                ) : isUploading ? (
                    /* ── UPLOADING STATE ── */
                    <motion.div
                        key="uploading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="rounded-xl border-2 border-brand-purple/30 bg-brand-purple/5 px-5 py-5"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-5 w-5 rounded-full border-2 border-brand-purple/30 border-t-brand-purple" />
                            <span className="text-sm font-medium text-brand-purple">Uploading {fileName}...</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-brand-purple/10">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-orange"
                                initial={{ width: "0%" }}
                                animate={{ width: `${uploadProgress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                        <p className="mt-2 text-right text-xs font-bold text-brand-purple">{Math.round(uploadProgress)}%</p>
                    </motion.div>
                ) : (
                    /* ── DROP ZONE ── */
                    <motion.div
                        key="dropzone"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => inputRef.current?.click()}
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        className={`group relative cursor-pointer rounded-xl border-2 border-dashed px-6 py-8 text-center transition-all duration-300 ${isDragOver
                            ? "border-brand-orange bg-brand-orange/5 scale-[1.02]"
                            : "border-neutral-200 bg-neutral-50 hover:border-brand-purple/40 hover:bg-brand-purple/5"
                            }`}
                    >
                        <motion.div animate={isDragOver ? { y: -4, scale: 1.1 } : { y: 0, scale: 1 }}>
                            <Upload className={`mx-auto h-8 w-8 transition-colors ${isDragOver ? "text-brand-orange" : "text-neutral-300 group-hover:text-brand-purple"}`} />
                        </motion.div>
                        <p className="mt-3 text-sm text-neutral-600">
                            <span className="font-semibold text-brand-purple">Click to browse</span> or drag and drop
                        </p>
                        <p className="mt-1 text-xs text-neutral-400">PDF, DOC, JPG, PNG, or WebP (max 10MB)</p>
                        <input ref={inputRef} type="file" accept={accept} onChange={handleFileChange} className="hidden" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
