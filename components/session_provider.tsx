'use client';
import { useUser } from '@/lib/store/user';
import { createBrowserClient } from '@supabase/ssr';
import React, { useMemo } from 'react';

const SessionProvider = () => {
	const setUser = useUser((state) => state.setUser);
	const supabase = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);

	const readUserSesion = async () => {
		const { data } = await supabase.auth.getSession();
		setUser(data.session?.user);
	};

	useMemo(() => {
		readUserSesion();
		// eslint-disable-next-line
	}, []);

	return <div></div>;
};

export default SessionProvider;
