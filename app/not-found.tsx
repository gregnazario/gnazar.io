import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="card">
          <h2>Page not found</h2>
          <p>That page does not exist. Head back to the homepage.</p>
          <Link className="button ghost" href="/">
            Go home
          </Link>
        </div>
      </div>
    </section>
  );
}
