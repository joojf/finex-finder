import { UseFormReturn } from "react-hook-form";
import { PersonalInfoFormData } from "~/types/expert-form";

interface PersonalInfoStepProps {
    form: UseFormReturn<PersonalInfoFormData>;
}

const AVAILABLE_LANGUAGES = [
    "English",
    "Spanish",
    "French",
    "German",
    "Mandarin",
    "Japanese",
    "Arabic",
];

export function PersonalInfoStep({ form }: PersonalInfoStepProps) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-destructive">*</span>
                </label>
                <input
                    {...form.register("name")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="John Smith"
                />
                {form.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.name.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Professional Title <span className="text-destructive">*</span>
                </label>
                <input
                    {...form.register("professionalTitle")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="Financial Advisor, Investment Analyst, etc."
                />
                {form.formState.errors.professionalTitle && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.professionalTitle.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Location <span className="text-destructive">*</span>
                </label>
                <input
                    {...form.register("location")}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="New York, USA"
                />
                {form.formState.errors.location && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.location.message}
                    </p>
                )}
            </div>

            <div>
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        {...form.register("remoteOnly")}
                        className="rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-700">Remote only</span>
                </label>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Languages <span className="text-destructive">*</span>
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-3">
                    {AVAILABLE_LANGUAGES.map((language) => (
                        <label key={language} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={language}
                                {...form.register("languages")}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">{language}</span>
                        </label>
                    ))}
                </div>
                {form.formState.errors.languages && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.languages.message}
                    </p>
                )}
            </div>
        </div>
    );
} 