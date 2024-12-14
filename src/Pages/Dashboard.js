import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import styles from "../Styles/Dashboard.module.css";
import Header2 from "../Components/Header2";
import Footer2 from "../Components/Footer2";

function Dashboard() {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

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

    useEffect(() => {
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

    return (
        <>
            <Header2 />

            <div className={styles.DashboardPage}>
                <h1>Welcome to your Dashboard</h1>

                <div className = {styles.IntroBorder}>
                    <p>The Dashboard is your personal space to manage and explore all your saved recipes. 
                        Whether you’re revisiting a dish you loved or planning your next culinary adventure, 
                        you’ll find everything neatly organized here. Click on any recipe to view detailed 
                        instructions and ingredients. If you’ve changed your mind about a recipe, you can 
                        easily remove it from your list. Let’s make your cooking journey effortless and enjoyable!
                    </p>
                </div>

                <div className={styles.RecipesGrid}>
                    {savedRecipes.length > 0 ? (
                        savedRecipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className={styles.RecipeCard}
                                onClick={() => setSelectedRecipe(recipe)}
                            >
                                <img src={recipe.image} alt={recipe.title} />
                                <p>{recipe.title}</p>
                            </div>
                        ))
                    ) : (
                        <div className = {styles.NoSavedRecipe}>
                            <p>You have no saved recipes. Start saving some!</p>
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
                                {selectedRecipe.ingredients.map((ingredient, index) => (
                                    <li key={index}>{ingredient}</li>
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
                                <button
                                    className={styles.UnsaveButton}
                                    onClick={() => {
                                        unsaveRecipeFromDatabase(selectedRecipe.id);
                                        setSelectedRecipe(null); // Close modal after unsaving
                                    }}
                                >
                                    Unsave
                                </button>
                                <button
                                    className={styles.CloseButton}
                                    onClick={() => setSelectedRecipe(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <Footer2 />
        </>
    );
}

export default Dashboard;
