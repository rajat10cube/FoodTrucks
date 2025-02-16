import { FoodTruck } from "@/types/FoodTruck";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

export function TruckCards({ foodTrucks }: { foodTrucks: FoodTruck[] }) {
    return (
        <>
            {foodTrucks.map((foodTruck, index) => (
                <Card className="min-h-50" key={index}>
                    <CardHeader>
                        <CardTitle className="text-xl">
                            {foodTruck.applicant}
                        </CardTitle>
                        <CardDescription>{foodTruck.address}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="font-medium">Food Items: </p>
                        <p className="italic font-light">
                            {typeof foodTruck.food_items === "string"
                                ? foodTruck.food_items.split(":").join(", ")
                                : foodTruck.food_items}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}
