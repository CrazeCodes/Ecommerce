import { Button } from "@/components/ui/button";
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import pic22 from "../../assets/pic22.webp";
import pic23 from "../../assets/pic23.webp";



import {
  Sparkles,
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { setFeatureImageList } from "@/store/common-slice";

const categoriesWithIcon = [
  { id: "men", label: "Men", icon: ShirtIcon },
  { id: "women", label: "Women", icon: CloudLightning },
  { id: "beauty", label: "Beauty", icon: Sparkles },
  { id: "kids", label: "Kids", icon: BabyIcon },
  { id: "accessories", label: "Accessories", icon: WatchIcon },
  { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
];

const brandsWithIcon = [
  { id: "nike", label: "Nike", icon: Shirt },
  { id: "adidas", label: "Adidas", icon: WashingMachine },
  { id: "beauty", label: "Beauty", icon: Sparkles },
  { id: "puma", label: "Puma", icon: ShoppingBasket },
  { id: "levi", label: "Levi's", icon: Airplay },
  { id: "zara", label: "Zara", icon: Images },
  { id: "h&m", label: "H&M", icon: Heater },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [countdown, setCountdown] = useState({
    days: "06",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 6); // 6 days from now
  
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
  
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / 1000 / 60) % 60);
      const seconds = Math.floor((distance / 1000) % 60);
  
      setCountdown({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
  
      if (distance <= 0) clearInterval(interval);
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);
  

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    }, 15000);

    return () => clearInterval(timer);
  }, [featureImageList]);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFeatureImageList([
      { image: bannerOne },
      { image: bannerTwo },
      { image: bannerThree }
    ]));
  }, [dispatch]);

  console.log(productList, "productList");

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-gradient-to-r from-green-200 to-green-100 py-12 px-6 lg:px-20">
  <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
    
    {/* Carousel Left Side */}
    <div className="relative w-full lg:w-2/3 h-[500px] rounded-lg overflow-hidden shadow-lg">
      {featureImageList && featureImageList.length > 0
        ? featureImageList.map((slide, index) => (
            <img
              src={slide?.image}
              key={index}
              className={`${
                index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[1000]`}
            />
          ))
        : null}

      {/* Left/Right Buttons */}
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) =>
              (prevSlide - 1 + featureImageList.length) % featureImageList.length
          )
        }
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 z-10"
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() =>
          setCurrentSlide(
            (prevSlide) => (prevSlide + 1) % featureImageList.length
          )
        }
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 z-10"
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>
    </div>

    {/* Offer Right Side */}
    {/* Offer Right Side with Two Product Images */}
<div className="w-full lg:w-1/3 flex flex-col gap-6">
  <h2 className="text-3xl font-bold text-gray-800">Exclusive Offer</h2>
  <p className="text-gray-600">
    Unlock the ultimate style upgrade with our exclusive offer. Enjoy savings of up to <strong>45% off</strong> on our latest new arrivals!
  </p>

  <div className="flex flex-col gap-10">
  <div className="flex gap-4 items-end w-full">
      {/* Shorter Image on the Left */}
      <img
        src={pic23}
        alt="Left"
        className="w-[200px] h-[320px] object-cover rounded-2xl shadow-lg"
      />

      {/* Taller Image on the Right */}
      <img
        src={pic22}
        alt="Right"
        className="w-[390px] h-[420px] object-cover rounded-2xl shadow-lg"
      />
    </div>



  </div>

  <div className="flex gap-4 text-center">
    <div>
      <p className="text-2xl font-bold text-green-600">{countdown.days}</p>
      <span className="text-xs text-gray-500">Days</span>
    </div>
    <div>
      <p className="text-2xl font-bold text-green-600">{countdown.hours}</p>
      <span className="text-xs text-gray-500">Hours</span>
    </div>
    <div>
      <p className="text-2xl font-bold text-green-600">{countdown.minutes}</p>
      <span className="text-xs text-gray-500">Mins</span>
    </div>
  </div>

  <Button className="bg-[#12362f] hover:bg-green-700 text-white rounded-md">
    BUY NOW
  </Button>
</div>

  </div>
</div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>


        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ShoppingProductTile
                    handleGetProductDetails={handleGetProductDetails}
                    product={productItem}
                    handleAddtoCart={handleAddtoCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;