import { Link } from "react-router-dom";
import { getButtonStyles } from "../../utils/button";

export default function Button({ label, url, variant = "Primary", className = "", ...props }) {
    const buttonStyles = `${getButtonStyles(variant)} ${className}`;

    if (!url) {
        return (
            <button className={buttonStyles} {...props}>
                {label}
            </button>
        );
    }

    const isExternal = url.startsWith("http") || url.startsWith("//");

    if (isExternal) {
        return (
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonStyles}
                {...props}
            >
                {label}
            </a>
        );
    }

    return (
        <Link to={url} className={buttonStyles} {...props}>
            {label}
        </Link>
    );
}
