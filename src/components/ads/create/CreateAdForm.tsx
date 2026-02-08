"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { 
  Upload, 
  X, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  // Info,
  // DollarSign,
  // MapPin,
  Loader2,
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

export default function CreateAdForm({ categories }: { categories: Category[] }) {
  const t = useTranslations("AdsCreate");
  const router = useRouter();
  
  const formSchema = z.object({
    categoryId: z.string().min(1, { message: t("vCategory") }),
    condition: z.enum(["new", "used"], {
      message: t("vCondition"),
    }),
    title: z.string().min(5, { message: t("vTitleMin") }).max(100),
    price: z.number().min(1, { message: t("vPriceMin") }),
    negotiable: z.boolean(),
    location: z.string().min(3, { message: t("vLocation") }),
    description: z.string().max(2000),
    contactPhone: z.string().min(11, { message: t("vPhone") }),
    contactName: z.string().min(2, { message: t("vName") }),
    contactEmail: z.string().email({ message: t("vEmail") }),
  });

  type FormValues = z.infer<typeof formSchema>;

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
      toast.error(t("maxImageError"));
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
      toast.error(t("imageError"));
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
        toast.success(t("successToast"));
        router.push("/ads");
        router.refresh();
      } else {
        toast.error(res.message || t("errorToast"));
      }
    } catch {
      toast.error(t("unexpectedError"));
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
                <h2 className="text-2xl font-bold tracking-tight">{t("step1Title")}</h2>
                <p className="text-muted-foreground text-sm">{t("step1Desc")}</p>
              </div>

              <Card className="rounded-2xl shadow-sm border-border/40">
                <CardContent className="p-6 space-y-6">
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-base font-semibold">{t("categoryLabel")}</FormLabel>
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
                                      <Image src={cat.icon} alt={cat.name} fill className="object-contain dark:invert rounded-lg p-1" />
                                    </div>
                                  )}
                                  <span className="text-xs uppercase font-bold text-center leading-tight">
                                    {cat.name}
                                  </span>
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
                        <FormLabel className="text-base font-semibold">{t("conditionLabel")}</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex gap-6"
                          >
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="used" /></FormControl>
                              <FormLabel className="font-medium cursor-pointer">{t("conditionUsed")}</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-2 space-y-0">
                              <FormControl><RadioGroupItem value="new" /></FormControl>
                              <FormLabel className="font-medium cursor-pointer">{t("conditionNew")}</FormLabel>
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
                        <FormLabel className="text-base font-semibold">{t("titleLabel")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("titlePlaceholder")} {...field} className="h-12" />
                        </FormControl>
                        <FormDescription>{t("titleDesc")}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button type="button" size="lg" onClick={nextStep} className="px-8 rounded-full">
                  {t("nextBtn")} <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">{t("step2Title")}</h2>
                <p className="text-muted-foreground text-sm">{t("step2Desc")}</p>
              </div>

              <Card className="rounded-2xl shadow-sm border-border/40">
                <CardContent className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">{t("priceLabel")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold text-lg">৳</span>
                              <Input 
                                type="number" 
                                placeholder={t("pricePlaceholder")} 
                                {...field} 
                                onChange={(e) => field.onChange(Number(e.target.value))}
                                className="pl-8 h-12 text-lg font-semibold"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">{t("locationLabel")}</FormLabel>
                          <FormControl>
                            <LocationSelector 
                              value={field.value}
                              onSelect={field.onChange}
                              placeholder={t("locationPlaceholder")}
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
                      <FormItem className="flex flex-row items-center justify-between rounded-xl border p-4 bg-muted/30">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base font-semibold">{t("negotiableLabel")}</FormLabel>
                          <FormDescription>{t("negotiableDesc")}</FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">{t("descriptionLabel")}</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder={t("descriptionPlaceholder")}
                            className="min-h-37.5 resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-between gap-4">
                <Button type="button" variant="outline" size="lg" onClick={prevStep} className="px-8 rounded-full">
                  <ChevronLeft className="mr-2 w-4 h-4" /> {t("backBtn")}
                </Button>
                <Button type="button" size="lg" onClick={nextStep} className="px-8 rounded-full">
                  {t("nextBtn")} <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">{t("step3Title")}</h2>
                <p className="text-muted-foreground text-sm">{t("step3Desc")}</p>
              </div>

              <Card className="rounded-2xl shadow-sm border-border/40">
                <CardContent className="p-6 space-y-8">
                  <div className="space-y-4">
                    <FormLabel className="text-base font-semibold">{t("photosLabel")}</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden border group">
                          <Image src={preview} alt={`Preview ${index}`} fill className="object-cover" />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {images.length < 5 && (
                        <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-muted-foreground/25 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
                          <Upload className="w-6 h-6 text-muted-foreground mb-2" />
                          <span className="text-xs font-medium text-muted-foreground">{t("uploadLabel")}</span>
                          <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageChange} />
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="contactName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">{t("contactNameLabel")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contactNamePlaceholder")} {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-semibold">{t("contactPhoneLabel")}</FormLabel>
                          <FormControl>
                            <Input placeholder={t("contactPhonePlaceholder")} {...field} className="h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-semibold">{t("contactEmailLabel")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("contactEmailPlaceholder")} {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="p-4 bg-muted/30 rounded-xl border border-border/50">
                    <p className="text-xs text-muted-foreground text-center">
                      {t("termsNotice")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between gap-4">
                <Button type="button" variant="outline" size="lg" onClick={prevStep} className="px-8 rounded-full" disabled={isSubmitting}>
                  <ChevronLeft className="mr-2 w-4 h-4" /> {t("backBtn")}
                </Button>
                <Button type="submit" size="lg" className="px-10 rounded-full font-bold shadow-lg shadow-primary/20" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> {t("postingBtn")}</>
                  ) : (
                    t("postBtn")
                  )}
                </Button>
              </div>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
