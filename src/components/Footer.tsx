import Link from "next/link";
import { Terminal } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-white p-1.5 rounded-lg">
              <Terminal className="h-5 w-5 text-black" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-white">Jules AI</span>
          </div>

          <div className="flex gap-8">
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
              GitHub
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center md:text-left text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Jules AI Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
