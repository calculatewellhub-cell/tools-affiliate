import Link from "next/link";
import { DocPage } from "@/components/DocPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = buildMetadata({
  title: "About Us",
  description: `About ${site.name}: who we are, what we cover and how we keep our software recommendations honest.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <DocPage title="About CalculateWellHub Tools" path="/about/" intro="A software discovery hub that helps you find the right tool — and understand its trade-offs — before you spend money or time on it.">
      <h2>What we do</h2>
      <p>
        {site.name} is part of <a href={site.parentUrl}>{site.parentName}</a>, a collection of practical calculators and resources. This site focuses on software: AI tools, SEO platforms, writing and video tools, marketing, website, productivity, business and security software, plus a set of free browser-based utilities.
      </p>
      <p>For every tool we cover we aim to answer the same practical questions:</p>
      <ul>
        <li>What does it actually do, and who is it for?</li>
        <li>Is there a free plan or trial, and what are its limits?</li>
        <li>Who should look at an alternative instead?</li>
        <li>What should you check before paying?</li>
      </ul>
      <h2>Who we write for</h2>
      <p>
        Bloggers, freelancers, students, job seekers, small businesses, marketers, SEO professionals, creators and anyone choosing software — in the USA, Canada, the UK, Australia, India and elsewhere.
      </p>
      <h2>How we stay honest</h2>
      <ul>
        <li>We don&apos;t publish invented prices, ratings, testimonials or user numbers.</li>
        <li>We only describe a tool as tested when we have actually tested it, and we say when.</li>
        <li>Every tool page shows when its details and pricing were last checked.</li>
        <li>We disclose affiliate relationships clearly. Commissions never change what we write.</li>
      </ul>
      <p>
        Read our <Link href="/editorial-policy/">editorial policy</Link>, <Link href="/how-we-evaluate/">how we evaluate tools</Link> and our <Link href="/affiliate-disclosure/">affiliate disclosure</Link>.
      </p>
      <h2>Get in touch</h2>
      <p>
        Spotted something out of date or incorrect? We appreciate corrections. <Link href="/contact/">Contact us</Link>.
      </p>
    </DocPage>
  );
}
