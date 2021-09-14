import React from "react";

const LoadingPage = () => {

    return (
        <div class="d-flex justify-content-center">
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingPage;