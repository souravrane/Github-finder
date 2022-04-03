import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/layout/Footer";
import NavBar from "./components/layout/NavBar";

function App() {
    return (
        <Router>
            <div className="flex flex-col justify-between h-screen">
                <NavBar />
                <main>Context</main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
