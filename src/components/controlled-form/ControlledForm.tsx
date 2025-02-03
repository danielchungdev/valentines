"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Slider } from "../ui/slider";
import { FC, useState } from "react";
import { ClipLoader } from "react-spinners";

const FormSchema = z.object({
  date: z.date({
    required_error: "A date is required ):",
  }),
  time: z.string().min(0, "You must select at least one option."),
  korean: z.number().optional(),
  viet: z.number().optional(),
  steak: z.number().optional(),
  chinese: z.number().optional(),
  friedchicken: z.number().optional(),
  tacos: z.number().optional(),
  pasta: z.number().optional(),
});

type ControlledFormProps = {
  nextStep: () => void;
};

const ControlledForm: FC<ControlledFormProps> = ({ nextStep }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "New Submission",
          recipient: process.env.EMAIL_RECEIVER, // You can set this dynamically or from the .env
          message: `
            Date: ${data.date}
            Time: ${data.time}
            Preferences:
            - Korean: ${data.korean ?? 0}
            - Vietnamese: ${data.viet ?? 0}
            - Steak: ${data.steak ?? 0}
            - Chinese: ${data.chinese ?? 0}
            - Fried Chicken: ${data.friedchicken ?? 0}
            - Tacos: ${data.tacos ?? 0}
            - Pasta: ${data.pasta ?? 0}
          `,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Email sent successfully!",
        });
      } else {
        const error = await response.json();
        toast({
          title: "Error",
          description: `Failed to send email: ${error.message}`,
        });
      }
      setIsLoading(false)
      nextStep();
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while sending the email.",
      });
    }
  }

  return isLoading ? (
    <ClipLoader/>
  ) : (
    <Card className="min-w-[500px]">
      <p className="text-xl font-bold">
        YAAAY! ahora un par de preguntitas jijiji{" "}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col mt-8">
                <FormLabel>Que día te funciona mejor? :D</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date("2025-02-14") ||
                        date < new Date("2025-02-11")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues().date && (
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>A que hora te busco?</FormLabel>
                  <ToggleGroup
                    type="single"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ToggleGroupItem value="9:00 PM">9:00 PM</ToggleGroupItem>
                    <ToggleGroupItem value="9:30 PM">9:30 PM</ToggleGroupItem>
                    <ToggleGroupItem value="10:00 PM">10:00 PM</ToggleGroupItem>
                    <ToggleGroupItem value="10:30 PM">10:30 PM</ToggleGroupItem>
                  </ToggleGroup>
                  <FormDescription>
                    (asumamos 30 min para llegar al restaurante)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {form.getValues().time && (
            <div className="mt-2">
              <FormLabel>Rate your cravings time!</FormLabel>
              <FormField
                control={form.control}
                name="korean"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 mt-2">
                    <FormLabel>Korean</FormLabel>
                    <Slider
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="viet"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 mt-8">
                    <FormLabel>Vietnamese</FormLabel>
                    <Slider
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="steak"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 mt-8">
                    <FormLabel>Steak</FormLabel>
                    <Slider
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chinese"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 mt-8">
                    <FormLabel>Chinese</FormLabel>
                    <Slider
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="friedchicken"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 mt-8">
                    <FormLabel>Fried Chicken</FormLabel>
                    <Slider
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tacos"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 mt-8">
                    <FormLabel>Tacos</FormLabel>
                    <Slider
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pasta"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-4 mt-8">
                    <FormLabel>Pasta</FormLabel>
                    <Slider
                      value={[field.value ?? 0]}
                      onValueChange={(val) => field.onChange(val[0])}
                    />
                  </FormItem>
                )}
              />
            </div>
          )}
          {form.getValues().date && form.getValues().time && (
            <Button type="submit">Submit</Button>
          )}
        </form>
      </Form>
    </Card>
  );
};

export default ControlledForm;
