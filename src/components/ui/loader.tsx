export const Loader = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center rounded shadow-lg">
        <p className="text-lg font-medium text-gray-800 mb-4">
            Authenticating...
        </p>

        <div className="relative">
            <div className="relative w-12 h-12 inline-block">
                {/* Outer spinner */}
                <div className="w-12 h-12 rounded-full border-t-4 border-[#ad79e1] border-r-4 border-r-transparent box-border animate-spin"></div>

                {/* Inner spinner (after pseudo-element)*/}
                <div className="absolute left-0 top-0 w-12 h-12 rounded-full border-b-4 border-[#9ee8c5] border-l-4 border-l-transparent box-border animate-spin"></div>
            </div>
        </div>
    </div>
);