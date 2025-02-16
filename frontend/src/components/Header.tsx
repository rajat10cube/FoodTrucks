import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { MapPin, CornerDownLeft } from "lucide-react";

export function Header({
    location,
    setLocation,
}: {
    location: { latitude: number; longitude: number } | null;
    setLocation: (location: { latitude: number; longitude: number }) => void;
}) {
    const [text, setText] = useState("");
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                locationSuccessHandler,
                locationErrorHandler,
            );
        }
    }, []);

    const locationSuccessHandler = (position: GeolocationPosition) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        setText(`${latitude}, ${longitude}`);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    };

    const locationErrorHandler = (error: GeolocationPositionError) => {
        console.error(error);
    };

    const handleEnterPress = () => {
        const [latitude, longitude] = text.split(",");
        setLocation({
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
        });
    };

    return (
        <div className="flex flex-col lg:flex-row gap-5 lg:justify-between items-center">
            <h1 className="text-3xl lg:text-5xl font-medium whitespace-nowrap">
                FoodTruck Finder
            </h1>
            <div className="w-full xl:w-1/3">
                <Input
                    startIcon={MapPin}
                    endIcon={CornerDownLeft}
                    onEndIconClick={handleEnterPress}
                    placeholder="Latitude, Longitude"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            handleEnterPress();
                        }
                    }}
                    className="border-gray-200"
                />
            </div>
        </div>
    );
}
