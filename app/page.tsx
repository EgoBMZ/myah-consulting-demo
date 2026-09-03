import { Hero } from "./components/Hero";
import { ProblemSection } from "./components/ProblemSection";
import { DiagnosticForm } from "./components/DiagnosticForm";
import { Methodology } from "./components/Methodology";
import { Services } from "./components/Services";
import { Differentiators } from "./components/Differentiators";
import { CEOProfile } from "./components/CEOProfile";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProblemSection />
      <DiagnosticForm />
      <Methodology />
      <Services />
      <Differentiators />
      <CEOProfile />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}
