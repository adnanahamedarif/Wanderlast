"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Plus, X } from "lucide-react";
import { cn } from "cn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import type { Destination } from "@/lib/destinations";

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

const fieldClassName =
  "h-9 w-full rounded-md border-neutral-200 bg-neutral-50 px-3 text-sm shadow-none placeholder:text-neutral-400 focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/20";

const labelClassName = "text-xs font-medium text-neutral-800";

type EditDestinationProps = {
  destination: Destination;
};

function EditDestination({ destination }: EditDestinationProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Destination>(destination);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField<K extends keyof Destination>(
    key: K,
    value: Destination[K],
  ) {
    setForm((previous) => ({ ...previous, [key]: value }));
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (nextOpen) {
      setForm(destination);
      setError(null);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination._id || isSaving) return;

    setIsSaving(true);
    setError(null);

    try {
      const updatedData = { ...form };
      delete updatedData._id;

      const response = await fetch(
        `http://localhost:8000/destination/${encodeURIComponent(destination._id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        },
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setOpen(false);
      router.refresh();
    } catch {
      setError("Could not save your changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  function handleCancel() {
    setForm(destination);
    setError(null);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        type="button"
        className="inline-flex h-8 items-center gap-2 rounded border border-neutral-300 bg-white px-3 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
      >
        <Pencil className="size-3.5" strokeWidth={1.8} />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-[36rem]">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the details for this travel package.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
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
          </div>

          <div className="flex items-center justify-end gap-3 border-t pt-4">
            {error && (
              <p role="alert" className="mr-auto text-xs text-red-500">
                {error}
              </p>
            )}
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleCancel}
              disabled={isSaving}
              className="h-9 gap-1.5 rounded-md border-destructive/40 px-4 text-xs font-medium text-destructive hover:bg-destructive/5 hover:text-destructive"
            >
              <X className="size-3.5" />
              Cancel
            </Button>
            <Button
              type="submit"
              size="lg"
              disabled={isSaving}
              className="h-9 gap-1.5 rounded-md bg-brand px-4 text-xs font-medium text-white hover:bg-brand-dark"
            >
              <Plus className="size-3.5" />
              {isSaving ? "Saving..." : "Edit Travel Package"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditDestination;
