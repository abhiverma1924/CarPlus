import axios from "axios";

export const GetAllCars = async () => {
    const cars = await axios.get('https://mocki.io/v1/d0a37a89-51b9-4e3a-b17f-d0e61cd595b8');
    return cars;
}