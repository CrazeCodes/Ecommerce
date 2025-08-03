import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { XCircle, Home } from "lucide-react";
import { useDispatch } from "react-redux";
import { cancelOrder } from "@/store/shop/order-slice";

function PaypalCancelPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // Get the stored order ID and cancel the order if it exists
    const storedOrderId = sessionStorage.getItem("currentOrderId");
    if (storedOrderId) {
      try {
        const orderId = JSON.parse(storedOrderId);
        dispatch(cancelOrder(orderId)).then((result) => {
          if (result.meta.requestStatus === "fulfilled") {
            console.log("Order cancelled successfully");
          } else {
            console.log("Failed to cancel order");
          }
        });
      } catch (error) {
        console.log("Error parsing order ID:", error);
      }
    }
    
    // Clear any stored order data from session storage
    sessionStorage.removeItem("currentOrderId");
    
    // Log the cancel token if present
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      console.log("PayPal payment cancelled with token:", token);
    }

    // Auto-redirect after 5 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/shop/home");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, location.search, dispatch]);

  const handleGoHome = () => {
    navigate("/shop/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl text-red-600">Payment Cancelled</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Your PayPal payment has been cancelled. No charges have been made to your account.
          </p>
          {new URLSearchParams(location.search).get("token") && (
            <p className="text-xs text-gray-400">
              Transaction ID: {new URLSearchParams(location.search).get("token")}
            </p>
          )}
          <p className="text-sm text-gray-500">
            Redirecting to home page in {countdown} seconds...
          </p>
          <Button 
            onClick={handleGoHome} 
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Home className="mr-2 h-4 w-4" />
            Go to Home Page
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default PaypalCancelPage; 