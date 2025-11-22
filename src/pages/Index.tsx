import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  specs: {
    processor?: string;
    ram?: string;
    storage?: string;
    screen?: string;
    battery?: string;
  };
}

const products: Product[] = [
  {
    id: 1,
    name: "Смартфон Galaxy Pro X",
    price: 89990,
    image: "https://cdn.poehali.dev/projects/16b080db-0c02-4a1e-a901-1adfc84204f2/files/cb83bb47-832e-4f58-b6fb-16e648bceede.jpg",
    category: "Смартфоны",
    brand: "Samsung",
    rating: 4.8,
    specs: {
      processor: "Snapdragon 8 Gen 2",
      ram: "12 ГБ",
      storage: "256 ГБ",
      screen: '6.8" AMOLED',
      battery: "5000 мАч"
    }
  },
  {
    id: 2,
    name: "Наушники AirPods Max",
    price: 64990,
    image: "https://cdn.poehali.dev/projects/16b080db-0c02-4a1e-a901-1adfc84204f2/files/3c9744c8-8243-49b0-93fa-5af39466a03c.jpg",
    category: "Наушники",
    brand: "Apple",
    rating: 4.9,
    specs: {
      battery: "20 часов",
    }
  },
  {
    id: 3,
    name: "Ноутбук MacBook Pro 16",
    price: 249990,
    image: "https://cdn.poehali.dev/projects/16b080db-0c02-4a1e-a901-1adfc84204f2/files/eb7cd28d-2edb-4dbf-b018-0efbe55ad289.jpg",
    category: "Ноутбуки",
    brand: "Apple",
    rating: 4.9,
    specs: {
      processor: "M3 Pro",
      ram: "18 ГБ",
      storage: "512 ГБ",
      screen: '16.2" Retina',
      battery: "22 часа"
    }
  },
  {
    id: 4,
    name: "Смартфон iPhone 15 Pro",
    price: 109990,
    image: "https://cdn.poehali.dev/projects/16b080db-0c02-4a1e-a901-1adfc84204f2/files/cb83bb47-832e-4f58-b6fb-16e648bceede.jpg",
    category: "Смартфоны",
    brand: "Apple",
    rating: 4.9,
    specs: {
      processor: "A17 Pro",
      ram: "8 ГБ",
      storage: "256 ГБ",
      screen: '6.1" Super Retina',
      battery: "3274 мАч"
    }
  },
  {
    id: 5,
    name: "Наушники Sony WH-1000XM5",
    price: 29990,
    image: "https://cdn.poehali.dev/projects/16b080db-0c02-4a1e-a901-1adfc84204f2/files/3c9744c8-8243-49b0-93fa-5af39466a03c.jpg",
    category: "Наушники",
    brand: "Sony",
    rating: 4.7,
    specs: {
      battery: "30 часов",
    }
  },
  {
    id: 6,
    name: "Ноутбук ASUS ROG Zephyrus",
    price: 179990,
    image: "https://cdn.poehali.dev/projects/16b080db-0c02-4a1e-a901-1adfc84204f2/files/eb7cd28d-2edb-4dbf-b018-0efbe55ad289.jpg",
    category: "Ноутбуки",
    brand: "ASUS",
    rating: 4.6,
    specs: {
      processor: "Intel Core i9",
      ram: "32 ГБ",
      storage: "1 ТБ SSD",
      screen: '15.6" QHD',
      battery: "90 Втч"
    }
  }
];

