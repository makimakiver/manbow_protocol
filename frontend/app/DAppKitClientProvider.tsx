'use client';

import { useEffect, useState, type ReactNode } from 'react';

export function DAppKitClientProvider({ children }: { children: ReactNode }) {
	const [Provider, setProvider] = useState<React.ComponentType<{ children: ReactNode }> | null>(null);

	useEffect(() => {
		import('./dapp-kit-provider-inner').then((mod) => {
			setProvider(() => mod.default);
		});
	}, []);

	if (!Provider) {
		return <>{children}</>;
	}

	return <Provider>{children}</Provider>;
}
