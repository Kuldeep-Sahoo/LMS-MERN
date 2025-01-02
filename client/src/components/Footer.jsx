import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <div>
            <footer className="flex flex-wrap justify-center items-center py-3 my-4 ">
                <div className="md:w-1/3 flex items-center">
                    <Link to="/" className="mb-3 mr-2 mb-md-0 text-muted text-decoration-none lh-1"></Link>
                    <span className="text-gray-500">&copy; 2024 Kuldeep Sahoo. All rights reserved.</span>
                </div>
            </footer>
        </div>
    );
}
