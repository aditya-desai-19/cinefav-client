import axiosInstance from "./api";

const callMovieApi = async () => {
    try {
        const response = await axiosInstance.get("/api/movies");
        return response.data.movies || [];
    } catch (error) {
        throw new Error("Failed to call movie api: ", error);
    };
}

const callWatchlistApi = async (userId) => {
    try {
        const apiUrl = `/api/watchlist/${userId}`;
        const response = await axiosInstance.get(apiUrl);
        return response.data.watchlist.movies || [];
    } catch (error) {
        throw new Error("Failed to call watchlist api: ", error);
    }
}

export { callMovieApi, callWatchlistApi };
