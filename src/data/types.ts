export interface CaseStudy {
    id: string;
    category: 'foundation' | 'refactor' | 'ui' | 'logic';
    title: string;
    description: string;
    prompt: {
        text: string;
        magicWords: string[];
    };
    result: {
        language: string;
        code: string;
        filename?: string;
    };
    metrics: {
        costRatio: string;
        realityScore: number;
        unrealLibs?: string[];
    };
    transformation: 'new' | 'refactor' | 'bugfix' | 'optimize';
    model: string;
    tokens: number;
}

export interface EvolutionStudy {
    id: string;
    category: 'foundation' | 'refactor' | 'ui' | 'logic';
    title: string;
    before: {
        prompt: string;
        code: string;
        issues: string[];
    };
    after: {
        prompt: string;
        code: string;
        improvements: string[];
    };
    insight: string;
    model: string;
}

export interface GoldenStandard {
    id: string;
    title: string;
    pattern: string;
    variables: {
        name: string;
        example: string;
    }[];
    usagePercentage: number;
    tags: string[];
}

export interface BlueprintTemplate {
    id: string;
    name: string;
    description: string;
    template: string;
    slots: {
        name: string;
        hint: string;
        example: string;
    }[];
    category: 'foundation' | 'refactor' | 'ui' | 'logic';
}
