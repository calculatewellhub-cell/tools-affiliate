import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page max-w-xl py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink-950">Page not found</h1>
      <p className="mt-3 text-ink-600">The page may have moved. Try searching for the tool instead.</p>
      <form action="/search/" method="get" role="search" className="mt-6 flex gap-2">
        <label htmlFor="nf-q" className="sr-only">Search</label>
        <input id="nf-q" name="q" type="search" className="input" placeholder="What tool are you looking for?" />
        <button className="btn-primary" type="submit">Search</button>
      </form>
      <Link href="/" className="mt-6 inline-block link">Back to home</Link>
    </div>
  );
}
