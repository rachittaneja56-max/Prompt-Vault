import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPrompts } from "../features/promptSlice";
import { useAuth } from "../context/AuthContext";
import { ChevronDown, ChevronUp, Copy, Bookmark } from "lucide-react";

const categories = [
  {
    name: "Writing & Content Creation",
    shortTag: "writing",
    prompts: {
      role: `Act as a seasoned editor for a major online publication. A junior writer has submitted a draft for a blog post titled 'The Future of Remote Work.' The draft is informative but dry. Your task is to rewrite the introduction (approx. 150 words) to be more engaging and compelling. Start with a strong hook, introduce a surprising statistic or a relatable anecdote, and end with a clear statement of what the reader will learn. Your tone should be authoritative yet accessible.`,
      fewShot: `Goal: Simplify a complex sentence for a general audience.

Original: "The proliferation of asynchronous communication tools has been a important factor in the overarching paradigm shift towards decentralized corporate structures." -> Simplified: "With more tools that let us message anytime, companies are changing how they work, with teams spread out all over the world."

Original: "Notwithstanding the ostensible benefits, the precipitous adoption of this technology engenders significant security vulnerabilities." -> Simplified: "Although it seems great, adopting this technology too quickly creates major security risks."

Original: "The efficaciousness of this methodology is predicated on the synergistic interplay between all constituent team members." ->`,
      json: `{
  "task": "generate_blog_post_outline",
  "main_topic": "The Beginner's Guide to Urban Gardening",
  "target_audience": "City dwellers with limited or no outdoor space.",
  "tone": "Encouraging, practical, and friendly.",
  "sections_to_include": [
    {
      "title": "Introduction: Your Concrete Jungle Can Bloom",
      "points": ["Debunk common myths", "Highlight benefits (fresh food, mental health)"]
    },
    {
      "title": "Choosing Your 'Garden': Balcony, Windowsill, or Rooftop?",
      "points": ["Pros and cons of each", "Sunlight and space considerations"]
    },
    {
      "title": "The Right Plants for Beginners",
      "points": ["List of 5 easy-to-grow herbs, vegetables, and flowers", "Tips on choosing healthy starter plants"]
    },
    {
      "title": "Container and Soil Essentials",
      "points": ["Importance of drainage", "Guide to potting mix vs. garden soil"]
    },
    {
      "title": "Watering 101 and Basic Care",
      "points": ["Common watering mistakes", "Simple feeding and pest control"]
    }
  ]
}`
    }
  },

  {
    name: "Marketing & Sales",
    shortTag: "marketing",
    prompts: {
      role: `You are the Head of Growth for a direct-to-consumer startup that sells eco-friendly cleaning products. You are preparing a presentation for potential investors. Generate a compelling 'Go-to-Market Strategy' slide. The slide should clearly define the target audience (eco-conscious millennials), outline three key marketing channels (social media influencers, content marketing on sustainability blogs, and partnerships with zero-waste stores), and detail the customer acquisition funnel from awareness to conversion. The tone should be data-driven and confident.`,
      fewShot: `Product: A new project management tool. Feature: AI-powered task prioritization. Benefit: Saves users time.

Ad Copy: "Stop guessing what to work on next. Our new AI automatically sorts your tasks by importance, so you can focus on what truly matters. Save up to 5 hours a week."

Product: A new brand of noise-canceling headphones. Feature: 40-hour battery life. Benefit: Uninterrupted listening.

Ad Copy: "From your morning commute to your late-night focus session, our headphones won't quit. With a 40-hour battery life, your soundtrack never has to stop."

Product: A meal delivery service. Feature: Customizable weekly menus. Benefit: Healthy eating made easy. ->`,
      json: `{
  "task": "create_a_b_test_email_subject_lines",
  "product": "A subscription box for international snacks",
  "target_audience": "Adventurous foodies",
  "goal": "Increase open rates",
  "number_of_variations": 3,
  "test_elements": ["Urgency", "Curiosity", "Personalization"],
  "instructions": "Generate three distinct subject lines. One should create a sense of urgency (e.g., 'Last Chance'). One should spark curiosity (e.g., 'What's inside?'). The third should be personalized (e.g., using the recipient's name or location)."
}`
    }
  },

  {
    name: "Career Development",
    shortTag: "career",
    prompts: {
      role: `Act as a seasoned career coach conducting a mock interview. The candidate is interviewing for a 'Product Manager' role at a tech company. Ask three critical behavioral questions that assess their skills in (1) handling a difficult stakeholder, (2) prioritizing features with limited resources, and (3) learning from a product failure. For each question, provide a brief rationale for why you are asking it.`,
      fewShot: `Weak Resume Bullet: "Responsible for social media."

Strong Resume Bullet: "Grew social media engagement by 45% across Instagram and Twitter in 6 months by developing and executing a data-driven content strategy."

Weak Resume Bullet: "Helped with a project."

Strong Resume Bullet: "Played a key role in a 5-person team that delivered the 'Project Alpha' redesign 2 weeks ahead of schedule, resulting in a 15% increase in user satisfaction."

Weak Resume Bullet: "Wrote blog posts." ->`,
      json: `{
  "task": "generate_linkedin_summary",
  "professional_title": "UX/UI Designer",
  "years_of_experience": 5,
  "key_skills": ["Figma", "User Research", "Wireframing", "Prototyping", "Design Systems"],
  "major_achievements": [
    "Led the redesign of a mobile banking app, improving the user satisfaction score from 3.5 to 4.8.",
    "Created a comprehensive design system that reduced development time by 20%."
  ],
  "career_goal": "To lead a design team in creating intuitive and human-centered products in the fintech space.",
  "call_to_action": "Open to connecting with innovators in the tech and finance industries."
}`
    }
  },

  {
    name: "Education & Learning",
    shortTag: "education",
    prompts: {
      role: `You are a history professor who makes complex historical events accessible and engaging. A high school student finds the causes of World War I confusing. Explain the four MAIN causes (Militarism, Alliances, Imperialism, Nationalism) using a clear analogy. For example, you could compare the situation to a tense school cafeteria standoff where different groups of friends have secret pacts and are competing for limited space and influence. Break down each of the four causes within the framework of your analogy.`,
      fewShot: `Concept: Quantum Superposition.

Analogy: "It's like a spinning coin. While it's in the air, it's not heads or tails—it's in a state of being both at once. It only lands on one specific state (heads or tails) when you observe it by catching it."

Concept: General Relativity.

Analogy: "Imagine a bowling ball placed on a trampoline. The ball creates a dip in the surface. If you roll a marble nearby, it won't go straight; it will curve along the dip created by the ball. That's how gravity works—massive objects warp spacetime, and other objects follow that curve."

Concept: Natural Selection. ->`,
      json: `{
  "task": "create_study_guide",
  "subject": "Biology",
  "topic": "Cellular Respiration",
  "key_concepts_to_cover": [
    "Glycolysis",
    "Krebs Cycle (Citric Acid Cycle)",
    "Electron Transport Chain",
    "ATP Synthesis",
    "Aerobic vs. Anaerobic Respiration"
  ],
  "output_format": {
    "type": "question_and_answer",
    "instructions": "For each key concept, generate three questions: one 'what is' question for definition, one 'where does it occur' question for location within the cell, and one 'why is it important' question for its function."
}`
    }
  },

  {
    name: "Software & Web Development",
    shortTag: "software",
    prompts: {
      role: `You are a DevOps engineer with deep expertise in cloud infrastructure. A small startup is building its first web application and needs advice on its deployment strategy. They are considering deploying a containerized Node.js application on AWS. Compare and contrast two potential deployment options: (1) using Amazon ECS with Fargate, and (2) using Amazon EC2 instances with Docker. Explain the pros and cons of each in terms of cost, scalability, and ease of management for a small team.`,
      fewShot: `Goal: Write a helpful Git commit message.

Bad: "Fixed stuff."

Good: "feat(auth): Add Google OAuth2 login functionality. Implements the passport-google-oauth20 strategy to allow users to sign in with their Google account. The callback route and user serialization are now handled."

Bad: "more updates"

Good: "fix(api): Correct pagination bug on /users endpoint. The 'offset' parameter was being ignored, causing the API to always return the first page. The query has been updated to properly use the offset value."

Bad: "oops" ->`,
      json: `{
  "task": "generate_api_documentation",
  "api_endpoint": {
    "path": "/api/v1/users/{userId}/profile",
    "method": "GET",
    "description": "Retrieves the profile information for a specific user."
  },
  "path_parameters": [
    {
      "name": "userId",
      "type": "string",
      "description": "The unique identifier of the user.",
      "example": "a1b2c3d4"
    }
  ],
  "successful_response": {
    "status_code": 200,
    "body": {
      "userId": "a1b2c3d4",
      "username": "jane_doe",
      "email": "jane.doe@example.com",
      "memberSince": "2025-01-15T10:00:00Z"
    }
  },
  "error_response": {
    "status_code": 404,
    "body": {
      "error": "User not found."
    }
}`
    }
  },

  {
    name: "Business & Productivity",
    shortTag: "business",
    prompts: {
      role: `You are a seasoned project manager known for turning chaotic projects into successful outcomes. A team is consistently missing deadlines and seems overwhelmed. Their current process is a messy combination of emails, chat messages, and spreadsheets. Draft a clear, actionable plan for them to adopt a simple Kanban workflow. Explain how to set up a basic board with three columns (To Do, In Progress, Done), how to write effective user stories for tasks, and how to run a 15-minute daily stand-up meeting to ensure alignment.`,
      fewShot: `Vague Goal: "Improve our website."

SMART Goal: "Increase our website's conversion rate by 15% in the next quarter (Q1) by redesigning the homepage call-to-action button and A/B testing three different versions of the landing page copy."

Vague Goal: "Get more organized."

SMART Goal: "I will organize my digital files by the end of this week by creating a new folder structure (Projects, Archive, Personal) and dedicating 1 hour each day to sorting and filing documents."

Vague Goal: "Learn to code." ->`,
      json: `{
  "task": "draft_meeting_agenda",
  "meeting_title": "Q4 Marketing Strategy Review",
  "date": "November 14, 2025",
  "attendees": ["Marketing Team", "Head of Sales"],
  "objective": "To finalize the marketing plan and budget for Q4.",
  "agenda_items": [
    {
      "topic": "Review of Q3 Performance",
      "duration_minutes": 15,
      "presenter": "Sarah",
      "goal": "Analyze what worked and what didn't in Q3."
    },
    {
      "topic": "Proposed Q4 Initiatives & Budget",
      "duration_minutes": 25,
      "presenter": "Mark",
      "goal": "Present the draft plan, including campaigns for Black Friday and the holiday season."
    },
    {
      "topic": "Open Discussion & Feedback",
      "duration_minutes": 15,
      "presenter": "All",
      "goal": "Gather feedback and identify potential roadblocks."
    },
    {
      "topic": "Action Items & Next Steps",
      "duration_minutes": 5,
      "presenter": "David",
      "goal": "Assign clear ownership for all action items decided in the meeting."
    }
  ]
}`
    }
  },

  {
    name: "Health & Wellness",
    shortTag: "health",
    prompts: {
      role: `Act as a certified nutritionist and personal trainer. A client, who is a busy office worker in their 30s, wants to lose 10 pounds and increase their energy levels. They have about 30-45 minutes, three times a week, for exercise and prefer workouts they can do at home with minimal equipment (dumbbells and resistance bands). Create a sample one-week workout schedule and a list of 5 healthy, easy-to-prepare lunch ideas they can take to work. The tone should be encouraging, realistic, and non-judgmental.`,
      fewShot: `Unhelpful Affirmation: "I will be happy."

Helpful Affirmation: "I have the power to choose my response to life's challenges. Today, I will focus on finding moments of peace and gratitude, no matter what happens."

Unhelpful Affirmation: "I am successful."

Helpful Affirmation: "I am capable and persistent. I celebrate my small wins and learn from my setbacks, knowing that every step is part of my journey toward my goals."

Unhelpful Affirmation: "I will stop procrastinating." ->`,
      json: `{
  "task": "create_meditation_script",
  "theme": "Reducing Anxiety",
  "duration_minutes": 10,
  "target_audience": "Beginners",
  "structure": [
    {
      "section": "Introduction (1 min)",
      "instruction": "Guide the user to find a comfortable position and gently close their eyes. Introduce the theme of letting go of anxious thoughts."
    },
    {
      "section": "Body Scan (3 mins)",
      "instruction": "Lead a gentle body scan from the toes to the head, encouraging the user to notice and release any tension they are holding."
    },
    {
      "section": "Breath Focus (4 mins)",
      "instruction": "Instruct the user to focus on the natural rhythm of their breath. Use the metaphor of watching clouds (thoughts) pass in the sky without judgment."
    },
    {
      "section": "Conclusion (2 mins)",
      "instruction": "Gently bring awareness back to the room. End with a positive affirmation about peace and centeredness."
    }
}`
    }
  },

  {
    name: "Art & Design",
    shortTag: "art",
    prompts: {
      role: `You are a creative director at a branding agency. A new, upscale coffee shop named 'The Daily Grind' needs a logo. The brand identity should be modern, minimalist, and slightly industrial. Generate three distinct logo concepts. For each concept, describe the visual elements (e.g., typography, icon, color palette) and explain the creative rationale behind it. For example, one concept might use a sleek, sans-serif font and a simple icon of a coffee bean integrated into a power button symbol to represent starting your day.`,
      fewShot: `Subject: A single, withered tree in a vast, empty desert at sunset.

Art Style: Studio Ghibli.

Description: "The scene is bathed in the warm, golden light of a low sun, casting long, soft shadows. The sky is a canvas of gentle pinks and oranges. The tree, though gnarled and leafless, has a sense of ancient character, not sadness. Its silhouette is detailed with delicate, hand-drawn lines. A few stray, glowing dust motes float lazily in the air, adding a touch of magic to the quiet landscape."

Subject: A futuristic cityscape with flying vehicles.

Art Style: Blade Runner (1982). ->`,
      json: `{
  "task": "generate_mood_board_concepts",
  "project": "Website redesign for a luxury travel agency named 'Odyssey'",
  "keywords": ["Adventure", "Luxury", "Discovery", "Serenity"],
  "concepts_to_generate": [
    {
      "name": "Old World Explorer",
      "description": "A concept based on vintage maps, brass compasses, and rich, dark wood textures. The feel is classic, knowledgeable, and timeless.",
      "color_palette": ["#4a442d", "#c4a689", "#f0e5d8", "#8b0000"],
      "image_ideas": ["Close-up of a vintage globe", "A leather-bound travel journal", "A sepia-toned landscape of an exotic location"]
    },
    {
      "name": "Modern Minimalist",
      "description": "A clean, airy concept focused on stunning, high-resolution photography and elegant typography. The feel is sleek, sophisticated, and aspirational.",
      "color_palette": ["#FFFFFF", "#1E1E1E", "#007AFF", "#E5E5EA"],
      "image_ideas": ["An infinity pool overlooking a mountain range", "An architectural detail of a luxury hotel", "A single person silhouetted against a vast landscape"]
    }
}`
    }
  },

  {
    name: "Travel & Leisure",
    shortTag: "travel",
    prompts: {
      role: `You are a seasoned travel blogger who specializes in finding unique, off-the-beaten-path experiences. A user wants to spend 7 days in Japan but wants to avoid the typical tourist traps of Tokyo and Kyoto. Create a one-week itinerary focused on the island of Kyushu. Include recommendations for activities in cities like Fukuoka (known for its food), Beppu (famous for its hot springs), and the scenic Takachiho Gorge. For each day, suggest a main activity, a food experience, and a transportation tip.`,
      fewShot: `Activity: Watching a movie.

How to make it more interesting: "Host a themed movie night. If you're watching 'Jurassic Park,' make 'dinosaur eggs' (deviled eggs) and 'jungle juice.' If you're watching 'The Lord of the Rings,' serve 'lembas bread' (shortbread) and create a cozy 'Hobbit hole' with blankets and pillows." 

Activity: Going for a walk.

How to make it more interesting: "Try a 'photo walk.' Choose a theme before you leave (e.g., 'circles,' 'the color red,' 'reflections') and only take pictures of things that fit that theme. It forces you to look at your surroundings in a completely new way."

Activity: Reading a book. ->`,
      json: `{
  "task": "create_themed_playlist",
  "theme": "Rainy Day Coffee Shop",
  "duration_hours": 2,
  "genres": ["Indie Folk", "Acoustic", "Chillwave", "Lo-fi Hip Hop"],
  "vibe": "Cozy, introspective, calm, and slightly melancholic.",
  "artist_suggestions": ["Bon Iver", "The Paper Kites", "Novo Amor", "Joji"],
  "instructions": "Generate a list of 25-30 songs that fit this theme. The playlist should start with more acoustic and folk tracks and slowly transition into more lo-fi and chillwave beats towards the end. Avoid anything too upbeat or with heavy percussion."
}`
    }
  },

  {
    name: "Personal Finance",
    shortTag: "finance",
    prompts: {
      role: `You are a certified financial planner who is a proponent of the 'Pay Yourself First' principle. A recent graduate just got their first full-time job and is asking for a simple, actionable strategy to start saving and investing. Explain the '50/30/20' budget rule (50% Needs, 30% Wants, 20% Savings/Investments). Then, provide a step-by-step plan for how they can automate their savings and start investing their 20% into a simple, diversified portfolio, like a low-cost index fund or a target-date fund. The tone should be empowering and clear, avoiding complex jargon.`,
      fewShot: `Financial Jargon: "Amortization"

Simple Explanation: "It's how you pay off a loan over time with regular, equal payments. At first, most of your payment goes to interest, but over time, more and more goes toward paying down the actual loan amount."

Financial Jargon: "Diversification"

Simple Explanation: "It's the idea of not putting all your eggs in one basket. In investing, it means spreading your money across different types of investments (like stocks, bonds, and real estate) to reduce your risk if one area performs poorly."

Financial Jargon: "Compound Interest" ->`,
      json: `{
  "task": "compare_financial_products",
  "products_to_compare": ["Roth IRA", "Traditional IRA"],
  "comparison_points": [
    "Tax treatment of contributions",
    "Tax treatment of withdrawals in retirement",
    "Contribution limits",
    "Rules for early withdrawal"
  ],
  "target_audience_profile": {
    "age": 25,
    "income_level": "entry-level",
    "financial_goal": "Saving for retirement",
    "future_income_expectation": "Expects to be in a higher tax bracket in the future."
  },
  "request": "Provide a clear comparison table and then give a recommendation on which option is likely better for the specified audience profile, explaining the reasoning."
}`
    }
  }
];

