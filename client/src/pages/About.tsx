import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Zap, Award } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Axo Shard</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're passionate about bringing joy and quality Axolotl merchandise to enthusiasts everywhere.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-4">
              At Axo Shard, we believe that Axolotls are more than just aquatic creatures – they're symbols of uniqueness, 
              resilience, and wonder. Our mission is to celebrate these amazing animals through carefully curated products 
              that bring joy to our customers.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              Every product in our collection is selected with care to ensure quality, authenticity, and value. 
              We're committed to supporting the Axolotl community and promoting awareness about these incredible creatures.
            </p>
            <Link href="/shop">
              <Button>Browse Our Products</Button>
            </Link>
          </div>
          <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10">
            <div className="text-6xl mb-4">🦑</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Axolotl Pride</h3>
            <p className="text-muted-foreground">
              We're more than just a shop – we're a community dedicated to celebrating the wonder of Axolotls.
            </p>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-10 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Heart,
                title: "Quality",
                description: "We prioritize quality in every product we offer",
              },
              {
                icon: Users,
                title: "Community",
                description: "Building a passionate community of Axolotl lovers",
              },
              {
                icon: Zap,
                title: "Innovation",
                description: "Always exploring new and exciting Axolotl products",
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Committed to exceeding customer expectations",
              },
            ].map((value) => (
              <Card key={value.title} className="p-6 text-center hover:shadow-lg transition-shadow">
                <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <Card className="p-12 bg-muted/50 mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
          <div className="space-y-4 text-lg text-muted-foreground">
            <p>
              Axo Shard was born from a simple idea: to create a space where Axolotl enthusiasts could find 
              high-quality merchandise celebrating their favorite creatures. What started as a passion project 
              has grown into a thriving community of Axolotl lovers.
            </p>
            <p>
              We carefully select every product to ensure it meets our high standards for quality and design. 
              From apparel to accessories, each item in our collection is chosen to bring a smile to your face 
              and celebrate your love for these incredible amphibians.
            </p>
            <p>
              Today, we're proud to serve customers around the world who share our passion for Axolotls. 
              Thank you for being part of the Axo Shard community!
            </p>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Join Our Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover our collection of premium Axolotl products and join thousands of satisfied customers
          </p>
          <Link href="/shop">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
