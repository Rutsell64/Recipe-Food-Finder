import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../Styles/Recipes.module.css";
import Header2 from "../Components/Header2";
import Footer2 from "../Components/Footer2";

function RecipesPage() {
    const [recipes, setRecipes] = useState([]);
    const [query, setQuery] = useState("");
    const [diet, setDiet] = useState("");
    const [cuisine, setCuisine] = useState("");
    const [type, setType] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [savedRecipes, setSavedRecipes] = useState([]); // Track saved recipes

    const apiKey = "Add your APi Key";

    const fetchRecipes = async () => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&diet=${diet}&cuisine=${cuisine}&type=${type}`
            );
            const data = await response.json();
            setRecipes(data.results || []);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const fetchRecipeDetails = async (id) => {
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
            );
            const data = await response.json();
            setSelectedRecipe(data);
        } catch (error) {
            console.error("Error fetching recipe details:", error);
        }
    };

    const fetchSavedRecipes = async () => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (!userId) return;

        try {
            const savedRecipesCollection = collection(db, `users/${userId}/savedRecipes`);
            const savedRecipesSnapshot = await getDocs(savedRecipesCollection);
            const saved = savedRecipesSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSavedRecipes(saved);
        } catch (error) {
            console.error("Error fetching saved recipes:", error);
        }
    };

    const saveRecipeToDatabase = async (recipe) => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;

        if (!userId) {
            alert("You must be logged in to save recipes.");
            return;
        }

        try {
            const recipesCollection = collection(db, `users/${userId}/savedRecipes`);
            await addDoc(recipesCollection, {
                title: recipe.title,
                image: recipe.image,
                ingredients: recipe.extendedIngredients.map((ing) => ing.original),
                instructions: recipe.instructions,
                id: recipe.id,
            });

            alert("Recipe saved successfully!");
            fetchSavedRecipes(); // Refresh saved recipes
        } catch (error) {
            console.error("Error saving recipe:", error);
            alert("Failed to save the recipe. Please try again.");
        }
    };

    const unsaveRecipeFromDatabase = async (recipeId) => {
        const auth = getAuth();
        const userId = auth.currentUser?.uid;
    
        if (!userId) {
            alert("You must be logged in to unsave recipes.");
            return;
        }
    
        try {
            const savedRecipesCollection = collection(db, `users/${userId}/savedRecipes`);
            const savedRecipesSnapshot = await getDocs(savedRecipesCollection);
    
            // Find the document with the matching recipe ID
            const recipeToDelete = savedRecipesSnapshot.docs.find(
                (doc) => doc.data().id === recipeId
            );
    
            if (recipeToDelete) {
                await deleteDoc(doc(db, `users/${userId}/savedRecipes/${recipeToDelete.id}`));
                alert("Recipe unsaved successfully!");
                fetchSavedRecipes(); // Refresh saved recipes
            } else {
                alert("Recipe not found in your saved recipes.");
            }
        } catch (error) {
            console.error("Error unsaving recipe:", error);
            alert("Failed to unsave the recipe. Please try again.");
        }
    };

    const isRecipeSaved = (recipeId) => {
        return savedRecipes.some((recipe) => recipe.id === recipeId);
    };

    useEffect(() => {
        fetchRecipes();
        fetchSavedRecipes(); // Fetch saved recipes on mount
    }, []);

    useEffect(() => {
        if (selectedRecipe) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedRecipe]);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRecipes();
    };

    return (
        <>
            <Header2 />

            <div className={styles.RecipesPage}>
                <h1>Discover Your Perfect Dish</h1>
                <form className={styles.FilterForm} onSubmit={handleSearch}>
                    <div className={styles.InputBorder}>
                        <input
                            type="text"
                            placeholder="Search for recipes..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <div className={styles.OptionsBorder}>
                        <div className={styles.Sel1Sel2Border}>
                            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                                <option value="">Any Diet</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="vegan">Vegan</option>
                                <option value="gluten free">Gluten Free</option>
                            </select>
                            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                                <option value="">Any Cuisine</option>
                                <option value="italian">Italian</option>
                                <option value="mexican">Mexican</option>
                                <option value="indian">Indian</option>
                            </select>
                        </div>
                        <div className={styles.Sel3Border}>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Any Type</option>
                                <option value="main course">Main Course</option>
                                <option value="dessert">Dessert</option>
                                <option value="appetizer">Appetizer</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.SearchButtonBorder}>
                        <button type="submit">Search</button>
                    </div>
                </form>

                <div className={styles.RecipesGrid}>
                    {recipes.length > 0 ? (
                        recipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className={styles.RecipeCard}
                                onClick={() => fetchRecipeDetails(recipe.id)}
                            >
                                <img src={recipe.image} alt={recipe.title} />
                                <p>{recipe.title}</p>
                            </div>
                        ))
                    ) : (
                        <div className = {styles.NoRecipe}>
                            <p>No recipes found. Try adjusting your search criteria.</p>
                        </div>
                    )}
                </div>

                {selectedRecipe && (
                    <div className={styles.RecipeDetailsModal}>
                        <div className={styles.ModalDetails}>
                            <h2>{selectedRecipe.title}</h2>
                            <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                            <h3>Ingredients</h3>
                            <ul>
                                {selectedRecipe.extendedIngredients.map((ingredient) => (
                                    <li key={ingredient.id}>{ingredient.original}</li>
                                ))}
                            </ul>
                            <h3>Instructions</h3>
                            <div
                                className={styles.Instructions}
                                dangerouslySetInnerHTML={{
                                    __html: selectedRecipe.instructions || "No instructions available.",
                                }}
                            ></div>
                            <div className={styles.ModalButton}>
                                    {isRecipeSaved(selectedRecipe.id) ? (
                                        <button className = {styles.UnsaveButton} onClick={() => unsaveRecipeFromDatabase(selectedRecipe.id)}>
                                            Unsave
                                        </button>
                                    ) : (
                                        <button className = {styles.SaveButton} onClick={() => saveRecipeToDatabase(selectedRecipe)}>
                                            Save
                                        </button>
                                    )}
                                <button className = {styles.CloseButton} onClick={() => setSelectedRecipe(null)}>Close</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer2 />
        </>
    );
}

export default RecipesPage;
