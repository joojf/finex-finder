import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import argon2 from "argon2";

export const FinancialExpertiseArea = z.enum([
    "INVESTMENT_MANAGEMENT",
    "FINANCIAL_PLANNING",
    "WEALTH_MANAGEMENT",
    "RISK_MANAGEMENT",
    "TAX_PLANNING",
    "ESTATE_PLANNING",
    "RETIREMENT_PLANNING",
    "CORPORATE_FINANCE",
    "MERGERS_AND_ACQUISITIONS",
    "PRIVATE_EQUITY",
    "VENTURE_CAPITAL",
    "REAL_ESTATE_INVESTMENT",
    "PORTFOLIO_MANAGEMENT",
    "ASSET_ALLOCATION",
    "ESG_INVESTING",
    "CRYPTOCURRENCY"
]);

export const Certification = z.enum([
    "CFA",
    "CFP",
    "CPA",
    "CHFC",
    "CAIA",
    "FRM",
    "SERIES_7",
    "SERIES_63",
    "SERIES_65"
]);

export const expertSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
    professionalTitle: z.string().min(2),
    yearsOfExperience: z.number().min(0),
    areasOfExpertise: z.array(FinancialExpertiseArea),
    certifications: z.array(Certification),
    hourlyRate: z.number().positive(),
    location: z.string(),
    remoteOnly: z.boolean(),
    bio: z.string().min(50),
    professionalSummary: z.string().min(50),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    websiteUrl: z.string().url().optional().or(z.literal("")),
    languages: z.array(z.string()),
});

export const authRouter = createTRPCRouter({
    registerBusiness: publicProcedure.input(z.object({
        email: z.string().email(),
        password: z.string().min(8),
    })).mutation(async ({ input }) => {
        const user = await db.user.create({ data: input });
        return user;
    }),

    registerExpert: publicProcedure
        .input(expertSchema)
        .mutation(async ({ input }) => {
            const hashedPassword = await argon2.hash(input.password);

            const user = await db.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                    expert: {
                        create: {
                            name: input.name,
                            professionalTitle: input.professionalTitle,
                            yearsOfExperience: input.yearsOfExperience,
                            areasOfExpertise: input.areasOfExpertise,
                            certifications: input.certifications,
                            hourlyRate: input.hourlyRate,
                            location: input.location,
                            remoteOnly: input.remoteOnly,
                            bio: input.bio,
                            professionalSummary: input.professionalSummary,
                            linkedinUrl: input.linkedinUrl,
                            websiteUrl: input.websiteUrl,
                            languages: input.languages,
                        },
                    },
                },
            });

            return user;
        }),
});
