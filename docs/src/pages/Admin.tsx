import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Plus, Trash2, Menu, X } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

/**
 * Summer Store - Page Admin
 * Interface pour éditer la page d'accueil
 * Optimisée pour mobile et desktop
 */

interface HeroContent {
  title: string;
  description: string;
  image: string;
}

interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

export default function Admin() {
  const [, navigate] = useLocation();
  const [saved, setSaved] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Découvrez votre été",
    description: "Une collection curatée de produits estivaux pour profiter pleinement de la saison. Du luxe à la plage.",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663500219337/kW8Td6ZNcuDsc5adjpovn5/hero-beach-sunset-29TMnc9fRq68NfzKEiECb8.webp",
  });

  const [features, setFeatures] = useState<Feature[]>([
    {
      id: 1,
      icon: "waves",
      title: "Qualité Premium",
      description: "Tous nos produits sont sélectionnés pour leur qualité et leur durabilité.",
    },
    {
      id: 2,
      icon: "sun",
      title: "Livraison Rapide",
      description: "Recevez vos commandes en 2-3 jours ouvrables partout en France.",
    },
    {
      id: 3,
      icon: "heart",
      title: "Satisfait ou Remboursé",
      description: "30 jours pour retourner vos articles sans frais supplémentaires.",
    },
  ]);

  const [products, setProducts] = useState<Product[]>([
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
  ]);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    console.log("Contenu sauvegardé:", { heroContent, features, products });
  };

  const handleDeleteFeature = (id: number) => {
    setFeatures(features.filter((f) => f.id !== id));
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddFeature = () => {
    setFeatures([
      ...features,
      {
        id: Math.max(...features.map((f) => f.id), 0) + 1,
        icon: "star",
        title: "Nouvelle fonctionnalité",
        description: "Description de la fonctionnalité",
      },
    ]);
  };

  const handleAddProduct = () => {
    setProducts([
      ...products,
      {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        name: "Nouveau produit",
        price: "€0.00",
        image: "",
        category: "Catégorie",
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container py-3 md:py-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => navigate("/")}
              className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <h1 className="text-sm md:text-2xl font-bold text-foreground truncate">Admin</h1>
          </div>
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center gap-2 text-sm md:text-base px-3 md:px-4 py-2 md:py-2"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Sauvegarder</span>
          </Button>
        </div>
        {saved && (
          <div className="container py-2 text-xs md:text-sm text-green-600 bg-green-50 rounded-lg">
            ✓ Contenu sauvegardé avec succès !
          </div>
        )}
      </div>

      <div className="container py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Hero Section Editor */}
        <Card className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4">Section Héro</h2>
            <div className="space-y-3 md:space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-semibold text-foreground mb-1 md:mb-2">
                  Titre principal
                </label>
                <Input
                  value={heroContent.title}
                  onChange={(e) =>
                    setHeroContent({ ...heroContent, title: e.target.value })
                  }
                  className="w-full text-sm"
                  placeholder="Titre principal"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-foreground mb-1 md:mb-2">
                  Description
                </label>
                <Textarea
                  value={heroContent.description}
                  onChange={(e) =>
                    setHeroContent({ ...heroContent, description: e.target.value })
                  }
                  className="w-full min-h-20 md:min-h-24 text-sm"
                  placeholder="Description du héro"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-semibold text-foreground mb-1 md:mb-2">
                  URL de l'image
                </label>
                <Input
                  value={heroContent.image}
                  onChange={(e) =>
                    setHeroContent({ ...heroContent, image: e.target.value })
                  }
                  className="w-full text-sm"
                  placeholder="https://..."
                />
              </div>
              <div className="mt-3 md:mt-4">
                <p className="text-xs md:text-sm text-foreground/60 mb-2">Aperçu :</p>
                <img
                  src={heroContent.image}
                  alt="Aperçu"
                  className="w-full h-32 md:h-48 object-cover rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Image+non+disponible";
                  }}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Features Editor */}
        <Card className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Fonctionnalités</h2>
            <Button
              onClick={handleAddFeature}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1 text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </Button>
          </div>
          <div className="space-y-3 md:space-y-4">
            {features.map((feature, index) => (
              <div key={feature.id} className="p-3 md:p-4 border border-border rounded-lg space-y-2 md:space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground text-sm md:text-base">Fonctionnalité {index + 1}</h3>
                  <button
                    onClick={() => handleDeleteFeature(feature.id)}
                    className="p-1 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-foreground mb-1">
                    Titre
                  </label>
                  <Input
                    value={feature.title}
                    onChange={(e) => {
                      const updated = features.map((f) =>
                        f.id === feature.id ? { ...f, title: e.target.value } : f
                      );
                      setFeatures(updated);
                    }}
                    className="w-full text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-foreground mb-1">
                    Description
                  </label>
                  <Textarea
                    value={feature.description}
                    onChange={(e) => {
                      const updated = features.map((f) =>
                        f.id === feature.id ? { ...f, description: e.target.value } : f
                      );
                      setFeatures(updated);
                    }}
                    className="w-full min-h-16 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Products Editor */}
        <Card className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xl md:text-2xl font-bold text-foreground">Produits</h2>
            <Button
              onClick={handleAddProduct}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-1 text-xs md:text-sm px-2 md:px-3 py-1 md:py-2"
            >
              <Plus className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </Button>
          </div>
          <div className="space-y-3 md:space-y-4">
            {products.map((product, index) => (
              <div key={product.id} className="p-3 md:p-4 border border-border rounded-lg space-y-2 md:space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-foreground text-sm md:text-base">Produit {index + 1}</h3>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="p-1 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-1">
                      Nom
                    </label>
                    <Input
                      value={product.name}
                      onChange={(e) => {
                        const updated = products.map((p) =>
                          p.id === product.id ? { ...p, name: e.target.value } : p
                        );
                        setProducts(updated);
                      }}
                      className="w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-1">
                      Prix
                    </label>
                    <Input
                      value={product.price}
                      onChange={(e) => {
                        const updated = products.map((p) =>
                          p.id === product.id ? { ...p, price: e.target.value } : p
                        );
                        setProducts(updated);
                      }}
                      className="w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-1">
                      Catégorie
                    </label>
                    <Input
                      value={product.category}
                      onChange={(e) => {
                        const updated = products.map((p) =>
                          p.id === product.id ? { ...p, category: e.target.value } : p
                        );
                        setProducts(updated);
                      }}
                      className="w-full text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-foreground mb-1">
                      URL image
                    </label>
                    <Input
                      value={product.image}
                      onChange={(e) => {
                        const updated = products.map((p) =>
                          p.id === product.id ? { ...p, image: e.target.value } : p
                        );
                        setProducts(updated);
                      }}
                      className="w-full text-sm"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                {product.image && (
                  <div className="mt-2">
                    <p className="text-xs md:text-sm text-foreground/60 mb-2">Aperçu :</p>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 md:h-32 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/200x150?text=Image+non+disponible";
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSave}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-4 md:px-8 py-2 md:py-3 flex items-center gap-2 w-full md:w-auto text-sm md:text-base"
          >
            <Save className="w-4 h-4 md:w-5 md:h-5" />
            Sauvegarder tous les changements
          </Button>
        </div>
      </div>
    </div>
  );
}
