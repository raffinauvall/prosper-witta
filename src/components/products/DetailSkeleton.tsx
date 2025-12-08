export default function DetailSkeleton() {
    return(
        <div className="animate-pulse space-y-4">
            <div className="h-6 w-2/3 bg-gray-300 rounded" />
            <div className="h-4 w-full bg-gray-300 rounded" />
            <div className="h-4 w-5/6 bg-gray-300 rounded" />
        </div>
    );
}