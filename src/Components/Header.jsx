import { PhilippinePeso } from "lucide-react";

export default function Header() {
    return <>
        <nav>
            <span className="logo-header">
                <h1 className="flex"><PhilippinePeso />eso Tracker</h1>
            </span>

            <span className="name-header">
                <p>Need Help?</p>
                <p>Read our Blog</p>
                <p>Good Morning Ali!</p>

            </span>
        </nav>
    </>
}