"use client";

import { useRouter } from "next/navigation";

export default function RefreshPage() {
    const router  = useRouter();
    router.push('/');
}