function SmallActionButton({ onClick, children, title }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-white text-sm transition"
    >
      {children}
    </button>
  );
}

export default function Suggestions() {
  const [openIndex, setOpenIndex] = useState(-1);
  const [copiedId, setCopiedId] = useState(null);
  const [savedId, setSavedId] = useState(null);
  const dispatch = useDispatch();
  const { user } = useAuth();

  const handleToggle = (i) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  const copyText = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1400);
    } catch (err) {
      console.error("copy failed", err);
      alert("Copy failed");
    }
  };

  const handleAdd = (title, text, tag) => {
    if (!user?.email) {
      alert("Log in to save prompts");
      return;
    }

    dispatch(
      addPrompts({
        email: user.email,
        title,
        text,
        tag: tag || "suggestion",
        isFavourite: false
      })
    );

    const sid = title + "|" + Date.now();
    setSavedId(sid);
    setTimeout(() => setSavedId(null), 1400);
  };

  return (
    <div className="w-full p-6 text-white">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Prompt Suggestions</h1>
        <p className="text-sm text-gray-300">
          These are example prompts. Modify them with your real data before using.
        </p>
      </div>

      <div className="space-y-4">
        {categories.map((cat, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={cat.name} className=" border border-slate-700 rounded-2xl overflow-hidden">
              <button
                onClick={() => handleToggle(i)}
                className="cursor-pointer w-full flex justify-between items-center p-4 bg-slate-900 hover:bg-slate-800"
              >
                <div>
                  <div className="text-lg font-semibold">{cat.name}</div>
                  <div className="text-xs text-gray-400 mt-1">Role-based • Few-shot • JSON</div>
                </div>

                <div className="text-gray-300 text-sm">{isOpen ? "Collapse" : "Expand"}</div>
              </button>

              {isOpen && (
                <div className="p-4 bg-slate-800 space-y-3">
                  <div className="rounded-lg border border-slate-700 p-3 bg-slate-900">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold">Role-Based Prompt</div>
                        <div className="text-xs text-gray-400 mb-2">Use role-based style</div>
                        <pre className="whitespace-pre-wrap text-sm text-gray-200">{cat.prompts.role}</pre>
                      </div>

                      <div className="flex flex-col gap-2">
                        <SmallActionButton title="Copy" onClick={() => copyText(cat.prompts.role, `${i}-role`)}>
                          <Copy size={14} /> &nbsp;Copy
                        </SmallActionButton>
                        <SmallActionButton
                          title="Add to saved"
                          onClick={() => handleAdd(`${cat.name} — Role`, cat.prompts.role, cat.shortTag)}
                        >
                          <Bookmark size={14} /> &nbsp;Save
                        </SmallActionButton>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-700 p-3 bg-slate-900">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold">Few-Shot Prompt</div>
                        <div className="text-xs text-gray-400 mb-2">Few-shot examples to guide output</div>
                        <pre className="whitespace-pre-wrap text-sm text-gray-200">{cat.prompts.fewShot}</pre>
                      </div>

                      <div className="flex flex-col gap-2">
                        <SmallActionButton title="Copy" onClick={() => copyText(cat.prompts.fewShot, `${i}-few`)}>
                          <Copy size={14} /> &nbsp;Copy
                        </SmallActionButton>
                        <SmallActionButton
                          title="Add to saved"
                          onClick={() => handleAdd(`${cat.name} — Few-shot`, cat.prompts.fewShot, cat.shortTag)}
                        >
                          <Bookmark size={14} /> &nbsp;Save
                        </SmallActionButton>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-700 p-3 bg-slate-900">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <div className="font-semibold">JSON Prompt</div>
                        <div className="text-xs text-gray-400 mb-2">Send structured data / schema</div>
                        <pre className="whitespace-pre-wrap text-sm text-gray-200">{cat.prompts.json}</pre>
                      </div>

                      <div className="flex flex-col gap-2">
                        <SmallActionButton title="Copy" onClick={() => copyText(cat.prompts.json, `${i}-json`)}>
                          <Copy size={14} /> &nbsp;Copy
                        </SmallActionButton>
                        <SmallActionButton
                          title="Add to saved"
                          onClick={() => handleAdd(`${cat.name} — JSON`, cat.prompts.json, cat.shortTag)}
                        >
                          <Bookmark size={14} /> &nbsp;Save
                        </SmallActionButton>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-gray-400">
                    {copiedId && <span className="text-green-400 mr-3">Copied!</span>}
                    {savedId && <span className="text-green-400">Saved to your prompts</span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
