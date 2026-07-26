import Layout from "@/components/Layout";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <Layout>
      <section
        className="min-h-screen flex items-center justify-center"
        style={{ paddingTop: "120px" }}
      >
        <div className="container text-center">
          <span className="section-label">404</span>
          <div className="gold-rule mx-auto" />
          <h1
            className="font-display text-6xl md:text-8xl mb-6"
            style={{ color: "oklch(0.94 0.005 80)" }}
          >
            Not Found
          </h1>
          <p className="text-lg mb-10" style={{ color: "oklch(0.58 0.010 80)" }}>
            This page doesn't exist. Let's get you back on track.
          </p>
          <Link href="/" className="btn-gold px-8 py-3 rounded-sm inline-block text-sm">
            Return Home
          </Link>
        </div>
      </section>
    </Layout>
  );
}
