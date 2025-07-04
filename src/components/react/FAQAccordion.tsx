import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  accordionMode?: boolean; // true = only one item can be open at a time
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ faqs, accordionMode = false }) => {
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({});

  const toggleFAQ = (index: number) => {
    setOpenItems(prev => {
      const newState = { ...prev };
      
      if (accordionMode) {
        // Close all other items first
        Object.keys(newState).forEach(key => {
          if (parseInt(key) !== index) {
            newState[parseInt(key)] = false;
          }
        });
      }
      
      // Toggle the clicked item
      newState[index] = !newState[index];
      
      return newState;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <div className="faq-card">
      <div className="faq-items">
        {faqs.map((faq, index) => {
          const isOpen = openItems[index] || false;
          
          return (
            <div key={index} className="faq-item">
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-expanded={isOpen}
                aria-controls={`answer-${index}`}
                id={`question-${index}`}
              >
                <span className="question-text">{faq.question}</span>
                <span className={`icon ${isOpen ? 'open' : 'closed'}`}>
                  {isOpen ? '−' : '+'}
                </span>
              </button>
              
              <div
                className={`faq-answer ${isOpen ? 'open' : ''}`}
                id={`answer-${index}`}
                role="region"
                aria-labelledby={`question-${index}`}
              >
                <div className="answer-content">
                  <div className="answer-box">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FAQAccordion;