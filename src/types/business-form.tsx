import type { CompanySize, FinancialExpertiseArea } from "@prisma/client";

export interface AccountDetailsForm {
    email: string;
    password: string;
    confirmPassword: string;
}


export interface CompanyFormData {
    companyName: string;
    description: string;
    industryType: string;
    companySize: CompanySize;
}

export interface RequirementsFormData {
    location: string;
    servicesNeeded: FinancialExpertiseArea[];
    budgetMin: number;
    budgetMax: number;
    timeline: string;
}