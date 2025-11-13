import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: November 13, 2025</p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card className="p-6 bg-muted/50">
            <p className="text-muted-foreground">
              At Axo Shard ("we," "us," "our," or "Company"), we are committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information 
              when you use our website and services.
            </p>
          </Card>

          {/* Section 1 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, such as:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>Name and email address</li>
                  <li>Phone number (if provided)</li>
                  <li>Billing and shipping addresses</li>
                  <li>Payment information (processed securely through Stripe)</li>
                  <li>Order history and preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Automatically Collected Information</h3>
                <p className="text-muted-foreground">
                  We automatically collect certain information about your device and how you interact with our website, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground mt-2 space-y-1">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website URLs</li>
                  <li>Device type and operating system</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Processing and fulfilling your orders</li>
              <li>Sending order confirmations and updates</li>
              <li>Responding to customer service requests</li>
              <li>Improving and personalizing your experience</li>
              <li>Marketing and promotional communications (with your consent)</li>
              <li>Analyzing website usage and trends</li>
              <li>Complying with legal obligations</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Share Your Information</h2>
            <p className="text-muted-foreground mb-4">
              We do not sell, trade, or rent your personal information to third parties. However, we may share 
              information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li><strong>Service Providers:</strong> With third-party vendors who assist us in operating our website and conducting business</li>
              <li><strong>Payment Processing:</strong> With Stripe for secure payment processing</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights and safety</li>
              <li><strong>Business Transfers:</strong> In the event of merger, acquisition, or bankruptcy</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
              over the internet or electronic storage is completely secure. We cannot guarantee absolute security.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights and Choices</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Access, update, or delete your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Request information about how we use your data</li>
                <li>Lodge a complaint with relevant authorities</li>
              </ul>
              <p className="text-muted-foreground mt-4">
                To exercise any of these rights, please contact us at support@axoshard.com.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies and Tracking</h2>
            <p className="text-muted-foreground">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze website 
              traffic, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Third-Party Links</h2>
            <p className="text-muted-foreground">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices 
              of these external sites. Please review their privacy policies before providing any personal information.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
            <p className="text-muted-foreground">
              Our website is not intended for children under the age of 13. We do not knowingly collect personal 
              information from children. If we become aware that a child has provided us with personal information, 
              we will take steps to delete such information promptly.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Changes to This Privacy Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy periodically to reflect changes in our practices or for other operational, 
              legal, or regulatory reasons. We will notify you of any material changes by posting the updated Privacy Policy 
              on this page with an updated "Last updated" date.
            </p>
          </section>

          {/* Contact Section */}
          <Card className="p-6 bg-muted/50">
            <h2 className="text-2xl font-bold text-foreground mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p><strong>Email:</strong> support@axoshard.com</p>
              <p><strong>Address:</strong> 123 Axolotl Lane, Portland, OR 97214, United States</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
