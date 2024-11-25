import { UseFormReturn } from "react-hook-form";
import { ProfileFormData } from "~/types/expert-form";

interface ProfileStepProps {
    form: UseFormReturn<ProfileFormData>;
}

export function ProfileStep({ form }: ProfileStepProps) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Professional Bio <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-gray-500">
                    Share your background and what makes you unique as a financial expert
                </p>
                <textarea
                    {...form.register("bio")}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="I am a seasoned financial advisor with expertise in..."
                />
                {form.formState.errors.bio && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.bio.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Professional Summary <span className="text-destructive">*</span>
                </label>
                <p className="text-xs text-gray-500">
                    Highlight your key achievements and specializations
                </p>
                <textarea
                    {...form.register("professionalSummary")}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="Experienced in managing high-net-worth portfolios..."
                />
                {form.formState.errors.professionalSummary && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.professionalSummary.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    LinkedIn Profile URL
                </label>
                <input
                    {...form.register("linkedinUrl")}
                    type="url"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="https://linkedin.com/in/yourprofile"
                />
                {form.formState.errors.linkedinUrl && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.linkedinUrl.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Personal Website URL
                </label>
                <input
                    {...form.register("websiteUrl")}
                    type="url"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    placeholder="https://yourwebsite.com"
                />
                {form.formState.errors.websiteUrl && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.websiteUrl.message}
                    </p>
                )}
            </div>
        </div>
    );
} 