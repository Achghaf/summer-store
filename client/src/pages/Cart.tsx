import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Trash2, Plus, Minus } from "lucide-react";
import { useLocation } from "wouter";
import { useCart } from "@/contexts/CartContext";

/**
 * Summer Store - Page Panier
 * Gestion complète du panier avec localStorage
 * Optimisée pour mobile et desktop
 */

export default function Cart() {
  const [, navigate] = useLocation();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const shippingCost = totalItems > 0 ? 5.99 : 0;
  const finalTotal = totalPrice + shippingCost;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container py-3 md:py-4 flex items-center gap-2">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg md:text-2xl font-bold text-foreground">
            Panier ({totalItems})
          </h1>
        </div>
      </div>

      <div className="container py-6 md:py-8">
        {items.length === 0 ? (
          // Panier vide
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 md:p-12 text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Votre panier est vide
                </h2>
                <p className="text-sm md:text-base text-foreground/60">
                  Découvrez notre sélection de produits estivaux et commencez vos achats.
                </p>
              </div>
              <Button
                onClick={() => navigate("/")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-200 w-full md:w-auto"
              >
                Continuer vos achats
              </Button>
            </Card>
          </div>
        ) : (
          // Panier avec articles
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-bold text-foreground">
                  Articles ({totalItems})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-700 transition-colors"
                >
                  Vider le panier
                </button>
              </div>

              {items.map((item) => (
                <Card key={item.id} className="p-4 md:p-6 space-y-4">
                  <div className="flex gap-4 md:gap-6">
                    {/* Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Détails */}
                    <div className="flex-1 min-w-0">
                      <div className="space-y-1 mb-3">
                        <p className="text-xs md:text-sm text-foreground/60 font-medium">
                          {item.category}
                        </p>
                        <h3 className="font-semibold text-foreground text-sm md:text-base line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-base md:text-lg font-bold text-primary">
                          {item.price}
                        </p>
                      </div>

                      {/* Contrôles de quantité */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="p-1 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4 text-foreground" />
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value) || 1;
                            updateQuantity(item.id, Math.max(1, value));
                          }}
                          className="w-12 px-2 py-1 border border-border rounded-lg text-center text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                          min="1"
                        />
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-muted rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4 text-foreground" />
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="ml-auto p-2 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <Card className="p-4 md:p-6 space-y-6 sticky top-20">
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    Résumé de commande
                  </h3>

                  <div className="space-y-3 border-b border-border pb-4">
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-foreground/60">Sous-total</span>
                      <span className="font-semibold text-foreground">
                        {totalPrice.toFixed(2)}€
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm md:text-base">
                      <span className="text-foreground/60">Livraison</span>
                      <span className="font-semibold text-foreground">
                        {shippingCost.toFixed(2)}€
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-base md:text-lg">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="font-bold text-primary text-lg md:text-xl">
                      {finalTotal.toFixed(2)}€
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 md:py-4 rounded-lg transition-all duration-200"
                  >
                    Procéder au paiement
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="w-full border-primary text-primary hover:bg-primary/5 font-semibold py-3 md:py-4 rounded-lg transition-all duration-200"
                  >
                    Continuer vos achats
                  </Button>
                </div>

                {/* Informations supplémentaires */}
                <div className="space-y-2 pt-4 border-t border-border text-xs md:text-sm text-foreground/60">
                  <p>✓ Livraison gratuite à partir de 50€</p>
                  <p>✓ Retour gratuit sous 30 jours</p>
                  <p>✓ Paiement sécurisé</p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
