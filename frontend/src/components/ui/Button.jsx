import { Link } from "react-router-dom";
import { getButtonStyles } from "../../utils/button";

export default function Button({
    label,
    children,
    url,
    variant = "primary",
    leftIcon,
    rightIcon,
    className = "",
    ...props
}) {
    const buttonStyles = `${getButtonStyles(variant)} ${className}`;

    const content = (
        <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}

            <span>{children ?? label}</span>

            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
    );

    if (!url) {
        return (
            <button className={buttonStyles} {...props}>
                {content}
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
                {content}
            </a>
        );
    }

    return (
        <Link to={url} className={buttonStyles} {...props}>
            {content}
        </Link>
    );
}