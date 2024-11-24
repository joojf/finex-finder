-- CreateEnum
CREATE TYPE "CompanySize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "FinancialExpertiseArea" AS ENUM ('INVESTMENT_MANAGEMENT', 'FINANCIAL_PLANNING', 'WEALTH_MANAGEMENT', 'RISK_MANAGEMENT', 'TAX_PLANNING', 'ESTATE_PLANNING', 'RETIREMENT_PLANNING', 'CORPORATE_FINANCE', 'MERGERS_AND_ACQUISITIONS', 'PRIVATE_EQUITY', 'VENTURE_CAPITAL', 'REAL_ESTATE_INVESTMENT', 'PORTFOLIO_MANAGEMENT', 'ASSET_ALLOCATION', 'ESG_INVESTING', 'CRYPTOCURRENCY');

-- CreateEnum
CREATE TYPE "FinancialCertification" AS ENUM ('CFA', 'CFP', 'CPA', 'CHFC', 'CAIA', 'FRM', 'SERIES_7', 'SERIES_63', 'SERIES_65');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Expert" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profilePicture" TEXT,
    "professionalTitle" TEXT NOT NULL,
    "yearsOfExperience" INTEGER NOT NULL,
    "areasOfExpertise" "FinancialExpertiseArea"[],
    "certifications" "FinancialCertification"[],
    "hourlyRate" DOUBLE PRECISION NOT NULL,
    "location" TEXT NOT NULL,
    "remoteOnly" BOOLEAN NOT NULL DEFAULT false,
    "availability" JSONB,
    "bio" TEXT NOT NULL,
    "professionalSummary" TEXT NOT NULL,
    "linkedinUrl" TEXT,
    "websiteUrl" TEXT,
    "languages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "industryType" TEXT NOT NULL,
    "companySize" "CompanySize" NOT NULL,
    "location" TEXT NOT NULL,
    "servicesNeeded" TEXT[],
    "budgetMin" DOUBLE PRECISION NOT NULL,
    "budgetMax" DOUBLE PRECISION NOT NULL,
    "timeline" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Expert_userId_key" ON "Expert"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Business_userId_key" ON "Business"("userId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expert" ADD CONSTRAINT "Expert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
