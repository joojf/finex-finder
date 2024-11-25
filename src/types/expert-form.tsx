import { FinancialCertification, FinancialExpertiseArea } from "@prisma/client";

export interface AccountDetailsForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface PersonalInfoFormData {
    name: string;
    professionalTitle: string;
    location: string;
    remoteOnly: boolean;
    languages: string[];
}

export interface ProfessionalInfoFormData {
    yearsOfExperience: number;
    areasOfExpertise: FinancialExpertiseArea[];
    certifications: FinancialCertification[];
    hourlyRate: number;
}

export interface ProfileFormData {
    bio: string;
    professionalSummary: string;
    linkedinUrl: string;
    websiteUrl: string;
}
