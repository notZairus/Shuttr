// About.tsx
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <Card>
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold">📸 About This App</h1>

          <section>
            <h2 className="font-semibold text-lg">What It Is</h2>
            <p>
              A fun, browser-based photo booth app that lets you take snapshots using your device’s camera — with filters and backgrounds!
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg">Key Features</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Take photos directly in your browser</li>
              <li>Apply and customize strip frame</li>
              <li>Works on both mobile and desktop</li>
              <li>No photos are stored — privacy-friendly</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg">Why I Built It</h2>
            <p>
              This project helped me practice web camera api and modern web development using React. It’s simple, fast, and doesn’t need downloads or accounts.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg">Limitations</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Only works in browsers that support camera access</li>
              <li>Photos are not saved to any server</li>
              <li>Performance may vary per device</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg">Technologies Used</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>React</li>
              <li>Wouter</li>
              <li>Tailwind CSS</li>
              <li>html2canvas</li>
              <li>TypeScript</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg">Developer</h2>
            <p>
              Made by [Zairus V. Bermillo] <br />
              <a href="https://github.com/notzairus" target="blank" className="text-blue-500 underline">
                View my GitHub
              </a>
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
