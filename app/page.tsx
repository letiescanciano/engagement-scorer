import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the engagement calculator
  redirect("/tools/engagement-calculator");
}
