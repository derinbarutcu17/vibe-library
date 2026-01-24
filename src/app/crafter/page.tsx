'use client';

import PromptCrafter from '@/components/PromptCrafter';
import { useRouter } from 'next/navigation';

export default function CrafterPage() {
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    return <PromptCrafter onClose={handleClose} />;
}
