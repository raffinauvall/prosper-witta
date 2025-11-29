"use client";

import { useState } from "react";
import { ArrowLeft, Pickaxe } from "lucide-react";
import { useRouter } from "next/navigation";

import ProductHeader from "@/components/products/ProductHeader";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductDetail from "@/components/products/ProductDetail";
import ProductIngredient from "@/components/products/ProductIngredient";

import { miningProducts } from "@/data/mining";
import { Colors } from "@/lib/color";

export default function MiningPage() {
    const router = useRouter();

    const theme = Colors.mining;

    const [selected, setSelected] = useState(miningProducts[0]);

    return (
        <main className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-7xl mx-auto">

                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>

                <ProductHeader
                    selected={selected.id} 
                    Icon={Pickaxe}
                    color={Colors.mining}
                    title="Mining Division"
                    desc="Mining Products"
                />


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    <div className="lg:col-span-3">
                        <ProductSidebar
                            products={miningProducts}
                            selected={selected.id}    
                            setSelected={(id) => {
                                const prod = miningProducts.find(p => p.id === id);
                                if (prod) setSelected(prod);
                            }}
                            themeColor={theme}
                        />
                    </div>

                    {/* Detail */}
                    <div className="lg:col-span-6">
                        <ProductDetail selected={selected} />
                    </div>

                    {/* Ingredients */}
                    <div className="lg:col-span-3">
                        <ProductIngredient
                            ingredients={selected.ingredients}
                            themeColor={theme}
                        />
                    </div>

                </div>
            </div>
        </main>
    );
}
