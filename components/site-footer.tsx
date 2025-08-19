import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Pool</h3>
          <p className="text-sm text-muted-foreground">Simplify group expenses with shared pools and virtual cards.</p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Company</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Resources</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Download</h3>
          <ul className="space-y-2">
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                iOS App
              </Link>
            </li>
            <li>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Android App
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mt-12 border-t pt-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Pool. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
