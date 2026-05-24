import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingBag, Sun, Waves, Heart, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";

/**
 * Summer Store - Page d'accueil
 * Design: Minimalisme Côtier Moderne
 * Palette: Blanc cassé, bleu azur, sable chaud, gris clair
 * Typographie: Poppins pour titres, Inter pour corps
 * Animations: Optimisées avec prefers-reduced-motion
 * Mobile: Optimisé pour tous les appareils
 */

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Sunscreen SPF 50",
    price: "€24.99",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663500219337/kW8Td6ZNcuDsc5adjpovn5/summer-products-flat-lay-KVxuxqhC3c9Gr8bQTN8M8o.webp",
    category: "Soins",
  },
  {
    id: 2,
    name: "Beach Towel",
    price: "€34.99",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663500219337/kW8Td6ZNcuDsc5adjpovn5/summer-lifestyle-scene-DTg6DZBoVrmUSvjnyYZFWK.webp",
    category: "Accessoires",
  },
  {
    id: 3,
    name: "Straw Hat",
    price: "€44.99",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663500219337/kW8Td6ZNcuDsc5adjpovn5/tropical-leaves-pattern-Z5qcymPzHEYCWjZ9bdzSJv.webp",
    category: "Accessoires",
  },
  {
    id: 4,
    name: "Summer Dress",
    price: "€59.99",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663500219337/kW8Td6ZNcuDsc5adjpovn5/hero-beach-sunset-29TMnc9fRq68NfzKEiECb8.webp",
    category: "Vêtements",
  },
];

export default function Home() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const { addItem, getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <Sun className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" />
            <h1 className="text-lg md:text-xl font-bold text-foreground truncate">Summer Store</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => navigate("/admin")}
              className="px-3 py-1 text-sm text-foreground/60 hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-200"
            >
              Admin
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <button 
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              <ShoppingBag className="w-5 h-5 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-foreground" />
              ) : (
                <Menu className="w-5 h-5 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-white/98 py-3 px-4 space-y-2">
            <button 
              onClick={() => {
                navigate("/admin");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Admin
            </button>
          </div>
        )}
      </nav>

      {/* Hero Section - Optimisé mobile */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        <div className="relative container py-8 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6 animate-slide-in-left order-2 md:order-1">
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-2xl md:text-5xl font-bold text-foreground leading-tight">
                Découvrez votre été
              </h2>
              <p className="text-sm md:text-lg text-foreground/70 leading-relaxed">
                Une collection curatée de produits estivaux pour profiter pleinement de la saison. Du luxe à la plage.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Button
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 md:px-8 py-3 md:py-6 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-sm md:text-base"
              >
                Découvrir
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5 font-semibold px-6 md:px-8 py-3 md:py-6 rounded-lg transition-all duration-200 text-sm md:text-base"
              >
                En savoir plus
              </Button>
            </div>
          </div>
          <div className="relative h-48 md:h-full rounded-lg overflow-hidden animate-scale-in order-1 md:order-2">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663500219337/kW8Td6ZNcuDsc5adjpovn5/hero-beach-sunset-29TMnc9fRq68NfzKEiECb8.webp"
              alt="Plage au coucher de soleil"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Features Section - Optimisé mobile */}
      <section className="container py-8 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="space-y-3 text-center md:text-left p-4 md:p-0 animate-fade-in-up">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Waves className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Qualité Premium</h3>
            <p className="text-sm md:text-base text-foreground/60">
              Tous nos produits sont sélectionnés pour leur qualité et durabilité.
            </p>
          </div>
          <div className="space-y-3 text-center md:text-left p-4 md:p-0 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Sun className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Livraison Rapide</h3>
            <p className="text-sm md:text-base text-foreground/60">
              Recevez vos commandes en 2-3 jours ouvrables partout en France.
            </p>
          </div>
          <div className="space-y-3 text-center md:text-left p-4 md:p-0 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto md:mx-0">
              <Heart className="w-5 h-5 md:w-6 md:h-6 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-foreground">Satisfait ou Remboursé</h3>
            <p className="text-sm md:text-base text-foreground/60">
              30 jours pour retourner vos articles sans frais.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section - Optimisé mobile */}
      <section className="bg-muted/30 py-8 md:py-24">
        <div className="container space-y-8 md:space-y-12">
          <div className="space-y-2 md:space-y-4 text-center animate-fade-in-up px-4">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              Nos Produits Phares
            </h2>
            <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto">
              Sélection exclusive de produits estivaux pour un été inoubliable
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-40 sm:h-48 overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full transition-colors duration-200 shadow-md"
                    aria-label={`Ajouter ${product.name} aux favoris`}
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        favorites.includes(product.id)
                          ? "fill-primary text-primary"
                          : "text-foreground/40"
                      }`}
                    />
                  </button>
                </div>
                <div className="p-3 md:p-4 space-y-2 md:space-y-3">
                  <div className="space-y-1">
                    <p className="text-xs md:text-sm text-foreground/60 font-medium">
                      {product.category}
                    </p>
                    <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="text-base md:text-lg font-bold text-primary">
                      {product.price}
                    </span>
                    <Button
                      size="sm"
                      onClick={() => addItem(product)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section - Optimisé mobile */}
      <section className="container py-8 md:py-24">
        <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 text-center animate-fade-in-up px-4">
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">
              Restez Connecté
            </h2>
            <p className="text-sm md:text-lg text-foreground/60">
              Inscrivez-vous pour recevoir nos dernières collections et offres exclusives
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <input
              type="email"
              placeholder="Votre email"
              className="flex-1 px-3 md:px-4 py-2 md:py-3 border border-border rounded-lg bg-white text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 text-sm md:text-base"
              aria-label="Email pour la newsletter"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 md:px-8 py-2 md:py-3 rounded-lg transition-all duration-200 text-sm md:text-base w-full sm:w-auto">
              S'inscrire
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Optimisé mobile */}
      <footer className="bg-foreground/5 border-t border-border py-8 md:py-12">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="space-y-3 md:space-y-4">
              <h3 className="font-semibold text-foreground text-sm md:text-base">Summer Store</h3>
              <p className="text-xs md:text-sm text-foreground/60">
                Votre destination pour tous vos besoins estivaux.
              </p>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-semibold text-foreground text-sm md:text-base">Boutique</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">Nouveautés</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Vêtements</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Accessoires</a></li>
              </ul>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-semibold text-foreground text-sm md:text-base">Support</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Retours</a></li>
              </ul>
            </div>
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-semibold text-foreground text-sm md:text-base">Légal</h4>
              <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-6 md:pt-8 text-center text-xs md:text-sm text-foreground/60">
            <p>&copy; 2024 Summer Store. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
