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
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About Us</a></li>
            <li><a href="#" className="hover:text-white transition">Products</a></li>
            <li><a href="#" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Our Products</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>Industrial Chemicals</li>
            <li>Mining Chemicals</li>
            <li>Specialty Chemicals</li>
            <li>Laboratory Supplies</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-white/70 text-sm">
            <li>Jakarta, Indonesia</li>
            <li>info@prosperwitta.com</li>
            <li>+62 812-3456-7890</li>
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
          <a href="#" className="hover:text-white transition">Instagram</a>
          <a href="#" className="hover:text-white transition">WhatsApp</a>
        </div>
      </div>
    </footer>
  )
}