const Index = () => {
  const [cart, setCart] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [comparison, setComparison] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Все");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Все", "Смартфоны", "Наушники", "Ноутбуки"];
  const brands = ["Apple", "Samsung", "Sony", "ASUS"];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Все" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesBrand && matchesSearch;
  });

  const toggleCart = (id: number) => {
    setCart(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleComparison = (id: number) => {
    if (comparison.includes(id)) {
      setComparison(prev => prev.filter(i => i !== id));
    } else if (comparison.length < 3) {
      setComparison(prev => [...prev, id]);
    }
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const comparisonProducts = products.filter(p => comparison.includes(p.id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Icon name="Zap" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ElectroMarket
              </h1>
            </div>

            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск товаров..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 rounded-xl"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative rounded-xl">
                    <Icon name="Heart" size={20} />
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Избранное</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {favorites.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Нет избранных товаров</p>
                    ) : (
                      products.filter(p => favorites.includes(p.id)).map(product => (
                        <Card key={product.id} className="overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex gap-3">
                              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                              <div className="flex-1">
                                <h3 className="font-semibold text-sm">{product.name}</h3>
                                <p className="text-lg font-bold text-primary mt-1">{product.price.toLocaleString()} ₽</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative rounded-xl">
                    <Icon name="ShoppingCart" size={20} />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        {products.filter(p => cart.includes(p.id)).map(product => (
                          <Card key={product.id} className="overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex gap-3">
                                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
                                <div className="flex-1">
                                  <h3 className="font-semibold text-sm">{product.name}</h3>
                                  <p className="text-lg font-bold text-primary mt-1">{product.price.toLocaleString()} ₽</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <div className="pt-4 border-t">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold">Итого:</span>
                            <span className="text-2xl font-bold text-primary">
                              {products.filter(p => cart.includes(p.id)).reduce((sum, p) => sum + p.price, 0).toLocaleString()} ₽
                            </span>
                          </div>
                          <Button className="w-full rounded-xl h-12" size="lg">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="relative rounded-xl">
                    <Icon name="Scale" size={20} />
                    {comparison.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                        {comparison.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-3xl">
                  <SheetHeader>
                    <SheetTitle>Сравнение товаров</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    {comparison.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Добавьте товары для сравнения (до 3 штук)</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="text-left p-3 border-b font-semibold">Характеристика</th>
                              {comparisonProducts.map(product => (
                                <th key={product.id} className="p-3 border-b">
                                  <div className="space-y-2">
                                    <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-lg mx-auto" />
                                    <p className="text-sm font-semibold">{product.name}</p>
                                    <p className="text-lg font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                                  </div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-3 border-b font-medium">Бренд</td>
                              {comparisonProducts.map(product => (
                                <td key={product.id} className="p-3 border-b text-center">{product.brand}</td>
                              ))}
                            </tr>
                            <tr>
                              <td className="p-3 border-b font-medium">Рейтинг</td>
                              {comparisonProducts.map(product => (
                                <td key={product.id} className="p-3 border-b text-center">
                                  <div className="flex items-center justify-center gap-1">
                                    <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                                    <span>{product.rating}</span>
                                  </div>
                                </td>
                              ))}
                            </tr>
                            {comparisonProducts.some(p => p.specs.processor) && (
                              <tr>
                                <td className="p-3 border-b font-medium">Процессор</td>
                                {comparisonProducts.map(product => (
                                  <td key={product.id} className="p-3 border-b text-center">{product.specs.processor || "—"}</td>
                                ))}
                              </tr>
                            )}
                            {comparisonProducts.some(p => p.specs.ram) && (
                              <tr>
                                <td className="p-3 border-b font-medium">Оперативная память</td>
                                {comparisonProducts.map(product => (
                                  <td key={product.id} className="p-3 border-b text-center">{product.specs.ram || "—"}</td>
                                ))}
                              </tr>
                            )}
                            {comparisonProducts.some(p => p.specs.storage) && (
                              <tr>
                                <td className="p-3 border-b font-medium">Накопитель</td>
                                {comparisonProducts.map(product => (
                                  <td key={product.id} className="p-3 border-b text-center">{product.specs.storage || "—"}</td>
                                ))}
                              </tr>
                            )}
                            {comparisonProducts.some(p => p.specs.battery) && (
                              <tr>
                                <td className="p-3 border-b font-medium">Батарея</td>
                                {comparisonProducts.map(product => (
                                  <td key={product.id} className="p-3 border-b text-center">{product.specs.battery || "—"}</td>
                                ))}
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-12 text-white animate-fade-in">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl font-bold mb-4">Электроника нового поколения</h2>
            <p className="text-xl mb-6 text-white/90">Смартфоны, наушники, ноутбуки от ведущих брендов</p>
            <Button size="lg" variant="secondary" className="rounded-xl h-12 px-8">
              Смотреть каталог
              <Icon name="ArrowRight" className="ml-2" size={20} />
            </Button>
          </div>
          <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-32 w-48 h-48 bg-white rounded-full blur-3xl"></div>
          </div>
        </section>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 p-6 rounded-2xl animate-slide-up">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Icon name="SlidersHorizontal" size={20} />
                Фильтры
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">Цена</label>
                  <Slider
                    min={0}
                    max={300000}
                    step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>{priceRange[0].toLocaleString()} ₽</span>
                    <span>{priceRange[1].toLocaleString()} ₽</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">Бренд</label>
                  <div className="space-y-2">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <label htmlFor={brand} className="text-sm cursor-pointer">
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => {
                    setPriceRange([0, 300000]);
                    setSelectedBrands([]);
                    setSelectedCategory("Все");
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
              <TabsList className="w-full justify-start rounded-xl bg-white border">
                {categories.map(category => (
                  <TabsTrigger key={category} value={category} className="rounded-lg">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden rounded-2xl hover:shadow-2xl transition-all duration-300 animate-scale-in hover-scale"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden bg-gray-50 aspect-square">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <Button
                          size="icon"
                          variant={favorites.includes(product.id) ? "default" : "secondary"}
                          className="rounded-full shadow-lg"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Icon name="Heart" size={18} className={favorites.includes(product.id) ? "fill-current" : ""} />
                        </Button>
                        <Button
                          size="icon"
                          variant={comparison.includes(product.id) ? "default" : "secondary"}
                          className="rounded-full shadow-lg"
                          onClick={() => toggleComparison(product.id)}
                          disabled={comparison.length >= 3 && !comparison.includes(product.id)}
                        >
                          <Icon name="Scale" size={18} />
                        </Button>
                      </div>
                      <Badge className="absolute top-3 left-3 rounded-lg">
                        {product.category}
                      </Badge>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-lg leading-tight flex-1">{product.name}</h3>
                      </div>

                      <div className="flex items-center gap-1 mb-3">
                        <Icon name="Star" size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground ml-1">({Math.floor(Math.random() * 500 + 100)})</span>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-2xl font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                        </div>
                        <Button
                          size="icon"
                          className="rounded-xl h-11 w-11"
                          onClick={() => toggleCart(product.id)}
                          variant={cart.includes(product.id) ? "secondary" : "default"}
                        >
                          <Icon name={cart.includes(product.id) ? "Check" : "ShoppingCart"} size={20} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <Icon name="Package" size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
                <p className="text-muted-foreground">Попробуйте изменить параметры фильтрации</p>
              </div>
            )}
          </div>
        </div>

        <section className="mt-16 grid md:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Truck" size={28} className="text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Быстрая доставка</h3>
            <p className="text-muted-foreground text-sm">Доставим ваш заказ за 1-2 дня по всей России</p>
          </Card>

          <Card className="p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Shield" size={28} className="text-secondary" />
            </div>
            <h3 className="font-bold text-lg mb-2">Гарантия качества</h3>
            <p className="text-muted-foreground text-sm">Официальная гарантия на всю электронику</p>
          </Card>

          <Card className="p-6 rounded-2xl text-center hover:shadow-lg transition-shadow">
            <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Headphones" size={28} className="text-accent" />
            </div>
            <h3 className="font-bold text-lg mb-2">Поддержка 24/7</h3>
            <p className="text-muted-foreground text-sm">Наши специалисты всегда готовы помочь</p>
          </Card>
        </section>
      </main>

      <footer className="mt-16 bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Icon name="Zap" size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">ElectroMarket</span>
              </div>
              <p className="text-gray-400 text-sm">Ваш надежный магазин электроники</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Каталог</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Смартфоны</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Наушники</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Ноутбуки</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Гарантия</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>8 (800) 555-35-35</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@electromarket.ru</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
            <p>© 2024 ElectroMarket. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
