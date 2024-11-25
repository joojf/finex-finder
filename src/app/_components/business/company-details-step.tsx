import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import type { CompanyFormData } from "~/types/business-form";

interface CompanyDetailsStepProps {
    form: UseFormReturn<CompanyFormData>;
}

export function CompanyDetailsStep({ form }: CompanyDetailsStepProps) {
    const { register, formState: { errors }, setValue, watch } = form;

    return (
        <div className="space-y-6">
            <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                    id="companyName"
                    {...register("companyName")}
                    className={errors.companyName ? "border-destructive" : ""}
                />
                {errors.companyName && (
                    <p className="text-sm text-destructive">
                        {errors.companyName.message}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                    id="description"
                    {...register("description")}
                    className={errors.description ? "border-destructive" : ""}
                    rows={4}
                />
                {errors.description && (
                    <p className="text-sm text-destructive">
                        {errors.description.message}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="industryType">Industry Type</Label>
                <Input
                    id="industryType"
                    {...register("industryType")}
                    className={errors.industryType ? "border-destructive" : ""}
                />
                {errors.industryType && (
                    <p className="text-sm text-destructive">
                        {errors.industryType.message}
                    </p>
                )}
            </div>

            <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Select
                    value={watch("companySize")}
                    onValueChange={(value) => setValue("companySize", value as "SMALL" | "MEDIUM" | "LARGE")}
                >
                    <SelectTrigger className={errors.companySize ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select company size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SMALL">Small (1-50 employees)</SelectItem>
                        <SelectItem value="MEDIUM">Medium (51-250 employees)</SelectItem>
                        <SelectItem value="LARGE">Large (250+ employees)</SelectItem>
                    </SelectContent>
                </Select>
                {errors.companySize && (
                    <p className="text-sm text-destructive">
                        {errors.companySize.message}
                    </p>
                )}
            </div>
        </div>
    );
} 