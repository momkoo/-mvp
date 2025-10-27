import React from 'react';

interface PromptInputProps {
    ingredients: string;
    setIngredients: (text: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ 
    ingredients, 
    setIngredients, 
    onGenerate, 
    isLoading 
}) => {
    return (
        <div className="flex flex-col space-y-4">
            <div>
                <label htmlFor="ingredients-entry" className="block text-lg font-medium text-gray-800 mb-2 text-center">냉장고에 어떤 재료가 있나요?</label>
                <textarea
                    id="ingredients-entry"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    placeholder="예: 돼지고기, 김치, 양파, 밥, 계란..."
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 resize-none"
                    rows={3}
                    disabled={isLoading}
                />
            </div>
            <button
                onClick={onGenerate}
                disabled={isLoading || !ingredients.trim()}
                className="w-full flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-4 focus:ring-orange-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        레시피 구상 중...
                    </>
                ) : (
                    <>
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                         나만의 레시피 만들기
                    </>
                )}
            </button>
        </div>
    );
};