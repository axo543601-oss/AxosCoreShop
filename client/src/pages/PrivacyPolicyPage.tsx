import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function PrivacyPolicyPage() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible!",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form Section */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Get in Touch</h1>
              <p className="text-muted-foreground mt-2">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Message subject"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="w-full min-h-32"
                />
              </div>

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
                Send Message
              </Button>
            </form>

            <div className="space-y-4 pt-4 border-t">
              <h3 className="font-semibold text-foreground">Other Ways to Reach Us</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a href="mailto:support@axoshard.com" className="text-muted-foreground hover:text-foreground">
                      support@axoshard.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Address</p>
                    <p className="text-muted-foreground">123 Axolotl Lane<br />Minecraft City, MC 12345</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy Policy Section */}
          <div className="bg-muted/50 border border-border rounded-lg p-8 max-h-[800px] overflow-y-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Privacy Policy</h2>

            <div className="space-y-6 text-sm text-muted-foreground">
              <section>
                <h3 className="font-semibold text-foreground mb-2">1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, postal address, phone number, and payment information.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2">2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, process transactions, send transactional and promotional communications, and comply with legal obligations.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2">3. Information Sharing</h3>
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share information with service providers who assist us in operating our website and conducting our business.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2">4. Data Security</h3>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2">5. Cookies</h3>
                <p>
                  Our website uses cookies to enhance your experience. Cookies are small files stored on your device that help us remember your preferences and understand how you use our site.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2">6. Your Rights</h3>
                <p>
                  You have the right to access, correct, or delete your personal information. You may also opt out of promotional communications at any time by following the unsubscribe instructions in our emails.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2">7. Third-Party Links</h3>
                <p>
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. Please review their privacy policies before providing any personal information.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2">8. Children's Privacy</h3>
                <p>
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will delete such information promptly.
                </p>
              </section>

              <section>
                <h3 className="font-semibold text-foreground mb-2">9. Changes to This Policy</h3>
                <p>
                  We may update this privacy policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
