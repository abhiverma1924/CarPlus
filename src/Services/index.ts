import axios from "axios";

export const GetAllCars = async () => {
    const cars = await axios.get('https://mocki.io/v1/b714d278-4df3-4652-b42f-a105609845bb');
    return cars;
}