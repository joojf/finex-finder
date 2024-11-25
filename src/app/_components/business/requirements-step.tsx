import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { FinancialExpertiseArea } from "@prisma/client";
import type { RequirementsFormData } from "~/types/business-form";

interface RequirementsStepProps {
    form: UseFormReturn<RequirementsFormData>;
}

export function RequirementsStep({ form }: RequirementsStepProps) {
    const { register, formState: { errors }, setValue, watch } = form;
    const selectedServices = watch("servicesNeeded") || [];

    const handleServiceToggle = (service: string) => {
        const currentServices = selectedServices;
        const newServices = currentServices.includes(service as FinancialExpertiseArea)
            ? currentServices.filter((s) => s !== service)
            : [...currentServices, service as FinancialExpertiseArea];
        setValue("servicesNeeded", newServices);
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    {...register("location")}
                    className={errors.location ? "border-destructive" : ""}
                />
                {errors.location && (
                    <p className="text-sm text-destructive">{errors.location.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label>Services Needed</Label>
                <div className="grid grid-cols-2 gap-4">
                    {Object.values(FinancialExpertiseArea).map((service) => (
                        <div key={service} className="flex items-center space-x-2">
                            <Checkbox
                                id={service}
                                checked={selectedServices.includes(service)}
                                onCheckedChange={() => handleServiceToggle(service)}
                            />
                            <Label htmlFor={service} className="text-sm">
                                {service.replace(/_/g, " ")}
                            </Label>
                        </div>
                    ))}
                </div>
                {errors.servicesNeeded && (
                    <p className="text-sm text-destructive">
                        {errors.servicesNeeded.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="budgetMin">Minimum Budget</Label>
                    <Input
                        id="budgetMin"
                        type="number"
                        {...register("budgetMin", { valueAsNumber: true })}
                        className={errors.budgetMin ? "border-destructive" : ""}
                    />
                    {errors.budgetMin && (
                        <p className="text-sm text-destructive">
                            {errors.budgetMin.message}
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="budgetMax">Maximum Budget</Label>
                    <Input
                        id="budgetMax"
                        type="number"
                        {...register("budgetMax", { valueAsNumber: true })}
                        className={errors.budgetMax ? "border-destructive" : ""}
                    />
                    {errors.budgetMax && (
                        <p className="text-sm text-destructive">
                            {errors.budgetMax.message}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="timeline">Project Timeline</Label>
                <Input
                    id="timeline"
                    {...register("timeline")}
                    className={errors.timeline ? "border-destructive" : ""}
                />
                {errors.timeline && (
                    <p className="text-sm text-destructive">{errors.timeline.message}</p>
                )}
            </div>
        </div>
    );
} 