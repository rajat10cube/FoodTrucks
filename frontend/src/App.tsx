import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { FoodTruck } from "./types/FoodTruck";
import { TruckCards } from "./components/TruckCards";
import { Button } from "./components/ui/button";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT as string;
function App() {
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);

    const fetchFoodTrucks = async () => {
        if (location) {
            const response = await fetch(
                `${API_ENDPOINT}/api/food_trucks/nearby?latitude=${location.latitude}&longitude=${location.longitude}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
            const data = await response.json();
            setFoodTrucks(data);
        }
    };

    useEffect(() => {
        fetchFoodTrucks();
    }, [location]);

    console.log("location", location);
    return (
        <div className="w-[95%] md:w-5/6 mx-auto my-5">
            <Header location={location} setLocation={setLocation} />
            <div className="mt-4">
                {location != null &&
                !isNaN(location.latitude) &&
                !isNaN(location.longitude) ? (
                    foodTrucks.length === 0 ? (
                        <div className="col-span-full text-center text-lg font-medium">
                            No food trucks found nearby
                        </div>
                    ) : null
                ) : (
                    <div className="w-full text-center text-lg font-medium whitespace-nowrap">
                        Please enter location to find food trucks nearby
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                <TruckCards foodTrucks={foodTrucks} />
            </div>
        </div>
    );
}

export default App;
