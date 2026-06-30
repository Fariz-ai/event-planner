/** @format */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createEventAction } from "@/lib/actions/events";

async function NewEvent() {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={createEventAction} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" placeholder="Enter event title" />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your event..."
                rows={4}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                placeholder="Enter event location"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="datetime">Date & Time</Label>
              <Input id="datetime" name="eventDate" type="datetime-local" />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit">Create Event</Button>
              <Button type="button" variant="outline" asChild>
                <Link href={"/dashboard"}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default NewEvent;
