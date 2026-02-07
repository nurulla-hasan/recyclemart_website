/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";
import PageLayout from "@/tools/PageLayout";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { createContact } from "@/services/contact";
import { SuccessToast, ErrorToast } from "@/lib/utils";
import { useForm } from "react-hook-form";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const res = await createContact(data);
      if (res.success) {
        SuccessToast(res.message || "Message sent successfully!");
        reset();
      } else {
        ErrorToast(res.message || "Failed to send message");
      }
    } catch  {
      ErrorToast("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="bg-primary/5 dark:bg-primary/10 py-16 mb-12 border-b border-primary/10">
        <div className="custom-width mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <MessageSquare className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or need assistance? Our team is here to help you. 
            Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <PageLayout paddingSize="default" className="screen-height">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Info Column */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form or use our contact details to get in touch with our team.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Email Us", detail: "support@recyclemart.com", sub: "Online support 24/7" },
                  { icon: Phone, title: "Call Us", detail: "+880 1234 567 890", sub: "Mon-Fri, 9am - 6pm" },
                  { icon: MapPin, title: "Visit Us", detail: "Dhaka, Bangladesh", sub: "Main Office" },
                  { icon: Clock, title: "Working Hours", detail: "Sat - Thu: 10am - 8pm", sub: "Friday Closed" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-primary font-medium">{item.detail}</p>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social or Other Links */}
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-4 text-primary font-bold">
                  <Globe className="w-5 h-5" />
                  <span>Connect with us</span>
                </div>
                <div className="flex gap-4">
                  {/* Mock Social Icons */}
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
                      <span className="text-xs font-bold">SM</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-2">
              <Card className="p-8 md:p-10 shadow-2xl border-none bg-linear-to-br from-card to-primary/5">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Name</label>
                      <input 
                        type="text" 
                        {...register("name", { required: true })}
                        placeholder="John Doe" 
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold ml-1">Email</label>
                      <input 
                        type="email" 
                        {...register("email", { required: true })}
                        placeholder="john@example.com" 
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Subject</label>
                    <input 
                      type="text" 
                      {...register("subject", { required: true })}
                      placeholder="How can we help you?" 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold ml-1">Message</label>
                    <textarea 
                      {...register("message", { required: true })}
                      rows={6} 
                      placeholder="Type your message here..." 
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full md:w-auto px-10 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </Card>

              {/* Map Placeholder */}
              <div className="mt-8 h-64 rounded-3xl bg-muted flex items-center justify-center border border-dashed border-muted-foreground/20 overflow-hidden relative group">
                <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Dhaka,Bangladesh&zoom=13&size=800x400&key=YOUR_API_KEY')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative text-center p-6">
                  <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="font-semibold text-muted-foreground">Interactive Map Coming Soon</p>
                  <p className="text-sm text-muted-foreground/60">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

          </div>
      </PageLayout>
    </>
  );
};

export default ContactPage;
