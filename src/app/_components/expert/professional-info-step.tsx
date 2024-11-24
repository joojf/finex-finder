import { Certification, FinancialExpertiseArea } from "~/server/api/routers/auth";

interface ProfessionalInfoStepProps {
    form: any;
}

const FINANCIAL_EXPERTISE_AREAS_DISPLAY: Record<keyof typeof FinancialExpertiseArea.enum, string> = {
    INVESTMENT_MANAGEMENT: "Investment Management",
    FINANCIAL_PLANNING: "Financial Planning",
    WEALTH_MANAGEMENT: "Wealth Management",
    RISK_MANAGEMENT: "Risk Management",
    TAX_PLANNING: "Tax Planning",
    ESTATE_PLANNING: "Estate Planning",
    RETIREMENT_PLANNING: "Retirement Planning",
    CORPORATE_FINANCE: "Corporate Finance",
    MERGERS_AND_ACQUISITIONS: "Mergers & Acquisitions",
    PRIVATE_EQUITY: "Private Equity",
    VENTURE_CAPITAL: "Venture Capital",
    REAL_ESTATE_INVESTMENT: "Real Estate Investment",
    PORTFOLIO_MANAGEMENT: "Portfolio Management",
    ASSET_ALLOCATION: "Asset Allocation",
    ESG_INVESTING: "ESG Investing",
    CRYPTOCURRENCY: "Cryptocurrency"
};

const CERTIFICATIONS_DISPLAY: Record<keyof typeof Certification.enum, string> = {
    CFA: "CFA (Chartered Financial Analyst)",
    CFP: "CFP (Certified Financial Planner)",
    CPA: "CPA (Certified Public Accountant)",
    CHFC: "ChFC (Chartered Financial Consultant)",
    CAIA: "CAIA (Chartered Alternative Investment Analyst)",
    FRM: "FRM (Financial Risk Manager)",
    SERIES_7: "Series 7",
    SERIES_63: "Series 63",
    SERIES_65: "Series 65"
};

export function ProfessionalInfoStep({ form }: ProfessionalInfoStepProps) {
    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Years of Experience <span className="text-destructive">*</span>
                </label>
                <input
                    type="number"
                    {...form.register("yearsOfExperience", { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    min="0"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Areas of Expertise <span className="text-destructive">*</span>
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                    {Object.entries(FINANCIAL_EXPERTISE_AREAS_DISPLAY).map(([value, label]) => (
                        <label key={value} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={value}
                                {...form.register("areasOfExpertise")}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Certifications
                </label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                    {Object.entries(CERTIFICATIONS_DISPLAY).map(([value, label]) => (
                        <label key={value} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                value={value}
                                {...form.register("certifications")}
                                className="rounded border-gray-300"
                            />
                            <span className="text-sm text-gray-700">{label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Hourly Rate (USD) <span className="text-destructive">*</span>
                </label>
                <input
                    type="number"
                    {...form.register("hourlyRate", { valueAsNumber: true })}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                    min="0"
                />
            </div>
        </div>
    );
} 