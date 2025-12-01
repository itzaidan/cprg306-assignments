"use client";
import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
    const data = await response.json()
    return data.meals
}

export function MealIdeas({ ingredient }) {
    const [meals, setMeals] = useState([])

    const loadMealIdeas = async () => { 
        if (ingredient) {
            const fetchedMeals = await fetchMealIdeas(ingredient);
            setMeals(fetchedMeals || []);
        }
    }

    useEffect(() => { 
        loadMealIdeas() 
    }, [ingredient])

    const checkForMeals = () => {
        if (!ingredient) {
            return <p className="text-gray-400">Select an item to see meal ideas</p>
        }
        if (meals && meals.length > 0) {
            return meals.map((meal) => (
                <li key={meal.idMeal} className="mb-4 p-4 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-4">
                        <img 
                            src={meal.strMealThumb} 
                            alt={meal.strMeal} 
                            className="w-16 h-16 rounded object-cover"
                        />
                        <span className="font-semibold">{meal.strMeal}</span>
                    </div>
                </li>
            ))
        }
        return <p className="text-gray-400">No meal ideas found for {ingredient}</p>
    }

    return (
        <div className="bg-slate-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Meal Ideas</h2>
            <ul className="space-y-2">
                {checkForMeals()}
            </ul>
        </div>
    )
}