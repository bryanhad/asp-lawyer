export default function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto flex max-w-custom-navbar flex-col items-center justify-between py-8 md:flex-row">
                <p className="text-sm text-gray-500">
                    &copy; 2024 ASP Law Firm. All rights reserved
                </p>
                <div className="flex gap-2">
                    <p className="mt-4 text-sm text-gray-500 md:mt-0">
                        Designed & Developed by{' '}
                        <span className="text-primary">Bryan Hadinata</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
