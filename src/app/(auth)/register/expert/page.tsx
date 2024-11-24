"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";
import { AccountDetailsStep } from "~/app/_components/expert/account-details-step";
import { PersonalInfoStep } from "~/app/_components/expert/personal-info-step";
import { ProfessionalInfoStep } from "~/app/_components/expert/professional-info-step";
import { ProfileStep } from "~/app/_components/expert/profile-step";
import { TRPCClientError } from '@trpc/client';

const expertSchema = z.object({
    // Step 1: Account Details
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const personalInfoSchema = z.object({
    // Step 2: Personal Information
    name: z.string().min(2, "Name is required"),
    professionalTitle: z.string().min(2, "Professional title is required"),
    location: z.string().min(2, "Location is required"),
    remoteOnly: z.boolean(),
    languages: z.array(z.string()).min(1, "Select at least one language"),
});

const professionalInfoSchema = z.object({
    // Step 3: Professional Information
    yearsOfExperience: z.number().min(0),
    areasOfExpertise: z.array(z.string()).min(1, "Select at least one area of expertise"),
    certifications: z.array(z.string()),
    hourlyRate: z.number().positive("Hourly rate is required"),
});

const profileSchema = z.object({
    // Step 4: Profile Details
    bio: z.string().min(50, "Bio must be at least 50 characters"),
    professionalSummary: z.string().min(50, "Professional summary must be at least 50 characters"),
    linkedinUrl: z.string().url("Invalid LinkedIn URL").optional().or(z.literal("")),
    websiteUrl: z.string().url("Invalid website URL").optional().or(z.literal("")),
});

const steps = [
    { title: "Account", description: "Create your account" },
    { title: "Personal", description: "Your personal information" },
    { title: "Professional", description: "Your expertise and rates" },
    { title: "Profile", description: "Tell us about yourself" },
];

const ProgressBar = ({ currentStep }: { currentStep: number }) => (
    <div className="mb-8">
        <div className="flex justify-between">
            {steps.map((step, index) => (
                <div key={step.title} className="flex flex-col items-center">
                    <div
                        className={`h-8 w-8 rounded-full ${index < currentStep
                                ? "bg-destructive"
                                : index === currentStep
                                    ? "bg-primary"
                                    : "bg-muted"
                            } flex items-center justify-center text-white`}
                    >
                        {index < currentStep ? (
                            <CheckCircle2 className="h-5 w-5" />
                        ) : (
                            index + 1
                        )}
                    </div>
                    <div className="mt-2 text-sm font-medium">{step.title}</div>
                    <div className="text-muted-foreground text-xs">{step.description}</div>
                </div>
            ))}
        </div>
    </div>
);

export default function ExpertRegistrationPage() {
    const [step, setStep] = useState(0);
    const router = useRouter();
    const [formData, setFormData] = useState({});
    const [serverError, setServerError] = useState<string | null>(null);

    const registerExpert = api.auth.registerExpert.useMutation({
        onSuccess: () => {
            router.push("/login");
        },
    });

    const forms = [
        useForm({ resolver: zodResolver(expertSchema) }),
        useForm({ resolver: zodResolver(personalInfoSchema) }),
        useForm({ resolver: zodResolver(professionalInfoSchema) }),
        useForm({ resolver: zodResolver(profileSchema) }),
    ] as const;

    const currentForm = forms[step]!;

    const onSubmit = async (data: any) => {
        setServerError(null);
        
        if (step < steps.length - 1) {
            setFormData({ ...formData, ...data });
            setStep(step + 1);
        } else {
            const finalData = { ...formData, ...data };
            try {
                await registerExpert.mutateAsync(finalData);
            } catch (error) {
                if (error instanceof TRPCClientError) {
                    setServerError(error.message);
                } else {
                    setServerError("An unexpected error occurred. Please try again.");
                }
                console.error("Registration error:", error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto max-w-3xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-white p-8 shadow-xl"
                >
                    <h1 className="mb-6 text-center text-3xl font-bold">
                        Expert Registration
                    </h1>

                    {serverError && (
                        <div className="mb-6 rounded-lg bg-destructive/15 p-4 text-destructive">
                            <p className="text-sm">{serverError}</p>
                        </div>
                    )}

                    <ProgressBar currentStep={step} />

                    <form onSubmit={currentForm.handleSubmit(onSubmit)}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step === 0 && (
                                    <AccountDetailsStep form={currentForm} />
                                )}
                                {step === 1 && (
                                    <PersonalInfoStep form={currentForm} />
                                )}
                                {step === 2 && (
                                    <ProfessionalInfoStep form={currentForm} />
                                )}
                                {step === 3 && (
                                    <ProfileStep form={currentForm} />
                                )}
                            </motion.div>
                        </AnimatePresence>

                        <div className="mt-8 flex justify-between">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={() => setStep(step - 1)}
                                    className="rounded-lg bg-secondary text-secondary-foreground px-6 py-2 transition hover:bg-secondary/90"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="submit"
                                disabled={registerExpert.isPending}
                                className="ml-auto rounded-lg bg-primary text-primary-foreground px-6 py-2 transition hover:bg-primary/90 disabled:opacity-50"
                            >
                                {registerExpert.isPending ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : step === steps.length - 1 ? (
                                    "Complete Registration"
                                ) : (
                                    "Continue"
                                )}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
