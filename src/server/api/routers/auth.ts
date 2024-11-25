import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "~/server/db";
import argon2 from "argon2";
import { FinancialExpertiseArea, CompanySize, FinancialCertification } from "@prisma/client";

export const expertSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
    professionalTitle: z.string().min(2),
    yearsOfExperience: z.number().min(0),
    areasOfExpertise: z.array(z.nativeEnum(FinancialExpertiseArea)),
    certifications: z.array(z.nativeEnum(FinancialCertification)),
    hourlyRate: z.number().positive(),
    location: z.string(),
    remoteOnly: z.boolean(),
    bio: z.string().min(50),
    professionalSummary: z.string().min(50),
    linkedinUrl: z.string().url().optional().or(z.literal("")),
    websiteUrl: z.string().url().optional().or(z.literal("")),
    languages: z.array(z.string()),
});

export const businessSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    companyName: z.string().min(2),
    description: z.string().min(50),
    industryType: z.string().min(2),
    companySize: z.nativeEnum(CompanySize),
    location: z.string().min(2),
    servicesNeeded: z.array(z.nativeEnum(FinancialExpertiseArea)).min(1),
    budgetMin: z.number().positive(),
    budgetMax: z.number().positive(),
    timeline: z.string().min(2),
}).refine((data) => data.budgetMax >= data.budgetMin, {
    message: "Maximum budget must be greater than or equal to minimum budget",
    path: ["budgetMax"],
});

export const authRouter = createTRPCRouter({
    registerBusiness: publicProcedure
        .input(businessSchema)
        .mutation(async ({ input }) => {
            const hashedPassword = await argon2.hash(input.password);

            const user = await db.user.create({
                data: {
                    email: input.email,
                    password: hashedPassword,
                    business: {
                        create: {
                            companyName: input.companyName,
                            description: input.description,
                            industryType: input.industryType,
                            companySize: input.companySize,
                            location: input.location,
                            servicesNeeded: input.servicesNeeded,
                            budgetMin: input.budgetMin,
                            budgetMax: input.budgetMax,
                            timeline: input.timeline,
                        },
                    },
                },
            });

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
