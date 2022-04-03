import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/layout/NavBar";

function App() {
    return (
        <Router>
            <div className="flex flex-col justify-between h-screen">
                <NavBar />
                <main>Context</main>
            </div>
        </Router>
    );
}

export default App;
