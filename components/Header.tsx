import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="w-full bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                    AI 셰프
                </h1>
                <p className="text-gray-500 mt-1">
                    냉장고 속 재료로 만드는 마법 같은 요리
                </p>
            </div>
        </header>
    );
};