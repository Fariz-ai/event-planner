/** @format */

import EventDetailContent from "@/components/event-detail-content";
import { getSession } from "@/lib/auth/server";

async function EventDetails({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const session = await getSession();

  return <EventDetailContent userId={session.data.user.id} eventId={eventId} />;
}

export default EventDetails;
