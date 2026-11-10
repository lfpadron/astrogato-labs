import type { Dictionary } from './types';

export const en = {
  lang: 'en-US',
  seo: {
    title: 'Astrogato Labs | Technology that builds trust',
    description: 'We explore ideas and build reliable tools. Security, traceability, privacy and responsible AI, with people at the center.',
    imageAlt: 'Astrogato Labs. We design technology that builds trust.',
  },
  a11y: { skip: 'Skip to content', home: 'Astrogato Labs — home', navigation: 'Main navigation', language: 'Select language', menu: 'Menu', closeMenu: 'Close menu', external: 'opens in a new tab', pause: 'Pause orbits', resume: 'Resume orbits' },
  nav: { philosophy: 'Philosophy', differences: 'Our difference', missions: 'Missions', contact: 'Contact' },
  hero: {
    eyebrow: 'Trust, by design', title: 'We design technology that builds', accent: 'trust',
    motto: 'We explore ideas. We build tools.',
    description: 'We don’t start by asking which technology to use. We start by understanding which business problem we need to solve.',
    explore: 'Explore missions', contact: 'Let’s talk about your project',
    concepts: ['Security', 'Traceability', 'Responsible AI', 'Privacy', 'Human-centered design'],
    orbitLabel: 'Ideas in orbit. People at the center.', orbitNote: 'Technology with purpose',
  },
  philosophy: {
    eyebrow: '01 / Our philosophy', title: 'A philosophy centered on trust',
    intro: 'Before we build, we listen. We understand the context and design tools that make sense for your business and the people who use them.',
    items: [
      { icon: 'shield', title: 'Trust by design', description: 'Verifiable, auditable operations. Every important decision should leave evidence you can understand and review.' },
      { icon: 'modules', title: 'Simplicity', description: 'Understandable, maintainable architectures. We choose what solves the problem without adding unnecessary complexity.' },
      { icon: 'person', title: 'Human-centered design', description: 'Every end user is a person. We respect their time, attention and experience in every interaction.' },
      { icon: 'spark', title: 'Responsible AI', description: 'Automation with clear boundaries, controls and human oversight. People keep control of the decisions that matter.' },
      { icon: 'lock', title: 'Privacy', description: 'Your data belongs to you. We prefer local processing when it makes sense and the cloud when it adds value to the project.' },
      { icon: 'team', title: 'Collaboration', description: 'We study your processes with you to remove friction, duplication, bottlenecks and risks. Not every problem requires new software.' },
    ],
  },
  differences: {
    eyebrow: '02 / How we work', title: 'What sets us apart?',
    intro: 'Technology is the means. Trust and a well-solved problem are the purpose.',
    items: [
      { icon: 'target', title: 'The business problem comes first', description: 'We understand what needs solving, who experiences it and what stands in the way. Then we choose the right technology.' },
      { icon: 'trace', title: 'Trust is designed', description: 'We build security, evidence and traceability into the architecture so you can verify what happens.' },
      { icon: 'spark', title: 'AI is a tool, not a magician', description: 'We apply AI where it adds value, with controls and human decisions. Its results must be open to review.' },
      { icon: 'person', title: 'People matter', description: 'We aim for fewer steps, less friction and more clarity for the people who use these tools every day.' },
    ],
  },
  pillars: {
    eyebrow: '03 / Built on clear principles', title: 'Technical foundations. Practical benefits.',
    intro: 'Principles that guide our decisions so tools are useful today and can evolve tomorrow.',
    items: [
      { icon: 'shield', title: 'Security by design', description: 'Access and controls considered from the start to reduce operational risks and protect what matters.' },
      { icon: 'trace', title: 'Traceability and auditability', description: 'Evidence of what happened and when, to investigate incidents and make informed decisions.' },
      { icon: 'modules', title: 'Simple, modular architectures', description: 'Components with clear responsibilities that make changes easier and reduce unnecessary dependencies.' },
      { icon: 'spark', title: 'Responsible, explainable AI', description: 'Reviewable results, visible limits and human oversight to use automation thoughtfully.' },
      { icon: 'lock', title: 'Privacy by design', description: 'Collecting only what is needed and choosing where to process it, so you keep control of your information.' },
      { icon: 'refresh', title: 'Maintainability and continuous evolution', description: 'Clear code and useful documentation to keep the project moving and adapt it to new needs.' },
    ],
  },
  missions: {
    eyebrow: '04 / Ideas taking shape', upcoming: 'Preparing for launch',
    upcomingIntro: 'Tools in preparation for specific needs. Every mission starts with a problem and aims to make a positive difference.',
    demonstration: 'Demonstration missions', demonstrationIntro: 'A space to explore possibilities, learn and show ideas in action.',
    impact: 'Positive impact', platform: 'Go to platform login', demo: 'Explore demonstration',
    preparing: 'In preparation', comingSoon: 'Coming soon', demoStatus: 'Demonstration',
    warning: 'Demonstration: do not use to analyze production networks.',
  },
  closing: {
    eyebrow: 'The next step, together', title: 'Innovation changes the future. Trust makes it possible to build it.',
    description: 'At Astrogato Labs, we turn complex problems into reliable, secure tools designed for people.',
    cta: 'Let’s talk about your project',
  },
  footer: { contact: 'Contact', website: 'Website', motto: 'We explore ideas. We build tools.', note: 'Technology with purpose. People at the center.' },
  entry: { title: 'Choose your language', description: 'We design technology that builds trust.' },
  notFound: { title: 'This orbit doesn’t exist', description: 'The page you are looking for isn’t here. Head home to explore our missions.', back: 'Back to home' },
} satisfies Dictionary;
