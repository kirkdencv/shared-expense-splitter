function Login({ onClose }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {/* Login box */}
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Shared Expense Splitter</h1>
                {/* Fields */}
                <div className="flex flex-col space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-6">
                    <button
                        onClick={onClose}
                        type="button"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200 font-bold tracking-wider"
                    >
                        Sign In
                    </button>
                </div>

                {/* Register */}
                <div className="mt-6">
                    <h1 className="text-center">Don't have an account?
                        <a className="font-bold cursor-pointer hover:text-green-700"> Register</a>
                    </h1>
                </div>
            </div>
        </div>
    );
}
export default Login;