import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thank you for your message. I'll get back to you soon.",
    });

    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      label: "Email",
      value: "tsowababangida@gmail.com",
      href: "mailto:tsowababangida@gmail.com",
      icon: Mail,
    },
    {
      label: "Phone",
      value: "+234 706-330-1032",
      href: "tel:+2347063301032",
      icon: Phone,
    },
    {
      label: "Location",
      value: "Federal Capital Territory, NG",
      href: "#",
      icon: MapPin,
    },
  ];

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-wide">
        <div className="text-center mb-16">
          <p className="section-eyebrow">Get in touch</p>
          <h2 className="text-display-sm mb-4">Let's Talk</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Currently accepting select consulting engagements and strategic
            partnerships. Share your challenge—let's explore if we're the right
            fit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="border-border">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Start a Conversation</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your challenge, timeline, and what success looks like..."
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-vertical"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <div key={info.label} className="flex items-center gap-4">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{info.label}</div>
                      <a
                        href={info.href}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional info */}
            <Card className="border-border bg-muted/50">
              <CardContent className="p-5">
                <h4 className="font-semibold mb-2">Working Hours</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Monday - Friday: 9:00 AM - 6:00 PM (WAT)
                </p>
                <p className="text-sm text-muted-foreground">
                  I typically respond to inquiries within 24-48 hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
