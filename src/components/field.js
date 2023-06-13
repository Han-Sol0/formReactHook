import { forwardRef } from "react";
export const Field = forwardRef(({ error, ...props }, ref) => {
    return (
        <div>
            <input ref={ref} {...props} />
            {error && <span>{error}</span>}
        </div>
    );
});
