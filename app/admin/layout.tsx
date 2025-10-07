'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAuthChange, AdminUser } from '@/app/firebase/services';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((admin) => {
      setUser(admin);
      setLoading(false);

      // If not authenticated and not on login page, redirect to login
      if (!admin && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
      
      // If authenticated and on login page, redirect to dashboard
      if (admin && pathname === '/admin/login') {
        router.push('/admin/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}
