interface AccountDetailsStepProps {
    form: any;
}

export function AccountDetailsStep({ form }: AccountDetailsStepProps) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-destructive">*</span>
                </label>
                <input
                    {...form.register("email")}
                    type="email"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
                {form.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.email.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Password <span className="text-destructive">*</span>
                </label>
                <input
                    {...form.register("password")}
                    type="password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
                {form.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.password.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">
                    Confirm Password <span className="text-destructive">*</span>
                </label>
                <input
                    {...form.register("confirmPassword")}
                    type="password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                />
                {form.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                        {form.formState.errors.confirmPassword.message}
                    </p>
                )}
            </div>
        </div>
    );
}
