import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { ResultDisplay } from './components/ResultDisplay';
import { Footer } from './components/Footer';
import { createRecipe, Recipe } from './services/geminiService';

const App: React.FC = () => {
    const [ingredients, setIngredients] = useState<string>('');
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerate = useCallback(async () => {
        if (!ingredients || isLoading) return;

        setIsLoading(true);
        setError(null);
        setRecipe(null);

        try {
            const result = await createRecipe(ingredients);
            setRecipe(result);
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : '오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsLoading(false);
        }
    }, [ingredients, isLoading]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100 font-sans text-gray-800">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 md:p-8">
                    <PromptInput
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        onGenerate={handleGenerate}
                        isLoading={isLoading}
                    />
                    <div className="mt-8">
                        <ResultDisplay
                            recipe={recipe}
                            isLoading={isLoading}
                            error={error}
                        />
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default App;