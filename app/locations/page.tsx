import { redirect } from "next/navigation";

// The Locations section is retired. Any visit to /locations (including the
// footer link) now goes to the contact page.
export default function LocationsPage() {
  redirect("/contact");
}
