import { Suspense } from 'react';
import UserStats from '@/components/UserStats';

export default async function UserPage() {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return (
    <Suspense>
      <UserStats />
    </Suspense>
  );
}