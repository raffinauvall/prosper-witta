import {
  Sparkles,
  FlaskRound,
  HeartPulse,
  Hammer,
  Layers,
  Droplets,
  House,
  PawPrint,
} from "lucide-react";

export const CATEGORY_INFO = {
  "home-care": {
    title: "Home & Personal Care Division",
    desc: "Home & Personal Care Products",
    theme: "emerald",
    icon: House,
    ingredient_desc:
      "Produk ini digunakan untuk kebutuhan rumah tangga dan personal care seperti pembersih, detergen, dan perawatan tubuh.",
  },

  "industrial-cleaner": {
    title: "Industrial Cleaner Division",
    desc: "Industrial Cleaner Products",
    theme: "blue",
    icon: FlaskRound,
    ingredient_desc:
      "Produk ini digunakan untuk industri pembersihan skala besar, maintenance, dan heavy-duty cleaning di lingkungan pabrik.",
  },

  "veterinary": {
    title: "Veterinary Division",
    desc: "Veterinary Products",
    theme: "red",
    icon: PawPrint,
    ingredient_desc:
      "Produk ini digunakan untuk kebutuhan perawatan hewan, peternakan, dan kesehatan hewan skala komersial.",
  },

  "mining": {
    title: "Mining Division",
    desc: "Mining Products",
    theme: "amber",
    icon: Hammer,
    ingredient_desc:
      "Produk ini digunakan untuk kebutuhan eksplorasi dan pengolahan pertambangan, termasuk flotasi mineral dan pengolahan bijih.",
  },

  "water-treatment": {
    title: "Water Treatment Division",
    desc: "Water Treatment Products",
    theme: "blue",
    icon: Droplets,
    ingredient_desc:
      "Produk ini digunakan untuk kebutuhan pengolahan air bersih, wastewater treatment, dan proses filtrasi industri.",
  },

  "metal-working": {
    title: "Metal Working Division",
    desc: "Metal Working Products",
    theme: "violet",
    icon: Layers,
    ingredient_desc:
      "Produk ini digunakan untuk proses machining, cutting, grinding, forming dan pelumasan logam industri.",
  },

    "oil-gas": {
    title: "Oil & Gas Division",
    desc: "Oil & Gas Products",
    theme: "violet",
    icon: Layers,
    ingredient_desc:
      "Produk ini digunakan untuk kebutuhan industri minyak dan gas, termasuk pengolahan, pemurnian, dan aplikasi khusus dalam lingkungan industri.",
  },

  "textile-auxiliaries": {
    title: "Textile Auxiliary Division",
    desc: "Textile Auxiliary Products",
    theme: "purple",
    icon: Sparkles,
    ingredient_desc:
      "Produk ini digunakan untuk kebutuhan auxiliaries dalam industri tekstil, seperti finishing, dyeing, dan pengolahan kain.",
  },
} as const;
export type CategoryKey = keyof typeof CATEGORY_INFO;
