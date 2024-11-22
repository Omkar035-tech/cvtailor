// hooks/use-user-sync.ts
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

export function useUserSync() {
    const { user, isLoaded } = useUser();

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded && user) {
                try {
                    const response = await fetch('/api/user/sync', {
                        method: 'POST'
                    });

                    if (!response.ok) {
                        console.error('User sync failed');
                    }
                } catch (error) {
                    console.error('Error syncing user:', error);
                }
            }
        };

        syncUser();
    }, [user, isLoaded]);
}