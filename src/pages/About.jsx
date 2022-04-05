import React from "react";
import pkg from "../../package.json";

function About() {
    return (
        <div>
            <h1 className="text-5xl mb-4">Github Finder</h1>
            <p className="mb-4 text-xl font-light">
                A React app to search GitHub profiles and see profile details.
            </p>
            <p className="mb-4 text-xl font-light">
                This uses Github developer APIs to fetch user profiles.
            </p>
            <p className="text-lg text-gray-400">
                Version <span className="text-white">{pkg.version}</span>
            </p>
        </div>
    );
}

export default About;
