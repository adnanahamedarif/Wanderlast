"use client";

import { useState, type FormEvent } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Desert",
  "Wildlife",
  "Cruise",
];

const initialForm = {
  destinationName: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type FormState = typeof initialForm;

const fieldClassName =
  "h-9 w-full rounded-md border-neutral-200 bg-neutral-50 px-3 text-sm shadow-none placeholder:text-neutral-400 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20";

const labelClassName = "text-xs font-medium text-neutral-800";

function AddDestinationPage() {
  const [form, setForm] = useState<FormState>(initialForm);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    const res= await fetch('http://localhost:8000/add-destination',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form)
        })

        const data = await res.json()
        console.log(data);
  }

  function handleCancel() {
    setForm(initialForm);
  }

  console.log(form);

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto w-full max-w-[84rem] px-5 py-14 sm:px-6 md:py-20">
        <h1 className="font-display text-[2rem] leading-tight font-normal tracking-[-0.02em] text-neutral-900 md:text-[2.25rem]">
          Add New Travel Package
        </h1>

        <Card className="mx-auto mt-10 w-full max-w-[34rem] gap-0 rounded-lg py-0 shadow-sm md:mt-12 [--card-spacing:1.5rem] md:[--card-spacing:2rem]">
          <form onSubmit={handleSubmit} className="flex flex-col">
            <CardContent className="grid grid-cols-1 gap-x-5 gap-y-4 px-(--card-spacing) py-(--card-spacing) sm:grid-cols-2">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="destinationName" className={labelClassName}>
                  Destination Name
                </Label>
                <Input
                  id="destinationName"
                  name="destinationName"
                  placeholder="Bali Paradise"
                  autoComplete="off"
                  value={form.destinationName}
                  onChange={(event) =>
                    updateField("destinationName", event.target.value)
                  }
                  className={fieldClassName}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="country" className={labelClassName}>
                  Country
                </Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Indonesia"
                  autoComplete="off"
                  value={form.country}
                  onChange={(event) =>
                    updateField("country", event.target.value)
                  }
                  className={fieldClassName}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="category" className={labelClassName}>
                  Category
                </Label>
                <Select
                  name="category"
                  value={form.category}
                  onValueChange={(value) =>
                    updateField("category", String(value ?? ""))
                  }
                >
                  <SelectTrigger
                    id="category"
                    className={cn(
                      fieldClassName,
                      "justify-between data-[size=default]:h-9",
                    )}
                  >
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="price" className={labelClassName}>
                  Price (USD)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  placeholder="e.g., 1299"
                  autoComplete="off"
                  value={form.price}
                  onChange={(event) => updateField("price", event.target.value)}
                  className={cn(
                    fieldClassName,
                    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                  )}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="duration" className={labelClassName}>
                  Duration
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g., 7 Days/6 Nights"
                  autoComplete="off"
                  value={form.duration}
                  onChange={(event) =>
                    updateField("duration", event.target.value)
                  }
                  className={fieldClassName}
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="departureDate" className={labelClassName}>
                  Departure Date
                </Label>
                <Input
                  id="departureDate"
                  name="departureDate"
                  type="date"
                  value={form.departureDate}
                  onChange={(event) =>
                    updateField("departureDate", event.target.value)
                  }
                  className={cn(
                    fieldClassName,
                    "text-neutral-900 [&::-webkit-calendar-picker-indicator]:opacity-0",
                    !form.departureDate && "text-neutral-400",
                  )}
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="imageUrl" className={labelClassName}>
                  Image URL
                </Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  autoComplete="off"
                  value={form.imageUrl}
                  onChange={(event) =>
                    updateField("imageUrl", event.target.value)
                  }
                  className={fieldClassName}
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <Label htmlFor="description" className={labelClassName}>
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  placeholder="Describe the travel experience..."
                  value={form.description}
                  onChange={(event) =>
                    updateField("description", event.target.value)
                  }
                  className="min-h-24 resize-none rounded-md border-neutral-200 bg-neutral-50 px-3 py-2 text-sm placeholder:text-neutral-400 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20"
                />
              </div>
            </CardContent>

            <CardFooter className="justify-end gap-3 rounded-b-lg border-t bg-transparent px-(--card-spacing) py-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={handleCancel}
                className="h-9 gap-1.5 rounded-md border-destructive/40 px-4 text-xs font-medium text-destructive hover:bg-destructive/5 hover:text-destructive"
              >
                <X className="size-3.5" />
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="h-9 gap-1.5 rounded-md bg-brand px-4 text-xs font-medium text-white hover:bg-brand-dark"
              >
                <Plus className="size-3.5" />
                Add Travel Package
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
}

export default AddDestinationPage;
