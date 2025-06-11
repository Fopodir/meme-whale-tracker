
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ContactHero } from "@/components/contact/ContactHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { CodeSample } from "@/components/contact/CodeSample";
import { FloatingChatButton } from "@/components/FloatingChatButton";

export default function Contact() {
  return (
    <div className="min-h-screen font-inter relative custom-cursor z-20">
      <Header />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-midnight/10 to-[#121921]/10 relative">
        <div className="container mx-auto px-4 relative ">
          <ContactHero 
            title="Get In Touch"
            subtitle="Have a custom bot idea or need help with your trading strategy? Let's talk!"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div>
              <ContactForm />
            </div>
            
            <div className="space-y-8">
              <ContactInfo />
              <CodeSample />
            </div>
          </div>
        </div>
      </section>
      
      <FloatingChatButton />
      <Footer />
    </div>
  );
}
