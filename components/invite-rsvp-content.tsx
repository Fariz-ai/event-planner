/** @format */

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Button } from "./ui/button";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";

async function InviteRsvpContent({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const e = row.event;
  const event = {
    title: e.title,
    description: e.description,
    location: e.location,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
  };

  const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            RSVP
          </Badge>
          <CardTitle>{event.title}</CardTitle>
          <p className="text-sm">
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "No date selected."}
            {event.location ? ` - ${event.location}` : ""}
          </p>
          <p className="text-sm">{event.description}</p>
        </CardHeader>

        <CardContent>
          {submitted ? (
            <p className="text-sm text-muted-foreground">
              Thank you, your RSVP has been submitted.
            </p>
          ) : (
            <form action={submitRsvpForToken} className="space-y-6">
              <input type="hidden" name="token" value={token} />

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="space-y-3">
                <Label>Attendance</Label>
                <RadioGroup
                  name="attendance"
                  defaultValue="going"
                  className="gap-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="going" id="going" />
                    <Label htmlFor="going" className="font-normal">
                      Going
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="maybe" id="maybe" />
                    <Label htmlFor="maybe" className="font-normal">
                      Maybe
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not_going" id="not_going" />
                    <Label htmlFor="not_going" className="font-normal">
                      Not going
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button type="submit">Submit RSVP</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default InviteRsvpContent;
