import Link from "next/link"
export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Company Info */}
        <div>
          <h3 className="text-xl font-bold tracking-wide mb-4">
            PT Prosper Witta Sejahtera
          </h3>
          <p className="text-white/70 text-sm leading-relaxed">
            Supplying More Than Chemicals — We Deliver Trust.  
            Partnering industries with reliable, consistent, and high-performance chemical solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li><Link className="hover:text-white" href={"/"}>Home</Link></li>
            <li><Link className="hover:text-white" href={"/about"}>About</Link></li>
            <li><Link className="hover:text-white" href={"/products"}>Products</Link></li>
            <li><Link className="hover:text-white" href={"/contact"}>Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Our Products</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li><Link href={"/products/home-care"}>Home & Personal Care</Link></li>
            <li><Link href={"/products/industrial-cleaner"}>Industrial Cleaner</Link></li>
            <li><Link href={"/products/veterinary"}>Veterinary</Link></li>
            <li><Link href={"/products/mining"}>Mining</Link></li>
            <li><Link href={"/products/water-treatment"}>Water Treatment</Link></li>
            <li><Link href={"/products/metal-working"}>Metal Working</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>Jakarta, Indonesia</li>
            <li>admin@prosperwittasejahtera.com</li>
            <li>(021) 2188 5249</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 mt-16 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white/50">
        <p>
          © {new Date().getFullYear()} PT Prosper Witta Sejahtera. All rights reserved.
        </p>

        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition">LinkedIn</a>
          <a href="#" className="hover:text-white transition">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}
