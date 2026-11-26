/**
 * Persona and stage taxonomy for the Resources library, copied from landing
 * `src/data/resourcesData.ts`. Labels only: the resource catalog stays in the apps.
 *
 * Ids match landing. International Expansion is `global_expansion` (underscore);
 * r2 maps may key it as `global-expansion`, so map that at the app edge.
 */

export type LibraryStage = {
  id: string;
  name: string;
  description: string;
};

export type LibraryPersona = {
  id: string;
  name: string;
  stages: readonly LibraryStage[];
};

export const LIBRARY_PERSONAS = [
  {
    id: "aspiring",
    name: "Aspiring Founders",
    stages: [
      { id: "exploration", name: "Exploration", description: "Discovering if entrepreneurship is right for you." },
      { id: "validation", name: "Validation", description: "Testing your idea before you build." },
      { id: "commitment", name: "Commitment", description: "Making the leap and setting up foundations." },
      { id: "launch-readiness", name: "Launch Readiness", description: "Everything you need before Day 1." },
    ],
  },
  {
    id: "startups",
    name: "Tech Startups",
    stages: [
      { id: "ideation", name: "Ideation", description: "Refining the problem and solution." },
      { id: "mvp", name: "MVP", description: "Building the first version of your product." },
      { id: "pmf", name: "Product-Market Fit", description: "Proving people want what you've built." },
      { id: "growth", name: "Seed & Growth", description: "Raising capital and scaling users." },
      { id: "scale", name: "Scale", description: "Building the machine that builds the company." },
      { id: "exit", name: "IPO / Exit", description: "Preparing for a major liquidity event." },
    ],
  },
  {
    id: "smbs",
    name: "Small Businesses (SMB)",
    stages: [
      { id: "planning", name: "Planning", description: "Laying the groundwork for your business." },
      { id: "launch", name: "Launch", description: "Opening your doors and getting first customers." },
      { id: "establish", name: "Establish", description: "Building systems, team, and repeat revenue." },
      { id: "optimize", name: "Optimize", description: "Improving margins, efficiency, and growth." },
      { id: "expand", name: "Expand", description: "Growing to new locations, products, or markets." },
    ],
  },
  {
    id: "global",
    name: "US Market Entry",
    stages: [
      { id: "pre-arrival", name: "Pre-Arrival", description: "Preparing to enter the US market from abroad." },
      { id: "landing", name: "Landing", description: "Setting up your legal, financial, and physical presence." },
      { id: "establishing", name: "Establishing", description: "Building credibility and operations in the US." },
      { id: "growing", name: "Growing", description: "Scaling your US business and team." },
      { id: "thriving", name: "Thriving", description: "Long-term success and giving back." },
    ],
  },
  {
    id: "global_expansion",
    name: "International Expansion",
    stages: [
      { id: "market-research", name: "Market Research", description: "Evaluating which international markets fit your product." },
      { id: "market-selection", name: "Market Selection", description: "Choosing your first expansion market and entry strategy." },
      { id: "entity-compliance", name: "Entity & Compliance", description: "Setting up legal and regulatory infrastructure abroad." },
      { id: "launch-localization", name: "Launch & Localization", description: "Adapting your product and brand for new markets." },
      { id: "scale-optimize", name: "Scale & Optimize", description: "Building repeatable operations across multiple countries." },
    ],
  },
] as const satisfies readonly LibraryPersona[];

export type LibraryPersonaId = (typeof LIBRARY_PERSONAS)[number]["id"];

/** Persona by id, or `undefined` for an unknown id. */
export function getLibraryPersona(id: string): LibraryPersona | undefined {
  return LIBRARY_PERSONAS.find((persona) => persona.id === id);
}
