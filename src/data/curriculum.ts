export interface LearningObjective {
  id: number;
  description: string;
}

export interface VideoContent {
  type: 'embed' | 'upload';
  url: string;
  duration: number;
  thumbnail?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  slug: string;
  objectives: LearningObjective[];
  content: string;
  video: VideoContent;
  quiz: {
    title: string;
    description: string;
    questions: QuizQuestion[];
  };
  estimatedTime: number;
  xpReward: number;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description: string;
  icon: 'Code' | 'Book' | 'Star';
  color: string;
  modules: {
    id: number;
    title: string;
    lessons: Lesson[];
  }[];
}

export const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to Programming",
    slug: "intro-to-programming",
    description: "Learn the fundamentals of programming with Python",
    icon: "Code",
    color: "text-blue-500",
    modules: [
      {
        id: 1,
        title: "Getting Started with Programming",
        lessons: [
          {
            id: 1,
            title: "What is Programming?",
            slug: "what-is-programming",
            objectives: [
              { id: 1, description: "Understand what programming is" },
              { id: 2, description: "Learn about different programming languages" },
              { id: 3, description: "Understand basic programming concepts" }
            ],
            content: `
              # Introduction to Programming
              
              Programming is the process of creating a set of instructions that tell a computer how to perform a task...
              
              ## Why Learn Programming?
              
              In today's digital age, programming has become an essential skill...
              
              ## Basic Concepts
              
              Let's explore some fundamental programming concepts...
            `,
            video: {
              type: "embed",
              url: "https://www.youtube.com/embed/zOjov-2OZ0E",
              duration: 480, // 8 minutes
              thumbnail: "/images/intro-programming.jpg"
            },
            quiz: {
              title: "Programming Basics Quiz",
              description: "Test your understanding of basic programming concepts",
              questions: [
                {
                  id: 1,
                  question: "What is a program?",
                  options: [
                    "A set of instructions for a computer",
                    "A type of computer",
                    "A mathematical equation",
                    "A piece of hardware"
                  ],
                  correctAnswer: 0,
                  explanation: "A program is a set of instructions that tells a computer how to perform a task."
                },
                // More questions...
              ]
            },
            estimatedTime: 30, // 30 minutes
            xpReward: 100
          },
          // More lessons...
        ]
      },
      // More modules...
    ]
  },
  {
    id: 2,
    title: "Speak French From Day 1",
    slug: "french-speaking",
    description: "Master everyday French conversations in 8 weeks",
    icon: "Book",
    color: "text-purple-500",
    modules: [
      {
        id: 1,
        title: "Week 1: Self Introduction & Learning",
        lessons: [
          {
            id: 101,
            title: "Learning Questions & Self-Study",
            content: `
              # Learning French Questions & Answers

              ## Key Questions & Responses
              🔊 [audio:learning-french.mp3]
              Q: Qui vous apprend le français? (Who's teaching you French?)
              A: J'apprends seul(e) (I'm self-taught)

              Q: Qui vous a appris le français? (Who taught you French?)
              A: Je l'ai appris tout(e) seul(e) (I learned it by myself)

              Q: Depuis quand apprenez-vous le français? (When did you start learning French?)
              A: J'ai commencé il y a deux mois (I started two months ago)
            `,
            flashcards: [
              {
                question: "Who's teaching you French?",
                answer: "J'apprends seul(e)",
                hint: "Think about 'I learn by myself'",
                audio: "who-teaching.mp3"
              },
              // More flashcards...
            ],
            specialCharacters: ["é", "è", "ê", "ë", "à", "â", "ô", "û", "ù", "ç"],
            video: {
              type: "embed",
              url: "https://www.youtube.com/embed/french-who-questions",
              duration: 300
            },
            quiz: {
              title: "Who Questions & Self-Introduction",
              description: "Practice asking and answering about learning French",
              questions: [
                {
                  id: 1,
                  type: "flashcard",
                  question: "How do you say 'I'm self-taught'?",
                  options: [
                    "J'apprends seul(e)",
                    "J'ai un professeur",
                    "Je ne sais pas",
                    "J'étudie à l'école"
                  ],
                  correctAnswer: 0,
                  audioPrompt: "self-taught-prompt.mp3",
                  specialCharacters: ["é", "è", "ê"],
                  explanation: "J'apprends seul(e) literally means 'I learn alone'"
                },
                {
                  id: 2,
                  type: "typing",
                  question: "Complete: Je n'ai pas ___ professeur",
                  correctAnswer: "de",
                  hint: "Think about the word 'of' or 'any'",
                  specialCharacters: ["é", "è", "à"]
                }
              ]
            }
          }
        ]
      },
      {
        id: 2,
        title: "Week 2: Personal Information",
        lessons: [
          {
            id: 201,
            title: "Age, Occupation & Origin",
            content: `
              # Personal Questions & Answers

              ## Age & Occupation
              🔊 [audio:personal-info.mp3]
              Q: Quel âge avez-vous? (How old are you?)
              A: J'ai ___ ans (I am ___ years old)

              Q: Que faites-vous dans la vie? (What do you do?)
              A: Je suis étudiant(e) (I'm a student)
              A: Je travaille comme... (I work as...)
            `
          }
        ]
      },
      {
        id: 3,
        title: "Week 3: Time & Location",
        lessons: [
          {
            id: 301,
            title: "When & Where Questions",
            slug: "lesson/3",
            content: `
              # Time and Location Questions

              ## When Questions
              🔊 [audio:when-questions.mp3]
              - Quand avez-vous commencé? (When did you start?)
              - Quand irez-vous à Hong Kong? (When will you go to Hong Kong?)

              ## Location Questions
              🔊 [audio:where-questions.mp3]
              - D'où venez-vous? (Where are you from?)
              - Où habitez-vous? (Where do you live?)
            `
          }
        ]
      },
      {
        id: 4,
        title: "Week 4: Fluency Building",
        lessons: [
          {
            id: 401,
            title: "Day 22-23: Conversation Flow",
            slug: "conversation-flow",
            content: `
              # Natural Conversation Patterns

              ## Opening → Development → Closing
              1. Je voudrais savoir... (I would like to know...)
              2. En fait... (Actually...)
              3. C'est tout pour... (That's all for...)

              ## Opinion Patterns
              - À mon avis... (In my opinion...)
              - Je crois que... (I believe that...)
              - Pour moi... (For me...)
            `
          }
        ]
      }
    ]
  }
]; 