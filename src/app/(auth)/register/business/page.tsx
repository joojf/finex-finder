"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { z } from "zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import { TRPCClientError } from '@trpc/client';
import { AccountDetailsStep } from "~/app/_components/shared/account-details-step";
import { CompanyDetailsStep } from "~/app/_components/business/company-details-step";
import { RequirementsStep } from "~/app/_components/business/requirements-step";
import { AccountDetailsForm, CompanyFormData, RequirementsFormData } from "~/types/business-form";
import { CompanySize, FinancialExpertiseArea } from "@prisma/client";

const accountSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const companySchema = z.object({
    companyName: z.string().min(2, "Company name is required"),
    description: z.string().min(50, "Description must be at least 50 characters"),
    industryType: z.string().min(2, "Industry type is required"),
    companySize: z.nativeEnum(CompanySize),
});

const requirementsSchema = z.object({
    location: z.string().min(2, "Location is required"),
    servicesNeeded: z.array(z.nativeEnum(FinancialExpertiseArea)).min(1, "Select at least one service"),
    budgetMin: z.number().positive("Minimum budget is required"),
    budgetMax: z.number().positive("Maximum budget is required"),
    timeline: z.string().min(2, "Timeline is required"),
});

const steps = [
    { title: "Account", description: "Create your account" },
    { title: "Company", description: "Your company details" },
    { title: "Requirements", description: "Your needs and budget" },
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


export default function BusinessRegistrationPage() {
    const [step, setStep] = useState(0);
    const router = useRouter();
    const [formData, setFormData] = useState<Partial<AccountDetailsForm & CompanyFormData & RequirementsFormData>>({});
    const [serverError, setServerError] = useState<string | null>(null);

    const registerBusiness = api.auth.registerBusiness.useMutation({
        onSuccess: () => {
            router.push("/login");
        },
    });

    const forms = [
        useForm<AccountDetailsForm>({
            resolver: zodResolver(accountSchema)
        }),
        useForm<CompanyFormData>({
            resolver: zodResolver(companySchema)
        }),
        useForm<RequirementsFormData>({
            resolver: zodResolver(requirementsSchema)
        }),
    ] as const;

    const currentForm = forms[step]!;

    const onSubmit = async (data: AccountDetailsForm | CompanyFormData | RequirementsFormData) => {
        setServerError(null);

        if (step < steps.length - 1) {
            setFormData({ ...formData, ...data });
            setStep(step + 1);
        } else {
            const finalData = { ...formData, ...data };
            try {
                await registerBusiness.mutateAsync(finalData as AccountDetailsForm & CompanyFormData & RequirementsFormData);
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
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="container mx-auto max-w-3xl py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl bg-white p-8 shadow-xl relative"
                >
                    <button
                        onClick={() => router.back()}
                        className="absolute left-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        type="button"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </button>

                    <h1 className="mb-6 text-center text-3xl font-bold">
                        Business Registration
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
                                {step === 0 && <AccountDetailsStep form={forms[0]} />}
                                {step === 1 && <CompanyDetailsStep form={forms[1]} />}
                                {step === 2 && <RequirementsStep form={forms[2]} />}
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
                                disabled={registerBusiness.isPending}
                                className="ml-auto rounded-lg bg-primary text-primary-foreground px-6 py-2 transition hover:bg-primary/90 disabled:opacity-50"
                            >
                                {registerBusiness.isPending ? (
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
