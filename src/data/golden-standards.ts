import { GoldenStandard, BlueprintTemplate } from './types';

export const goldenStandards: GoldenStandard[] = [
    {
        id: 'gs-001',
        title: 'THE ARCHITECT',
        pattern: 'Act as a senior [ ROLE ] with expertise in [ DOMAIN ]. Your task is to [ ACTION ] following [ CONSTRAINTS ].',
        variables: [
            { name: 'ROLE', example: 'React developer' },
            { name: 'DOMAIN', example: 'performance optimization' },
            { name: 'ACTION', example: 'refactor this component' },
            { name: 'CONSTRAINTS', example: 'SOLID principles' },
        ],
        usagePercentage: 68,
        tags: ['role-playing', 'persona', 'structured'],
    },
    {
        id: 'gs-002',
        title: 'THE REFRACTOR',
        pattern: 'Refactor the following code to [ GOAL ]. Maintain the existing API. Add [ IMPROVEMENTS ] while preserving [ CONSTRAINTS ].',
        variables: [
            { name: 'GOAL', example: 'improve readability' },
            { name: 'IMPROVEMENTS', example: 'TypeScript types, error handling' },
            { name: 'CONSTRAINTS', example: 'backwards compatibility' },
        ],
        usagePercentage: 54,
        tags: ['refactoring', 'code-quality', 'migration'],
    },
    {
        id: 'gs-003',
        title: 'THE DEBUGGER',
        pattern: 'This code has a bug where [ SYMPTOM ]. The expected behavior is [ EXPECTED ]. Debug and fix, explaining your reasoning step by step.',
        variables: [
            { name: 'SYMPTOM', example: 'the state updates but UI does not re-render' },
            { name: 'EXPECTED', example: 'the counter should increment visually' },
        ],
        usagePercentage: 47,
        tags: ['debugging', 'chain-of-thought', 'explanation'],
    },
    {
        id: 'gs-004',
        title: 'THE STYLIST',
        pattern: 'Create [ COMPONENT ] with [ AESTHETIC ] aesthetic. Use [ COLORS ] palette, [ SPACING ] spacing system, and [ TYPOGRAPHY ] typography.',
        variables: [
            { name: 'COMPONENT', example: 'a navigation header' },
            { name: 'AESTHETIC', example: 'glassmorphism' },
            { name: 'COLORS', example: 'dark mode with blue accents' },
            { name: 'SPACING', example: '8px grid-based' },
            { name: 'TYPOGRAPHY', example: 'Inter for body, JetBrains Mono for code' },
        ],
        usagePercentage: 61,
        tags: ['ui', 'css', 'design-systems'],
    },
    {
        id: 'gs-005',
        title: 'THE REVIEWER',
        pattern: 'Review this code for [ CONCERNS ]. Rate severity (critical/warning/info). Provide specific line-by-line suggestions. Prioritize [ PRIORITY ].',
        variables: [
            { name: 'CONCERNS', example: 'security vulnerabilities and performance issues' },
            { name: 'PRIORITY', example: 'production-readiness' },
        ],
        usagePercentage: 39,
        tags: ['code-review', 'security', 'best-practices'],
    },
    {
        id: 'gs-006',
        title: 'THE TESTER',
        pattern: 'Write [ TEST_TYPE ] tests for [ SUBJECT ] covering: happy path, edge cases, error states. Use [ FRAMEWORK ] with [ PATTERNS ].',
        variables: [
            { name: 'TEST_TYPE', example: 'unit' },
            { name: 'SUBJECT', example: 'the useAuth hook' },
            { name: 'FRAMEWORK', example: 'Jest + React Testing Library' },
            { name: 'PATTERNS', example: 'AAA pattern (Arrange-Act-Assert)' },
        ],
        usagePercentage: 43,
        tags: ['testing', 'quality', 'tdd'],
    },
];

export const blueprintTemplates: BlueprintTemplate[] = [
    {
        id: 'bp-001',
        name: 'Component Genesis',
        description: 'The foundational template for creating new UI components',
        template: 'Create a [ COMPONENT_TYPE ] component called [ NAME ] in [ FRAMEWORK ]. It should accept props for [ PROPS ]. Style it using [ STYLING_METHOD ] with [ AESTHETIC ] aesthetic. Include accessibility: [ A11Y_REQUIREMENTS ].',
        slots: [
            { name: 'COMPONENT_TYPE', hint: 'The type of component', example: 'reusable, interactive' },
            { name: 'NAME', hint: 'Component name in PascalCase', example: 'DropdownMenu' },
            { name: 'FRAMEWORK', hint: 'Framework/library', example: 'React with TypeScript' },
            { name: 'PROPS', hint: 'Key properties to accept', example: 'items, onSelect, placeholder' },
            { name: 'STYLING_METHOD', hint: 'How to style', example: 'CSS Modules' },
            { name: 'AESTHETIC', hint: 'Visual style', example: 'minimal with subtle shadows' },
            { name: 'A11Y_REQUIREMENTS', hint: 'Accessibility needs', example: 'keyboard navigation, ARIA labels' },
        ],
        category: 'foundation',
    },
    {
        id: 'bp-002',
        name: 'Hook Extraction',
        description: 'Template for refactoring component logic into custom hooks',
        template: 'Extract the [ LOGIC_TYPE ] logic from this component into a custom hook called [ HOOK_NAME ]. The hook should return [ RETURN_VALUES ]. Handle [ EDGE_CASES ]. Include cleanup in useEffect if needed.',
        slots: [
            { name: 'LOGIC_TYPE', hint: 'Type of logic to extract', example: 'data fetching' },
            { name: 'HOOK_NAME', hint: 'Hook name starting with use', example: 'useUserData' },
            { name: 'RETURN_VALUES', hint: 'What the hook returns', example: '{ data, loading, error, refetch }' },
            { name: 'EDGE_CASES', hint: 'Edge cases to handle', example: 'network errors, race conditions' },
        ],
        category: 'refactor',
    },
    {
        id: 'bp-003',
        name: 'API Integration',
        description: 'Template for connecting frontend to backend services',
        template: 'Create an API service for [ RESOURCE ]. Include methods for [ OPERATIONS ]. Handle errors with [ ERROR_STRATEGY ]. Add request/response types. Implement [ CACHING_STRATEGY ] caching.',
        slots: [
            { name: 'RESOURCE', hint: 'The resource being managed', example: 'user profiles' },
            { name: 'OPERATIONS', hint: 'CRUD operations needed', example: 'get, create, update, delete' },
            { name: 'ERROR_STRATEGY', hint: 'How to handle errors', example: 'custom error classes with retry logic' },
            { name: 'CACHING_STRATEGY', hint: 'Caching approach', example: 'stale-while-revalidate' },
        ],
        category: 'logic',
    },
];
