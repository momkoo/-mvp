import React from 'react';
import { Loader } from './Loader';
import type { Recipe } from '../services/geminiService';


interface ResultDisplayProps {
    recipe: Recipe | null;
    isLoading: boolean;
    error: string | null;
}

const Placeholder: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <p className="font-semibold">어떤 요리가 탄생할까요?</p>
        <p className="text-sm">가지고 있는 재료를 알려주시면 AI 셰프가 레시피를 만들어 드려요!</p>
    </div>
);


export const ResultDisplay: React.FC<ResultDisplayProps> = ({ recipe, isLoading, error }) => {
    
    const coupangSearchUrl = (itemName: string) => {
        return `https://www.coupang.com/np/search?q=${encodeURIComponent(itemName)}`;
    }

    return (
        <div className="w-full min-h-[30rem] bg-gray-50 rounded-lg flex items-center justify-center p-4 border border-dashed border-gray-300 transition-all duration-300 relative overflow-hidden">
            {isLoading && <Loader />}
            {error && !isLoading && (
                 <div className="text-center text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="font-bold">오류가 발생했습니다</p>
                    <p className="text-sm mt-1">{error}</p>
                 </div>
            )}
            {recipe && !isLoading && !error && (
                <div className="w-full h-full bg-white rounded-md p-6 flex flex-col text-left shadow-inner overflow-y-auto">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">{recipe.recipe_name}</h2>
                    <p className="text-gray-600 leading-relaxed mb-4 text-center italic">
                        {recipe.description}
                    </p>
                    <div className="text-center mb-6">
                         <a 
                            href={recipe.youtube_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300"
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                            유튜브로 요리법 보기
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-orange-600 border-b-2 border-orange-200 pb-2 mb-3">준비 재료</h3>
                            <ul className="space-y-2">
                                {recipe.ingredients.map((ing, index) => (
                                    <li key={index} className="flex justify-between items-center group">
                                        <div>
                                            <span className="text-gray-700">{ing.item}</span>
                                            <span className="text-gray-500 font-mono ml-2">{ing.amount}</span>
                                        </div>
                                        <a 
                                           href={coupangSearchUrl(ing.item)} 
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="text-xs text-blue-500 hover:text-blue-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                           구매하기
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                             <h3 className="text-lg font-semibold text-orange-600 border-b-2 border-orange-200 pb-2 mb-3">요리 순서</h3>
                            <ol className="space-y-3 list-decimal list-inside">
                                {recipe.instructions.map((step, index) => (
                                    <li key={index} className="text-gray-700 leading-snug">{step}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
            {!isLoading && !error && !recipe && <Placeholder />}
        </div>
    );
};