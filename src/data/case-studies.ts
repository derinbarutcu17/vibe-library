import { CaseStudy, EvolutionStudy } from './types';

export const caseStudies: CaseStudy[] = [
    {
        id: 'cs-001',
        category: 'foundation',
        title: 'The Perfect Component Structure',
        description: 'Establishing a clean React component with TypeScript interfaces',
        prompt: {
            text: 'Create a reusable Button component in React with TypeScript. It should support variants (primary, secondary, ghost), sizes (sm, md, lg), and handle loading states with a spinner. Use CSS modules for styling.',
            magicWords: ['reusable', 'variants', 'CSS modules', 'loading states'],
        },
        result: {
            language: 'typescript',
            filename: 'Button.tsx',
            code: `interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={\`\${styles.button} \${styles[variant]} \${styles[size]}\`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? <Spinner size={size} /> : children}
    </button>
  );
}`,
        },
        metrics: {
            costRatio: '1:380',
            realityScore: 100,
        },
        transformation: 'new',
        model: 'Claude 3.5',
        tokens: 142,
    },
    {
        id: 'cs-002',
        category: 'refactor',
        title: 'Extracting Custom Hooks',
        description: 'Transforming repeated logic into a reusable custom hook',
        prompt: {
            text: 'Refactor this component to extract the fetch logic into a custom hook called useDataFetcher. The hook should handle loading, error, and data states. Include TypeScript generics for type safety.',
            magicWords: ['custom hook', 'TypeScript generics', 'loading, error, and data states'],
        },
        result: {
            language: 'typescript',
            filename: 'useDataFetcher.ts',
            code: `function useDataFetcher<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch(url, { 
          signal: controller.signal 
        });
        const json = await res.json();
        setData(json);
      } catch (e) {
        if (e instanceof Error) setError(e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}`,
        },
        metrics: {
            costRatio: '1:420',
            realityScore: 100,
        },
        transformation: 'refactor',
        model: 'Claude 3.5',
        tokens: 98,
    },
    {
        id: 'cs-003',
        category: 'ui',
        title: 'Glassmorphism Card System',
        description: 'Creating depth with layered glass effects',
        prompt: {
            text: 'Create a Card component with glassmorphism styling. Use backdrop-filter: blur, a subtle border gradient, and soft shadows. The card should have a gentle hover animation that lifts it slightly. Apply a neobrutalist 4px border radius.',
            magicWords: ['glassmorphism', 'backdrop-filter: blur', 'hover animation', 'neobrutalist', '4px border radius'],
        },
        result: {
            language: 'css',
            filename: 'Card.module.css',
            code: `.card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 24px;
  box-shadow: 
    0 4px 24px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}`,
        },
        metrics: {
            costRatio: '1:290',
            realityScore: 100,
        },
        transformation: 'new',
        model: 'GPT-4o',
        tokens: 156,
    },
    {
        id: 'cs-004',
        category: 'logic',
        title: 'Debounced Search Implementation',
        description: 'Optimizing search with debounce and caching',
        prompt: {
            text: 'Implement a debounced search function with 300ms delay. Include a cache using Map to store previous results. The function should cancel pending requests when a new search is triggered. Use TypeScript with proper types.',
            magicWords: ['debounced', '300ms delay', 'cache using Map', 'cancel pending requests'],
        },
        result: {
            language: 'typescript',
            filename: 'useSearch.ts',
            code: `const cache = new Map<string, SearchResult[]>();

function useSearch(query: string) {
  const [results, setResults] = useState<SearchResult[]>([]);
  const controllerRef = useRef<AbortController>();

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    // Check cache first
    if (cache.has(query)) {
      setResults(cache.get(query)!);
      return;
    }

    // Cancel previous request
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(\`/api/search?q=\${query}\`, {
          signal: controllerRef.current?.signal,
        });
        const data = await res.json();
        cache.set(query, data);
        setResults(data);
      } catch (e) {
        if (e instanceof Error && e.name !== 'AbortError') {
          console.error(e);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return results;
}`,
        },
        metrics: {
            costRatio: '1:520',
            realityScore: 100,
        },
        transformation: 'new',
        model: 'Claude 3.5',
        tokens: 112,
    },
];

export const evolutionStudies: EvolutionStudy[] = [
    {
        id: 'ev-001',
        category: 'ui',
        title: 'From Vague to Precise',
        before: {
            prompt: 'Make it look cool and modern',
            code: `// Generic, unstyled output
.container {
  background: gray;
  padding: 10px;
}`,
            issues: ['Ambiguous "cool"', 'No specific style system', 'Output is generic'],
        },
        after: {
            prompt: 'Apply a neobrutalist aesthetic with 4px sharp borders, high-contrast black (#000) on cream (#FEFAE0) color scheme, and 16px grid-aligned spacing. Use bold, uppercase headings in Space Grotesk font.',
            code: `.container {
  background: #FEFAE0;
  border: 4px solid #000;
  padding: 16px;
  font-family: 'Space Grotesk', sans-serif;
}

.heading {
  font-size: 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #000;
}`,
            improvements: ['Specific design system', 'Exact color values', 'Named font', 'Grid-aligned values'],
        },
        insight: 'Constraints reduce hallucination. The more specific your style vocabulary, the more predictable the output.',
        model: 'Claude 3.5',
    },
    {
        id: 'ev-002',
        category: 'logic',
        title: 'Adding Edge Case Handling',
        before: {
            prompt: 'Write a function to divide two numbers',
            code: `function divide(a: number, b: number) {
  return a / b;
}`,
            issues: ['No zero handling', 'No type validation', 'Silent failures'],
        },
        after: {
            prompt: 'Write a function to safely divide two numbers. Handle division by zero by returning null. Include TypeScript types for the return value. Add input validation for non-numeric values.',
            code: `function safeDivide(
  a: number, 
  b: number
): number | null {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Arguments must be numbers');
  }
  
  if (b === 0) {
    console.warn('Division by zero attempted');
    return null;
  }
  
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    return null;
  }
  
  return a / b;
}`,
            improvements: ['Explicit null return type', 'Zero check', 'Type validation', 'Infinity handling'],
        },
        insight: 'Naming failure modes explicitly ("return null", "throw TypeError") guides the model toward defensive code.',
        model: 'GPT-4o',
    },
];
