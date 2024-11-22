'use client';
import { Protect } from "@clerk/nextjs";

// export default function Layout({
//     children,
// }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     return <Protect>{children}</Protect>
// }



import { useUserSync } from '@/lib/use-user-sync';

export default function UserSyncProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    useUserSync();
    return <Protect>{children}</Protect>
}