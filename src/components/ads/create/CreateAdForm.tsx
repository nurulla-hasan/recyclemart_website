"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Upload, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Info,
  DollarSign,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/category.type";
import { createAd } from "@/services/ads";
import { LocationSelector } from "@/components/ads/LocationSelector";

const formSchema = z.object({
  categoryId: z.string().min(1, { message: "Please select a category." }),
  condition: z.enum(["new", "used"], {
    message: "Condition is required.",
  }),
  title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100),
  price: z.number().min(1, { message: "Price must be at least 1." }),
  negotiable: z.boolean(),
  location: z.string().min(3, { message: "Location is required." }),
  description: z.string().min(0, { message: "Description is required." }).max(2000),
  contactPhone: z.string().min(11, { message: "Valid phone number is required." }),
  contactName: z.string().min(2, { message: "Name is required." }),
  contactEmail: z.string().email({ message: "Invalid email address." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateAdForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: "",
      condition: "used",
      title: "",
      price: 0,
      negotiable: false,
      location: "",
      description: "",
      contactPhone: "",
      contactName: "",
      contactEmail: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 5) {
      toast.error("You can upload maximum 5 images");
      return;
    }

    const newImages = [...images, ...files];
    setImages(newImages);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);

    const newPreviews = [...imagePreviews];
    if (newPreviews[index]) {
      URL.revokeObjectURL(newPreviews[index]);
    }
    newPreviews.splice(index, 1);
    setImagePreviews(newPreviews);
  };

  async function onSubmit(values: FormValues) {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    
    formData.append("data", JSON.stringify(values));
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await createAd(formData);
      if (res.success) {
        toast.success("Ad posted successfully!");
        router.push("/ads");
        router.refresh();
      } else {
        toast.error(res.message || "Failed to post ad");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const nextStep = async () => {
    const fieldsToValidate: (keyof FormValues)[] = 
      step === 1 
        ? ["categoryId", "condition", "title"]
        : ["price", "location", "description"];
    
    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 font-outfit">
      {/* Progress */}
      <div className="flex items-center justify-between mb-10 relative">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 -translate-y-1/2"></div>
        {[1, 2, 3].map((s) => (
          <div 
            key={s}
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
              step >= s ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground"
            }`}
          >
            {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
          </div>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Basic Information</h2>
                <p className="text-muted-foreground text-sm">Tell us what you're selling.</p>
              </div>

              <Card className="rounded-2xl shadow-sm border-border/40">
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base font-semibold">Category</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-2 lg:grid-cols-4 gap-3"
                          >
                            {categories.map((cat) => (
                              <FormItem key={cat._id} className="space-y-0">
                                <FormControl>
                                  <RadioGroupItem value={cat._id} className="sr-only" />
                                </FormControl>
                                <FormLabel className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all hover:bg-accent/50 ${field.value === cat._id ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border"}`}>
                                  {cat.icon && (
                                    <div className="relative w-14 h-14 mb-2">
                                      <Image src={cat.icon} alt={cat.name} fill className="object-contain invert rounded-lg p-1" />
                                    </div>
                                  )}
                                  <span className="text-xs uppercase font-bold text-center leading-tight">{cat.name}</span>
                                </FormLabel>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="condition"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base font-semibold">Condition</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="used" /></FormControl>
                              <FormLabel className="font-medium cursor-pointer">Used</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="new" /></FormControl>
                              <FormLabel className="font-medium cursor-pointer">New</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Ad Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. MacBook Pro M3 Max" {...field} className="h-12" />
                        </FormControl>
                        <FormDescription>Mention brand, model and specs.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="button" size="lg" onClick={nextStep} className="px-8 rounded-full">
                  Next Step <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Price & Details</h2>
                <p className="text-muted-foreground text-sm">Buyers love specific details.</p>
              </div>

              <Card className="rounded-2xl shadow-sm border-border/40">
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-semibold">
                            <DollarSign className="w-4 h-4 text-primary" /> Price (৳)
                          </FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              placeholder="Min ৳ 1" 
                              className="h-12"
                              {...field}
                              value={field.value === 0 ? "" : field.value}
                              onChange={(e) => {
                                const val = e.target.value;
                                field.onChange(val === "" ? 0 : parseFloat(val));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="flex items-center gap-2 font-semibold">
                            <MapPin className="w-4 h-4 text-primary" /> Location
                          </FormLabel>
                          <FormControl>
                            <LocationSelector 
                              value={field.value} 
                              onSelect={field.onChange} 
                              className="w-full h-12 rounded-md shadow-xs justify-start"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="negotiable"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-xl border border-border/60 p-4 bg-muted/30">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base font-semibold">Negotiable</FormLabel>
                          <FormDescription>Are you open to offers?</FormDescription>
                        </div>
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your item..." 
                            className="min-h-[160px] resize-none px-4 py-3"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button type="button" variant="outline" size="lg" onClick={prevStep} className="px-8 rounded-full">
                  <ChevronLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button type="button" size="lg" onClick={nextStep} className="px-8 rounded-full">
                  Next Step <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">Final Step</h2>
                <p className="text-muted-foreground text-sm">Photos and your contact info.</p>
              </div>

              <Card className="rounded-2xl shadow-sm border-border/40">
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-4">
                    <FormLabel className="text-base font-semibold">Photos (1-5)</FormLabel>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                      {imagePreviews.map((pre, idx) => (
                        <div key={pre} className="relative aspect-square rounded-xl overflow-hidden border border-border/40 group">
                          <Image src={pre} alt="Preview" fill className="object-cover" />
                          <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-destructive p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                      {images.length < 5 && (
                        <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-accent/50">
                          <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                          <span className="text-[10px] font-bold text-muted-foreground">UPLOAD</span>
                          <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageChange} />
                        </label>
                      )}
                    </div>
                  </div>

                  <hr className="border-border/40" />

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-semibold">Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} className="h-12" /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="contactPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Phone</FormLabel>
                            <FormControl><Input placeholder="017XXXXXXXX" {...field} className="h-12" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-semibold">Email</FormLabel>
                            <FormControl><Input placeholder="you@mail.com" {...field} className="h-12" /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/10 flex gap-3 text-xs text-muted-foreground leading-relaxed">
                    <Info className="w-4 h-4 text-primary shrink-0" />
                    By posting, you agree to our Terms. Keep it legal!
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" size="lg" onClick={prevStep} className="px-8 rounded-full">
                  <ChevronLeft className="mr-2 w-4 h-4" /> Back
                </Button>
                <Button type="submit" size="lg" disabled={isSubmitting} className="px-10 rounded-full font-bold shadow-lg shadow-primary/20">
                  {isSubmitting ? "Posting..." : "Post Ad Now"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
