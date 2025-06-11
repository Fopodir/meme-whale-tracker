
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "What are trading bots and how do they work?",
    answer: "Trading bots are automated software programs that execute trades on behalf of users based on predefined strategies and market conditions. They use algorithms to analyze market data, identify opportunities, and execute trades faster than humanly possible, operating 24/7 without emotions or fatigue."
  },
  {
    question: "Are trading bots legal and safe to use?",
    answer: "Trading bots are generally legal in most jurisdictions, but regulations vary by country and exchange. Safety depends on the bot's security features, the exchanges used, and proper risk management. Always use reputable bot providers, secure your API keys, and start with small amounts to test strategies."
  }
];

export default function FAQSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-midnight/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 text-glow-green">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-muted">
                <AccordionTrigger className="text-left hover:text-glow-green">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
