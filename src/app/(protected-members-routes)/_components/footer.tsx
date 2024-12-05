import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto flex max-w-custom-navbar flex-col items-center justify-between px-4 py-10 sm:px-6 lg:px-8 md:flex-row">
                <p className="text-sm text-gray-500">
                    &copy; 2024 ASP Law Firm. All rights reserved
                </p>
                <div className="flex flex-col items-end gap-2">
                    <p className="text-sm text-gray-500 font-semibold">Go to <Link href={'/'} className="text-primary">Main Website</Link></p>
                    <p className="mt-4 text-sm text-gray-500 md:mt-0">
                        Designed & Developed by{' '}
                        <span>Bryan Hadinata</span>
                    </p>
                </div>
            </div>
        </footer>
    )
}
