export const approachStages = [
  {
    index: "01",
    code: "FRAME",
    title: "Understand the system behind the request.",
    summary:
      "Before choosing a stack or drawing a screen, I map the people, workflows, constraints, and outcome that actually matter.",
    details: ["User and workflow map", "Constraints and success signals", "Unknowns made visible"],
    output: "A shared problem model",
    accent: "cyan",
  },
  {
    index: "02",
    code: "ARCHITECT",
    title: "Design the spine before the surface.",
    summary:
      "Data boundaries, roles, permissions, integrations, and failure states form the product’s spine. The interface grows from that clarity.",
    details: ["Domain and data model", "API and permission boundaries", "Release architecture"],
    output: "A system that can evolve",
    accent: "blue",
  },
  {
    index: "03",
    code: "PROVE",
    title: "Test the risky assumptions early.",
    summary:
      "The least certain interaction, integration, or AI behavior is prototyped first—while changing direction is still inexpensive.",
    details: ["Focused prototypes", "AI quality checks", "Technical spikes"],
    output: "Risk reduced before scale",
    accent: "violet",
  },
  {
    index: "04",
    code: "BUILD",
    title: "Ship coherent vertical slices.",
    summary:
      "Backend, interface, and deployment move together in usable increments, so progress is visible and integration never becomes a final surprise.",
    details: ["Production-shaped increments", "Reviewable decisions", "Continuous delivery"],
    output: "Working software, continuously",
    accent: "cyan",
  },
  {
    index: "05",
    code: "EVOLVE",
    title: "Treat launch as the start of learning.",
    summary:
      "Production feedback exposes the next highest-value improvement. Reliability, behavior, and performance are refined with evidence.",
    details: ["Production observation", "Feedback loops", "Measured improvement"],
    output: "A product that gets stronger",
    accent: "green",
  },
];

export const approachPrinciples = [
  {
    index: "A",
    title: "Systems before screens",
    summary:
      "A beautiful interface cannot rescue unclear rules, fragile data, or missing ownership. Structure comes first.",
    accent: "cyan",
    featured: true,
  },
  {
    index: "B",
    title: "Clarity over cleverness",
    summary:
      "The best solution is the one a team can understand, operate, and extend after the first release.",
    accent: "blue",
  },
  {
    index: "C",
    title: "AI must earn its place",
    summary:
      "Intelligence belongs where it produces a better decision or removes meaningful work—not where it only creates novelty.",
    accent: "violet",
  },
  {
    index: "D",
    title: "Production is part of design",
    summary:
      "Deployment, observability, recovery, and support are product decisions, not chores saved for the end.",
    accent: "green",
  },
];

export const workingRhythm = [
  {
    phase: "Align",
    cadence: "At the start",
    description: "Goals, scope, constraints, and the next valuable release are explicit.",
  },
  {
    phase: "Demonstrate",
    cadence: "Throughout delivery",
    description: "Working software makes progress and trade-offs visible—not status theatre.",
  },
  {
    phase: "Learn",
    cadence: "After every release",
    description: "Real usage and production signals decide what deserves attention next.",
  },
];
