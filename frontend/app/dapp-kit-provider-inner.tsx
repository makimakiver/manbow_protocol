'use client';

import { DAppKitProvider } from '@mysten/dapp-kit-react';
import { dAppKit } from './dapp-kit';
import type { ReactNode } from 'react';

export default function DAppKitProviderInner({ children }: { children: ReactNode }) {
	return <DAppKitProvider dAppKit={dAppKit}>{children}</DAppKitProvider>;
}
