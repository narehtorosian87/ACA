import { Link } from "react-router-dom";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="bg-sand-900 py-16 text-sand-100/80">
      <Container>
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-heading text-xl text-sand-50">Ekam Yoga Studio</p>
            <p className="mt-3 text-sm">A small studio built around breath, patience, and steady practice.</p>
          </div>
          <div>
            <h4 className="mb-3 font-heading text-sand-50">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/schedule" className="hover:text-sand-50">
                  Class Schedule
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-sand-50">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/styles-of-yoga" className="hover:text-sand-50">
                  Styles of Yoga
                </Link>
              </li>
              <li>
                <Link to="/private-sessions" className="hover:text-sand-50">
                  Private Sessions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 font-heading text-sand-50">Visit</h4>
            <ul className="space-y-2 text-sm">
              <li>Open Monday to Saturday</li>
              <li>Sunday is a rest day, even for us</li>
              <li>hello@ekamyoga.studio</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap justify-between gap-2 border-t border-sand-100/15 pt-6 text-xs">
          <span>© 2026 Ekam Yoga Studio</span>
          <span>Om Shanti, Shanti, Shanti</span>
        </div>
      </Container>
    </footer>
  );
}
