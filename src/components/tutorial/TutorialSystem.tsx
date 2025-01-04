import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronRight, ChevronLeft } from 'lucide-react';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  targetElement: string; // CSS selector for the element to highlight
  position: 'top' | 'right' | 'bottom' | 'left';
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to the Learning Platform!',
    description: 'Let\'s take a quick tour of the features.',
    targetElement: '.dashboard-header',
    position: 'bottom'
  },
  {
    id: 'courses',
    title: 'Your Courses',
    description: 'Here you can find all your active courses and track your progress.',
    targetElement: '.courses-grid',
    position: 'right'
  },
  {
    id: 'achievements',
    title: 'Achievements',
    description: 'Complete challenges to earn achievements and rewards!',
    targetElement: '.achievements-section',
    position: 'left'
  },
  // Add more steps as needed
];

export function TutorialSystem() {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [highlightedElement, setHighlightedElement] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (isActive) {
      const element = document.querySelector(tutorialSteps[currentStep].targetElement);
      if (element) {
        setHighlightedElement(element.getBoundingClientRect());
      }
    }
  }, [currentStep, isActive]);

  const startTutorial = () => {
    setIsActive(true);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(c => c + 1);
    } else {
      setIsActive(false);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(c => c - 1);
    }
  };

  return (
    <>
      {/* Tutorial Toggle Button */}
      <button
        onClick={startTutorial}
        className="fixed bottom-4 right-4 bg-accent p-3 rounded-full shadow-lg hover:bg-accent/80"
      >
        <HelpCircle className="w-6 h-6" />
      </button>

      {/* Tutorial Overlay */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Highlight */}
            {highlightedElement && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed z-50 border-2 border-accent"
                style={{
                  top: highlightedElement.top - 4,
                  left: highlightedElement.left - 4,
                  width: highlightedElement.width + 8,
                  height: highlightedElement.height + 8,
                  borderRadius: '8px',
                }}
              />
            )}

            {/* Tutorial Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-secondary p-6 rounded-xl shadow-xl z-50 max-w-md w-full"
            >
              <h3 className="text-xl font-bold mb-2">
                {tutorialSteps[currentStep].title}
              </h3>
              <p className="text-gray-400 mb-6">
                {tutorialSteps[currentStep].description}
              </p>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={prevStep}
                  className={`flex items-center gap-2 ${
                    currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={currentStep === 0}
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </button>
                <span className="text-sm text-gray-400">
                  {currentStep + 1} / {tutorialSteps.length}
                </span>
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  {currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 