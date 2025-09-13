'use client';

import Image from 'next/image';
import Link from 'next/link';

const MobileFooter = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-8 py-6">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <div className="flex justify-center mb-4">
          <Link href="/">
            <Image
              src="/dapur-buzzer-logo.png"
              alt="Dapur Buzzer Logo"
              width={120}
              height={30}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Dapur Buzzer Indonesia. <br /> All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default MobileFooter;